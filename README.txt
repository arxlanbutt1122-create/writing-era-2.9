WRITINGERA PHASE-1 SEO + CONTENT + IMAGE PACK

This pack is designed to fix the biggest code-visible SEO issues and improve homepage structure, internal linking, image delivery, and content-page presentation.

WHAT IS INSIDE
1. project/index.html
2. project/public/robots.txt
3. project/public/sitemap.xml
4. project/public/content/*.webp
5. project/public/founder-ceo-m-arslan-asif.webp
6. project/vercel.json
7. project/src/components/SEO.tsx
8. project/src/utils/structuredData.ts
9. project/src/components/HeroSection.tsx
10. project/src/components/FeaturedServices.tsx
11. project/src/pages/Index.tsx
12. project/src/pages/Services.tsx
13. project/src/pages/About.tsx
14. project/src/pages/Blog.tsx
15. project/src/pages/BlogPost.tsx
16. project/src/pages/ArticleDetail.tsx
17. project/src/pages/Articles.tsx
18. project/src/pages/Stories.tsx
19. project/src/pages/ServiceDetail.tsx
20. project/src/pages/NotFound.tsx
21. project/src/pages/Order.tsx
22. project/src/assets/*.webp and project/src/assets/services/*.webp
23. project/supabase/migrations/20260405_content_seo_refresh.sql

WHAT THIS PACK DOES
- removes duplicate canonical risk from index.html by leaving canonical handling to page-level SEO
- adds a reusable SEO component with canonical, robots, OG, and Twitter tags
- adds structured data for organization, founder, service pages, breadcrumbs, FAQ, and article pages
- expands the homepage with useful, client-facing content and stronger internal links
- adds category cards and a quick order card on the homepage
- makes homepage featured service cards and titles clearly clickable
- improves the services hub page and adds category query support
- improves blog/articles/stories listings and content-page presentation
- adds a real custom 404 page with noindex
- adds optimized WEBP images with better file names for key homepage/service assets
- adds SEO-friendly placeholder images for blog/article/story content
- includes SQL to stagger dates, fill missing images, and improve meta fields in Supabase content tables

IMPORTANT
- If you already changed some files like footer/email/social links, do NOT overwrite those unless you want the version inside this pack.
- For blogs/articles/stories/novels/biography image + date updates, you must run the SQL file in Supabase SQL Editor.
- The SQL only works after you upload the public/content images by deploying this pack.

SUGGESTED INSTALL ORDER
1. Replace the listed files/folders in your repo with the versions in this pack.
2. Commit and deploy.
3. After the deployment is live, run:
   project/supabase/migrations/20260405_content_seo_refresh.sql
4. Recheck:
   /robots.txt
   /sitemap.xml
   homepage
   services page
   blog/articles/story pages

