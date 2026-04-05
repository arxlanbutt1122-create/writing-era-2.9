-- WritingEra content SEO refresh
-- Run this in Supabase SQL Editor after uploading the new public/content images.

-- BLOGS
WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) AS rn
  FROM public.blogs
  WHERE published = true
)
UPDATE public.blogs b
SET
  featured_image = COALESCE(NULLIF(b.featured_image, ''), CASE ((r.rn - 1) % 8)
    WHEN 0 THEN '/content/assignment-writing-support-guide.webp'
    WHEN 1 THEN '/content/research-paper-writing-guide.webp'
    WHEN 2 THEN '/content/dissertation-writing-help-guide.webp'
    WHEN 3 THEN '/content/essay-writing-structure-guide.webp'
    WHEN 4 THEN '/content/business-plan-writing-guide.webp'
    WHEN 5 THEN '/content/website-content-writing-guide.webp'
    WHEN 6 THEN '/content/proofreading-editing-guide.webp'
    ELSE '/content/storytelling-creative-writing-guide.webp'
  END),
  og_image = COALESCE(NULLIF(b.og_image, ''), COALESCE(NULLIF(b.featured_image, ''), CASE ((r.rn - 1) % 8)
    WHEN 0 THEN '/content/assignment-writing-support-guide.webp'
    WHEN 1 THEN '/content/research-paper-writing-guide.webp'
    WHEN 2 THEN '/content/dissertation-writing-help-guide.webp'
    WHEN 3 THEN '/content/essay-writing-structure-guide.webp'
    WHEN 4 THEN '/content/business-plan-writing-guide.webp'
    WHEN 5 THEN '/content/website-content-writing-guide.webp'
    WHEN 6 THEN '/content/proofreading-editing-guide.webp'
    ELSE '/content/storytelling-creative-writing-guide.webp'
  END)),
  meta_title = COALESCE(NULLIF(b.meta_title, ''), b.title || ' | WritingEra Blog'),
  meta_description = COALESCE(NULLIF(b.meta_description, ''), LEFT(COALESCE(NULLIF(b.excerpt, ''), regexp_replace(b.content, '<[^>]+>', ' ', 'g')), 155)),
  writer_name = COALESCE(NULLIF(b.writer_name, ''), 'WritingEra Editorial Team'),
  read_time = COALESCE(NULLIF(b.read_time, ''), CONCAT(GREATEST(3, CEIL(array_length(regexp_split_to_array(trim(regexp_replace(COALESCE(b.content, ''), '<[^>]+>', ' ', 'g')), E'\\s+'), 1) / 220.0))::int, ' min read')),
  created_at = TIMESTAMP WITH TIME ZONE '2025-05-08 09:00:00+00' + ((r.rn - 1) * INTERVAL '9 days')
FROM ranked r
WHERE b.id = r.id;

-- ARTICLES
WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) AS rn
  FROM public.articles
  WHERE published = true
)
UPDATE public.articles a
SET
  featured_image = COALESCE(NULLIF(a.featured_image, ''), CASE ((r.rn - 1) % 8)
    WHEN 0 THEN '/content/research-paper-writing-guide.webp'
    WHEN 1 THEN '/content/essay-writing-structure-guide.webp'
    WHEN 2 THEN '/content/assignment-writing-support-guide.webp'
    WHEN 3 THEN '/content/proofreading-editing-guide.webp'
    WHEN 4 THEN '/content/website-content-writing-guide.webp'
    WHEN 5 THEN '/content/business-plan-writing-guide.webp'
    WHEN 6 THEN '/content/dissertation-writing-help-guide.webp'
    ELSE '/content/storytelling-creative-writing-guide.webp'
  END),
  og_image = COALESCE(NULLIF(a.og_image, ''), COALESCE(NULLIF(a.featured_image, ''), CASE ((r.rn - 1) % 8)
    WHEN 0 THEN '/content/research-paper-writing-guide.webp'
    WHEN 1 THEN '/content/essay-writing-structure-guide.webp'
    WHEN 2 THEN '/content/assignment-writing-support-guide.webp'
    WHEN 3 THEN '/content/proofreading-editing-guide.webp'
    WHEN 4 THEN '/content/website-content-writing-guide.webp'
    WHEN 5 THEN '/content/business-plan-writing-guide.webp'
    WHEN 6 THEN '/content/dissertation-writing-help-guide.webp'
    ELSE '/content/storytelling-creative-writing-guide.webp'
  END)),
  meta_title = COALESCE(NULLIF(a.meta_title, ''), a.title || ' | WritingEra Articles'),
  meta_description = COALESCE(NULLIF(a.meta_description, ''), LEFT(COALESCE(NULLIF(a.excerpt, ''), regexp_replace(a.content, '<[^>]+>', ' ', 'g')), 155)),
  writer_name = COALESCE(NULLIF(a.writer_name, ''), 'WritingEra Editorial Team'),
  read_time = COALESCE(NULLIF(a.read_time, ''), CONCAT(GREATEST(3, CEIL(array_length(regexp_split_to_array(trim(regexp_replace(COALESCE(a.content, ''), '<[^>]+>', ' ', 'g')), E'\\s+'), 1) / 220.0))::int, ' min read')),
  created_at = TIMESTAMP WITH TIME ZONE '2025-04-12 10:00:00+00' + ((r.rn - 1) * INTERVAL '11 days')
FROM ranked r
WHERE a.id = r.id;

