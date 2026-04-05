import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { articleSchema, breadcrumbSchema } from "@/utils/structuredData";

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  read_time: string | null;
  writer_name: string | null;
  created_at: string;
  updated_at?: string;
}

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    if (!postId) {
      navigate("/blog");
      setLoading(false);
      return;
    }

    const cleanSlug = postId.replace(/^\/+|\/+$/g, "");

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", cleanSlug)
      .eq("published", true)
      .maybeSingle();

    if (error || !data) {
      navigate("/blog");
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const title = post.meta_title || `${post.title} | WritingEra Blog`;
  const description = post.meta_description || post.excerpt || post.title;
  const path = `/blog/${post.slug}`;
  const schema = [
    articleSchema({
      title,
      description,
      url: `https://www.writingera.com${path}`,
      image: post.featured_image,
      datePublished: post.created_at,
      dateModified: post.updated_at || post.created_at,
      authorName: post.writer_name,
    }),
    breadcrumbSchema([
      { name: "Home", url: "https://www.writingera.com" },
      { name: "Blog", url: "https://www.writingera.com/blog" },
      { name: post.title, url: `https://www.writingera.com${path}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} path={path} image={post.featured_image || undefined} type="article" schema={schema} />

      <Navigation />

      <main className="py-16 md:py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          {post.category && <Badge className="mb-4">{post.category}</Badge>}

          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
            {post.writer_name && <span className="font-medium text-foreground">By {post.writer_name}</span>}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time}</span>
              </div>
            )}
          </div>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-auto max-h-[520px] object-cover rounded-lg mb-8"
              loading="eager"
            />
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-img:rounded-xl prose-img:shadow-lg prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            <Link to="/services/assignment-writing" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2">Assignment Writing Service</h3>
              <p className="text-sm text-muted-foreground">For structured coursework, urgent assignments, and academic reports.</p>
            </Link>
            <Link to="/services/research-paper" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2">Research Paper Writing</h3>
              <p className="text-sm text-muted-foreground">For research-led writing, source handling, citations, and academic structure.</p>
            </Link>
            <Link to="/services/proofreading" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2">Proofreading &amp; Editing</h3>
              <p className="text-sm text-muted-foreground">For polishing, grammar checks, and final-draft improvement before submission.</p>
            </Link>
          </div>

          <div className="mt-12 p-8 bg-gradient-primary text-white rounded-lg text-center">
            <h2 className="font-heading font-bold text-2xl mb-3">Need professional writing help for a similar topic?</h2>
            <p className="mb-6 opacity-90">
              Explore academic writing, research support, proofreading, and business writing services from WritingEra.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="secondary" size="lg" onClick={() => navigate("/services")}>Explore Services</Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary" onClick={() => navigate("/order")}>Start an Order</Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
