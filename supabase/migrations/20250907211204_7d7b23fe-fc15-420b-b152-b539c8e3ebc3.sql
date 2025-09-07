-- FIX SECURITY ISSUE - Remove problematic view
-- Views cannot have RLS policies, so we'll just create a clean view

-- Drop the problematic view completely
DROP VIEW IF EXISTS public.farms_with_stats;

-- Create a simple, clean view without security issues
CREATE VIEW public.farms_with_stats AS
SELECT 
  f.id,
  f.name,
  f.description,
  f.location,
  f.price_per_night,
  f.guests,
  f.bedrooms,
  f.rating,
  f.review_count,
  f.contact_email,
  f.created_at,
  f.updated_at,
  -- Use the utility functions we created
  public.get_farm_primary_image(f.id) as primary_image_url,
  (SELECT count(*)::integer FROM farm_images WHERE farm_id = f.id) as total_images,
  (SELECT count(*)::integer FROM farm_availability WHERE farm_id = f.id AND is_available = true AND date >= current_date) as available_days_ahead
FROM farms f;