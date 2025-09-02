-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('admin', 'farm_owner');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'farm_owner',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create farms table
CREATE TABLE public.farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  price_per_night DECIMAL(10,2),
  guests INTEGER DEFAULT 1,
  bedrooms INTEGER DEFAULT 1,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create farm images table
CREATE TABLE public.farm_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create farm availability table
CREATE TABLE public.farm_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(farm_id, date)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_availability ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (public.is_admin(auth.uid()) OR auth.uid() = id);

-- Farms policies
CREATE POLICY "Anyone can view farms" ON public.farms FOR SELECT USING (true);
CREATE POLICY "Farm owners can insert their farms" ON public.farms FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Farm owners can update their farms" ON public.farms FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Admins can manage all farms" ON public.farms FOR ALL USING (public.is_admin(auth.uid()));

-- Farm images policies
CREATE POLICY "Anyone can view farm images" ON public.farm_images FOR SELECT USING (true);
CREATE POLICY "Farm owners can manage their farm images" ON public.farm_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.farms 
    WHERE farms.id = farm_images.farm_id 
    AND farms.owner_id = auth.uid()
  )
);
CREATE POLICY "Admins can manage all farm images" ON public.farm_images FOR ALL USING (public.is_admin(auth.uid()));

-- Farm availability policies  
CREATE POLICY "Anyone can view farm availability" ON public.farm_availability FOR SELECT USING (true);
CREATE POLICY "Farm owners can manage their farm availability" ON public.farm_availability FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.farms 
    WHERE farms.id = farm_availability.farm_id 
    AND farms.owner_id = auth.uid()
  )
);
CREATE POLICY "Admins can manage all farm availability" ON public.farm_availability FOR ALL USING (public.is_admin(auth.uid()));

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('farm-images', 'farm-images', true);

-- Storage policies for farm images
CREATE POLICY "Anyone can view farm images" ON storage.objects FOR SELECT USING (bucket_id = 'farm-images');
CREATE POLICY "Authenticated users can upload farm images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'farm-images' AND 
  auth.role() = 'authenticated'
);
CREATE POLICY "Users can update their farm images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'farm-images' AND 
  auth.role() = 'authenticated'
);
CREATE POLICY "Users can delete their farm images" ON storage.objects FOR DELETE USING (
  bucket_id = 'farm-images' AND 
  auth.role() = 'authenticated'
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
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
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function for timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON public.farms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();