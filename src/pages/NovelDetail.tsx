import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

interface Novel {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string | null;
  cover_image: string | null;
  chapters: number;
  meta_title: string | null;
  meta_description: string | null;
  read_time: string | null;
  writer_name: string | null;
  created_at: string;
}

const NovelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNovel();
  }, [slug]);

  const fetchNovel = async () => {
    const { data, error } = await supabase
      .from('novels')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!error && data) {
      setNovel(data);
    } else {
      navigate('/novels');
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

  if (!novel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{novel.meta_title || novel.title} - WritingEra</title>
        <meta name="description" content={novel.meta_description || novel.description || novel.title} />
      </Helmet>
      
      <Navigation />
      
      <main className="py-16 md:py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/novels")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Novels
          </Button>

          <Badge className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            {novel.chapters} {novel.chapters === 1 ? 'Chapter' : 'Chapters'}
          </Badge>
          
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            {novel.title}
          </h1>

          {novel.description && (
            <p className="text-xl text-muted-foreground mb-6">
              {novel.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
            {novel.writer_name && (
              <span className="font-medium text-foreground">By {novel.writer_name}</span>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(novel.created_at).toLocaleDateString()}</span>
            </div>
            {novel.read_time && <span>{novel.read_time}</span>}
          </div>

          {novel.cover_image && (
            <div 
              className="w-full h-96 bg-cover bg-center rounded-lg mb-8"
              style={{ backgroundImage: `url(${novel.cover_image})` }}
            />
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: novel.content }}
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

export default NovelDetail;
