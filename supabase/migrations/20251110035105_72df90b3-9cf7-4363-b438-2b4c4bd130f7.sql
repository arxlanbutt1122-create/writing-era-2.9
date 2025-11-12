-- Create storage buckets for content images
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('blog-images', 'blog-images', true),
  ('article-images', 'article-images', true),
  ('biography-images', 'biography-images', true),
  ('storytelling-images', 'storytelling-images', true),
  ('novel-covers', 'novel-covers', true);

-- RLS policies for storage - Admins can upload
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('blog-images', 'article-images', 'biography-images', 'storytelling-images', 'novel-covers')
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Anyone can view images
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id IN ('blog-images', 'article-images', 'biography-images', 'storytelling-images', 'novel-covers'));

-- Admins can delete images
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id IN ('blog-images', 'article-images', 'biography-images', 'storytelling-images', 'novel-covers')
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Admins can update images
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('blog-images', 'article-images', 'biography-images', 'storytelling-images', 'novel-covers')
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Add SEO fields to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS read_time TEXT;

-- Add SEO fields to articles table
ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS read_time TEXT;

-- Add SEO fields to biography table
ALTER TABLE biography ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE biography ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE biography ADD COLUMN IF NOT EXISTS og_image TEXT;

-- Add SEO fields to storytelling table
ALTER TABLE storytelling ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE storytelling ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE storytelling ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE storytelling ADD COLUMN IF NOT EXISTS read_time TEXT;

-- Add SEO fields to novels table
ALTER TABLE novels ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE novels ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE novels ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE novels ADD COLUMN IF NOT EXISTS read_time TEXT;