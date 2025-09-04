-- Fix the handle_new_user function to properly cast role values to user_role enum
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CASE 
      WHEN NEW.email = 'kharma.mutasem@gmail.com' THEN 'admin'::user_role
      ELSE 'farm_owner'::user_role
    END
  );
  RETURN NEW;
END;
$function$;