-- Add writer_name column to all content tables
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS writer_name TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS writer_name TEXT;
ALTER TABLE storytelling ADD COLUMN IF NOT EXISTS writer_name TEXT;
ALTER TABLE novels ADD COLUMN IF NOT EXISTS writer_name TEXT;
ALTER TABLE biography ADD COLUMN IF NOT EXISTS writer_name TEXT;