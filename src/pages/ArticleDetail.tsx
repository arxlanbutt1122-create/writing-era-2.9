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
  updated_at?: string;
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
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!error && data) {
      setArticle(data);
    } else {
      navigate("/articles");
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

  const title = article.meta_title || `${article.title} | WritingEra Articles`;
  const description = article.meta_description || article.excerpt || article.title;
  const path = `/articles/${article.slug}`;
  const schema = [
    articleSchema({
      title,
      description,
      url: `https://www.writingera.com${path}`,
      image: article.featured_image,
      datePublished: article.created_at,
      dateModified: article.updated_at || article.created_at,
      authorName: article.writer_name,
    }),
    breadcrumbSchema([
      { name: "Home", url: "https://www.writingera.com" },
      { name: "Articles", url: "https://www.writingera.com/articles" },
      { name: article.title, url: `https://www.writingera.com${path}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} path={path} image={article.featured_image || undefined} type="article" schema={schema} />

      <Navigation />

      <main className="py-16 md:py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/articles")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>

          {article.category && <Badge className="mb-4">{article.category}</Badge>}

          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
            {article.writer_name && <span className="font-medium text-foreground">By {article.writer_name}</span>}
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
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-auto max-h-[520px] object-cover rounded-lg mb-8"
              loading="eager"
            />
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-img:rounded-xl prose-img:shadow-lg prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            <Link to="/services/essay-writing" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2">Essay Writing Service</h3>
              <p className="text-sm text-muted-foreground">Useful when you need structure, argument flow, and clear academic formatting.</p>
            </Link>
            <Link to="/services/dissertation-writing" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2">Dissertation Writing</h3>
              <p className="text-sm text-muted-foreground">Helpful for long-form research work, chapters, and postgraduate projects.</p>
            </Link>
            <Link to="/services/academic-editing" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2">Academic Editing</h3>
              <p className="text-sm text-muted-foreground">Best for improving clarity, coherence, language quality, and submission readiness.</p>
            </Link>
          </div>

          <div className="mt-12 p-8 bg-gradient-primary text-white rounded-lg text-center">
            <h2 className="font-heading font-bold text-2xl mb-3">Need expert support for the topic you just read about?</h2>
            <p className="mb-6 opacity-90">
              Move from reading to action with WritingEra services for research, essays, dissertations, editing, and business writing.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="secondary" size="lg" onClick={() => navigate("/services")}>Explore Our Services</Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary" onClick={() => navigate("/contact")}>Talk to WritingEra</Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
