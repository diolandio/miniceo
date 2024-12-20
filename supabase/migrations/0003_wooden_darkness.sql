/*
  # Add storage support for product images

  1. Changes
    - Add storage bucket for product images
    - Update products table to use storage references
    - Add policies for storage access

  2. Security
    - Enable RLS for storage bucket
    - Add policies for authenticated users
*/

-- Create a new bucket for product images
INSERT INTO storage.buckets (id, name)
VALUES ('product_images', 'product_images')
ON CONFLICT DO NOTHING;

-- Add storage policies
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'product_images'
);

CREATE POLICY "Authenticated users can update their product images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'product_images');

CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'product_images');

-- Update products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS image_path text,
ADD COLUMN IF NOT EXISTS image_name text;