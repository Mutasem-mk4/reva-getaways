-- FIX SECURITY DEFINER VIEW ISSUE
-- Replace the security definer view with a regular view and proper RLS policies

-- Drop the problematic view
DROP VIEW IF EXISTS public.farms_with_stats;

-- Create a regular view without SECURITY DEFINER
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
  -- Use function calls instead of subqueries for better performance
  public.get_farm_primary_image(f.id) as primary_image_url,
  (SELECT count(*)::integer FROM farm_images WHERE farm_id = f.id) as total_images,
  (SELECT count(*)::integer FROM farm_availability WHERE farm_id = f.id AND is_available = true AND date >= current_date) as available_days_ahead
FROM farms f;

-- Enable RLS on the view (it will inherit from the underlying tables)
ALTER VIEW public.farms_with_stats SET (security_invoker = true);

-- Add RLS policy for the view
CREATE POLICY "Anyone can view farms with stats"
ON public.farms_with_stats
FOR SELECT
TO public
USING (true);