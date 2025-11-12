import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Clock, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
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
}

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    if (!postId) {
      navigate('/blog');
      setLoading(false);
      return;
    }

    // Clean the slug by removing leading/trailing slashes
    const cleanSlug = postId.replace(/^\/+|\/+$/g, '');

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', cleanSlug)
      .eq('published', true)
      .maybeSingle();

    if (error || !data) {
      navigate('/blog');
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.meta_title || post.title} - WritingEra Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt || post.title} />
      </Helmet>
      
      <Navigation />
      
      <main className="py-16 md:py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          {post.category && (
            <Badge className="mb-4">{post.category}</Badge>
          )}
          
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
            {post.writer_name && (
              <span className="font-medium text-foreground">By {post.writer_name}</span>
            )}
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
            <div 
              className="w-full h-96 bg-cover bg-center rounded-lg mb-8"
              style={{ backgroundImage: `url(${post.featured_image})` }}
            />
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 p-8 bg-gradient-primary text-white rounded-lg text-center">
            <h3 className="font-heading font-bold text-2xl mb-3">
              Need Professional Writing Help?
            </h3>
            <p className="mb-6 opacity-90">
              Our expert writers are ready to assist you with any academic or professional writing project
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/services")}
            >
              Explore Our Services
            </Button>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