-- STORYTELLING
WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) AS rn
  FROM public.storytelling
  WHERE published = true
)
UPDATE public.storytelling s
SET
  featured_image = COALESCE(NULLIF(s.featured_image, ''), CASE ((r.rn - 1) % 5)
    WHEN 0 THEN '/content/storytelling-creative-writing-guide.webp'
    WHEN 1 THEN '/content/novel-writing-guide.webp'
    WHEN 2 THEN '/content/biography-writing-guide.webp'
    WHEN 3 THEN '/content/essay-writing-structure-guide.webp'
    ELSE '/content/website-content-writing-guide.webp'
  END),
  og_image = COALESCE(NULLIF(s.og_image, ''), COALESCE(NULLIF(s.featured_image, ''), CASE ((r.rn - 1) % 5)
    WHEN 0 THEN '/content/storytelling-creative-writing-guide.webp'
    WHEN 1 THEN '/content/novel-writing-guide.webp'
    WHEN 2 THEN '/content/biography-writing-guide.webp'
    WHEN 3 THEN '/content/essay-writing-structure-guide.webp'
    ELSE '/content/website-content-writing-guide.webp'
  END)),
  meta_title = COALESCE(NULLIF(s.meta_title, ''), s.title || ' | WritingEra Stories'),
  meta_description = COALESCE(NULLIF(s.meta_description, ''), LEFT(COALESCE(NULLIF(s.excerpt, ''), regexp_replace(s.content, '<[^>]+>', ' ', 'g')), 155)),
  writer_name = COALESCE(NULLIF(s.writer_name, ''), 'WritingEra Editorial Team'),
  read_time = COALESCE(NULLIF(s.read_time, ''), CONCAT(GREATEST(3, CEIL(array_length(regexp_split_to_array(trim(regexp_replace(COALESCE(s.content, ''), '<[^>]+>', ' ', 'g')), E'\\s+'), 1) / 220.0))::int, ' min read')),
  created_at = TIMESTAMP WITH TIME ZONE '2025-03-10 09:00:00+00' + ((r.rn - 1) * INTERVAL '14 days')
FROM ranked r
WHERE s.id = r.id;

-- NOVELS
WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) AS rn
  FROM public.novels
  WHERE published = true
)
UPDATE public.novels n
SET
  cover_image = COALESCE(NULLIF(n.cover_image, ''), CASE ((r.rn - 1) % 4)
    WHEN 0 THEN '/content/novel-writing-guide.webp'
    WHEN 1 THEN '/content/storytelling-creative-writing-guide.webp'
    WHEN 2 THEN '/content/biography-writing-guide.webp'
    ELSE '/content/essay-writing-structure-guide.webp'
  END),
  og_image = COALESCE(NULLIF(n.og_image, ''), COALESCE(NULLIF(n.cover_image, ''), CASE ((r.rn - 1) % 4)
    WHEN 0 THEN '/content/novel-writing-guide.webp'
    WHEN 1 THEN '/content/storytelling-creative-writing-guide.webp'
    WHEN 2 THEN '/content/biography-writing-guide.webp'
    ELSE '/content/essay-writing-structure-guide.webp'
  END)),
  meta_title = COALESCE(NULLIF(n.meta_title, ''), n.title || ' | WritingEra Novels'),
  meta_description = COALESCE(NULLIF(n.meta_description, ''), LEFT(COALESCE(NULLIF(n.description, ''), regexp_replace(n.content, '<[^>]+>', ' ', 'g')), 155)),
  writer_name = COALESCE(NULLIF(n.writer_name, ''), 'WritingEra Editorial Team'),
  read_time = COALESCE(NULLIF(n.read_time, ''), CONCAT(GREATEST(5, CEIL(array_length(regexp_split_to_array(trim(regexp_replace(COALESCE(n.content, ''), '<[^>]+>', ' ', 'g')), E'\\s+'), 1) / 240.0))::int, ' min read')),
  created_at = TIMESTAMP WITH TIME ZONE '2025-02-01 10:00:00+00' + ((r.rn - 1) * INTERVAL '21 days')
FROM ranked r
WHERE n.id = r.id;

-- BIOGRAPHY
WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY created_at, id) AS rn
  FROM public.biography
  WHERE published = true
)
UPDATE public.biography b
SET
  featured_image = COALESCE(NULLIF(b.featured_image, ''), CASE ((r.rn - 1) % 3)
    WHEN 0 THEN '/content/biography-writing-guide.webp'
    WHEN 1 THEN '/content/storytelling-creative-writing-guide.webp'
    ELSE '/content/novel-writing-guide.webp'
  END),
  og_image = COALESCE(NULLIF(b.og_image, ''), COALESCE(NULLIF(b.featured_image, ''), CASE ((r.rn - 1) % 3)
    WHEN 0 THEN '/content/biography-writing-guide.webp'
    WHEN 1 THEN '/content/storytelling-creative-writing-guide.webp'
    ELSE '/content/novel-writing-guide.webp'
  END)),
  meta_title = COALESCE(NULLIF(b.meta_title, ''), b.title || ' | WritingEra Biography'),
  meta_description = COALESCE(NULLIF(b.meta_description, ''), LEFT(regexp_replace(b.content, '<[^>]+>', ' ', 'g'), 155)),
  writer_name = COALESCE(NULLIF(b.writer_name, ''), 'WritingEra Editorial Team'),
  created_at = TIMESTAMP WITH TIME ZONE '2025-01-15 10:00:00+00' + ((r.rn - 1) * INTERVAL '18 days')
FROM ranked r
WHERE b.id = r.id;
