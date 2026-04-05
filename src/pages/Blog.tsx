import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ArrowRight, Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { breadcrumbSchema, collectionPageSchema } from "@/utils/structuredData";
import blogHeroImage from "@/assets/writing-guides-blog-hero.webp";

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_type: string;
  featured_image: string | null;
  read_time: string | null;
  created_at: string;
}

const Blog = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const fetchBlogs = async () => {
    const [blogsData, articlesData, biographyData, storytellingData, novelsData] = await Promise.all([
      supabase.from("blogs").select("*").eq("published", true).order("created_at", { ascending: false }),
      supabase.from("articles").select("*").eq("published", true).order("created_at", { ascending: false }),
      supabase.from("biography").select("*").eq("published", true).order("created_at", { ascending: false }),
      supabase.from("storytelling").select("*").eq("published", true).order("created_at", { ascending: false }),
      supabase.from("novels").select("*").eq("published", true).order("created_at", { ascending: false }),
    ]);

    const allPosts: BlogPostItem[] = [
      ...(blogsData.data || []).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content_type: "Blog Posts",
        featured_image: post.featured_image || null,
        read_time: post.read_time || null,
        created_at: post.created_at,
      })),
      ...(articlesData.data || []).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content_type: "Articles",
        featured_image: post.featured_image || null,
        read_time: post.read_time || null,
        created_at: post.created_at,
      })),
      ...(biographyData.data || []).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.id,
        excerpt: null,
        content_type: "Biographies",
        featured_image: post.featured_image || null,
        read_time: null,
        created_at: post.created_at,
      })),
      ...(storytellingData.data || []).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || null,
        content_type: "Stories",
        featured_image: post.featured_image || null,
        read_time: post.read_time || null,
        created_at: post.created_at,
      })),
      ...(novelsData.data || []).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.description || null,
        content_type: "Novels",
        featured_image: post.cover_image || null,
        read_time: post.read_time || null,
        created_at: post.created_at,
      })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setBlogPosts(allPosts);
    setLoading(false);
  };

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "Blog Posts", label: "Blog Posts" },
    { value: "Articles", label: "Articles" },
    { value: "Biographies", label: "Biographies" },
    { value: "Stories", label: "Stories" },
    { value: "Novels", label: "Novels" },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.content_type === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  const getPostUrl = (post: BlogPostItem) => {
    switch (post.content_type) {
      case "Articles":
        return `/articles/${post.slug}`;
      case "Biographies":
        return `/biographies/${post.slug}`;
      case "Stories":
        return `/stories/${post.slug}`;
      case "Novels":
        return `/novels/${post.slug}`;
      default:
        return `/blog/${post.slug}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog, Articles, Stories & Writing Guides | WritingEra"
        description="Read writing guides, articles, biographies, stories, and publishing resources from WritingEra. Explore content for students, researchers, and professional writers."
        path="/blog"
        schema={[
          collectionPageSchema({
            title: "Blog, Articles, Stories & Writing Guides | WritingEra",
            description:
              "Read writing guides, articles, biographies, stories, and publishing resources from WritingEra.",
            url: "https://www.writingera.com/blog",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://www.writingera.com" },
            { name: "Blog", url: "https://www.writingera.com/blog" },
          ]),
        ]}
      />

      <Navigation />

      <section className="relative py-20 md:py-28 bg-cover bg-center">
        <img
          src={blogHeroImage}
          alt="Writing guides, blogs, articles, stories, and editorial resources"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">WritingEra Blog &amp; Resources</h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-8">
            Writing guides, articles, stories, and publishing resources for students, researchers, and clients who want stronger writing, better structure, and clearer next steps.
          </p>
        </div>
      </section>

      <main className="py-16 md:py-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <section className="container mx-auto px-4 mb-12 max-w-5xl text-center space-y-5">
              <h2 className="font-heading font-bold text-3xl md:text-4xl">Explore ideas, examples, and writing support paths</h2>
              <p className="text-lg text-muted-foreground leading-8">
                If you are reading for help with coursework or research, you can move from blog content to core service pages such as{" "}
                <Link to="/services/assignment-writing" className="text-primary underline underline-offset-4 font-medium">assignment writing service</Link>,{" "}
                <Link to="/services/research-paper" className="text-primary underline underline-offset-4 font-medium">research paper writing</Link>,{" "}
                <Link to="/services/dissertation-writing" className="text-primary underline underline-offset-4 font-medium">dissertation writing</Link>, and{" "}
                <Link to="/services/proofreading" className="text-primary underline underline-offset-4 font-medium">proofreading</Link>.
              </p>
            </section>

            {featuredPost && (
              <section className="container mx-auto px-4 mb-12">
                <div className="mb-8 max-w-2xl mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search blog posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12"
                    />
                  </div>
                </div>

                <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-2 mb-12">
                  <div className="grid md:grid-cols-2 gap-0">
                    {featuredPost.featured_image && (
                      <Link to={getPostUrl(featuredPost)} className="block">
                        <img
                          src={featuredPost.featured_image}
                          alt={featuredPost.title}
                          className="w-full h-80 object-cover"
                          loading="lazy"
                        />
                      </Link>
                    )}
                    <div className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-3">{featuredPost.content_type}</Badge>
                      <h2 className="font-heading font-bold text-3xl mb-4">{featuredPost.title}</h2>
                      {featuredPost.excerpt && <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                        </div>
                        {featuredPost.read_time && <span>{featuredPost.read_time}</span>}
                      </div>
                      <Button asChild size="lg">
                        <Link to={getPostUrl(featuredPost)}>
                          Read Featured Post <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            <section className="container mx-auto px-4">
              <div className="mb-12">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <TabsList className="w-full justify-center overflow-x-auto flex-nowrap h-auto gap-3 bg-muted/50 rounded-xl p-2 mb-8 border border-border/40">
                    {categories.map((cat) => (
                      <TabsTrigger
                        key={cat.value}
                        value={cat.value}
                        className="relative rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-muted/80"
                      >
                        {cat.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No posts found for this search.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      {post.featured_image && (
                        <Link to={getPostUrl(post)} className="block">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                        </Link>
                      )}
                      <CardHeader>
                        <Badge className="w-fit mb-2">{post.content_type}</Badge>
                        <CardTitle className="text-xl line-clamp-2">
                          <Link to={getPostUrl(post)} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                            {post.title}
                          </Link>
                        </CardTitle>
                        {post.excerpt && <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>}
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                          {post.read_time && <span>{post.read_time}</span>}
                        </div>
                        <Button asChild variant="default" className="w-full">
                          <Link to={getPostUrl(post)}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
