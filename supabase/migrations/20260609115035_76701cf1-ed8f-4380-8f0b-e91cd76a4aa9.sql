
CREATE POLICY "Anon can upload to intake-uploads"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'intake-uploads');
