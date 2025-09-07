-- DATABASE OPTIMIZATION FOR BETTER USABILITY (CORRECTED)
-- Adding missing foreign keys, indexes, and utility functions

-- 1) ADD FOREIGN KEY CONSTRAINTS (only if they don't exist)
DO $$
BEGIN
  -- Add foreign key from farm_images to farms if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_farm_images_farm_id' AND table_name = 'farm_images'
  ) THEN
    ALTER TABLE public.farm_images 
    ADD CONSTRAINT fk_farm_images_farm_id 
    FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;
  END IF;

  -- Add foreign key from farm_availability to farms if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_farm_availability_farm_id' AND table_name = 'farm_availability'
  ) THEN
    ALTER TABLE public.farm_availability 
    ADD CONSTRAINT fk_farm_availability_farm_id 
    FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;
  END IF;

  -- Add foreign key from farms to profiles if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_farms_owner_id' AND table_name = 'farms'
  ) THEN
    ALTER TABLE public.farms 
    ADD CONSTRAINT fk_farms_owner_id 
    FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 2) ADD PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_farms_owner_id ON public.farms(owner_id);
CREATE INDEX IF NOT EXISTS idx_farm_images_farm_id ON public.farm_images(farm_id);
CREATE INDEX IF NOT EXISTS idx_farm_availability_farm_id ON public.farm_availability(farm_id);
CREATE INDEX IF NOT EXISTS idx_farm_images_is_primary ON public.farm_images(farm_id, is_primary) WHERE is_primary = true;
CREATE INDEX IF NOT EXISTS idx_farm_availability_date ON public.farm_availability(date);

-- 3) DATA INTEGRITY CONSTRAINT - Only one primary image per farm
CREATE UNIQUE INDEX IF NOT EXISTS idx_farm_images_one_primary 
ON public.farm_images(farm_id) WHERE is_primary = true;

-- 4) UTILITY FUNCTIONS FOR EASIER DATABASE USAGE

-- Function to get primary image URL for a farm
CREATE OR REPLACE FUNCTION public.get_farm_primary_image(farm_uuid uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT image_url 
  FROM farm_images 
  WHERE farm_id = farm_uuid AND is_primary = true 
  LIMIT 1;
$$;

-- Function to check if farm is available for a date range
CREATE OR REPLACE FUNCTION public.is_farm_available(
  farm_uuid uuid, 
  start_date date, 
  end_date date
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 
    FROM farm_availability 
    WHERE farm_id = farm_uuid 
    AND date BETWEEN start_date AND end_date 
    AND is_available = false
  );
$$;

-- Function to get farm statistics
CREATE OR REPLACE FUNCTION public.get_farm_stats(farm_uuid uuid)
RETURNS json
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'total_images', (
      SELECT count(*) FROM farm_images WHERE farm_id = farm_uuid
    ),
    'has_primary_image', (
      SELECT count(*) > 0 FROM farm_images WHERE farm_id = farm_uuid AND is_primary = true
    ),
    'availability_records', (
      SELECT count(*) FROM farm_availability WHERE farm_id = farm_uuid
    ),
    'available_days_this_month', (
      SELECT count(*) 
      FROM farm_availability 
      WHERE farm_id = farm_uuid 
      AND date >= date_trunc('month', current_date)
      AND date < date_trunc('month', current_date) + interval '1 month'
      AND is_available = true
    )
  );
$$;

-- 5) TRIGGER TO AUTO-SET PRIMARY IMAGE
CREATE OR REPLACE FUNCTION public.auto_set_first_image_primary()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If this is the first image for the farm, set it as primary
  IF NOT EXISTS (
    SELECT 1 FROM farm_images 
    WHERE farm_id = NEW.farm_id AND id != NEW.id
  ) THEN
    NEW.is_primary = true;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_auto_set_first_image_primary ON public.farm_images;
CREATE TRIGGER trg_auto_set_first_image_primary
  BEFORE INSERT ON public.farm_images
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_set_first_image_primary();

-- 6) VIEW FOR EASY FARM DATA WITH STATS
CREATE OR REPLACE VIEW public.farms_with_stats AS
SELECT 
  f.*,
  (SELECT image_url FROM farm_images WHERE farm_id = f.id AND is_primary = true LIMIT 1) as primary_image_url,
  (SELECT count(*) FROM farm_images WHERE farm_id = f.id) as total_images,
  (SELECT count(*) FROM farm_availability WHERE farm_id = f.id AND is_available = true AND date >= current_date) as available_days_ahead,
  p.full_name as owner_name,
  p.email as owner_email
FROM farms f
LEFT JOIN profiles p ON f.owner_id = p.id;