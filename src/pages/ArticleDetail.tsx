import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Clock, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

interface Article {
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

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!error && data) {
      setArticle(data);
    } else {
      navigate('/articles');
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

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.meta_title || article.title} - WritingEra</title>
        <meta name="description" content={article.meta_description || article.excerpt || article.title} />
      </Helmet>
      
      <Navigation />
      
      <main className="py-16 md:py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/articles")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>

          {article.category && (
            <Badge className="mb-4">{article.category}</Badge>
          )}
          
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
            {article.writer_name && (
              <span className="font-medium text-foreground">By {article.writer_name}</span>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
            </div>
            {article.read_time && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.read_time}</span>
              </div>
            )}
          </div>

          {article.featured_image && (
            <div 
              className="w-full h-96 bg-cover bg-center rounded-lg mb-8"
              style={{ backgroundImage: `url(${article.featured_image})` }}
            />
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
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

export default ArticleDetail;
