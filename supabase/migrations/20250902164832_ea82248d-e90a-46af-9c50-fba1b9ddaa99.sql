-- Create storage bucket for farm images (if doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('farm-images', 'farm-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for farm images
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Anyone can view farm images'
  ) THEN
    CREATE POLICY "Anyone can view farm images" ON storage.objects FOR SELECT USING (bucket_id = 'farm-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Authenticated users can upload farm images'
  ) THEN
    CREATE POLICY "Authenticated users can upload farm images" ON storage.objects FOR INSERT WITH CHECK (
      bucket_id = 'farm-images' AND 
      auth.role() = 'authenticated'
    );
  END IF;
END $$;