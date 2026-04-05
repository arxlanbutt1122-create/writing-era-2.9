import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { breadcrumbSchema, collectionPageSchema } from "@/utils/structuredData";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  created_at: string;
  read_time: string | null;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Articles | WritingEra"
        description="Read expert articles on writing, research, structure, editing, and academic success from WritingEra."
        path="/articles"
        schema={[
          collectionPageSchema({
            title: "Articles | WritingEra",
            description: "Read expert articles on writing, research, structure, editing, and academic success from WritingEra.",
            url: "https://www.writingera.com/articles",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://www.writingera.com" },
            { name: "Articles", url: "https://www.writingera.com/articles" },
          ]),
        ]}
      />

      <Navigation />

      <section className="relative py-20 md:py-28 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Articles</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Expert insights on writing, research, structure, editing, and academic success.
          </p>
        </div>
      </section>

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {article.featured_image && (
                    <Link to={`/articles/${article.slug}`} className="block">
                      <img src={article.featured_image} alt={article.title} className="w-full h-48 object-cover" loading="lazy" />
                    </Link>
                  )}
                  <CardHeader>
                    {article.category && <Badge className="w-fit mb-2">{article.category}</Badge>}
                    <CardTitle className="text-xl line-clamp-2">
                      <Link to={`/articles/${article.slug}`} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    {article.excerpt && <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      </div>
                      {article.read_time && <span>{article.read_time}</span>}
                    </div>
                    <Button asChild variant="default" className="w-full">
                      <Link to={`/articles/${article.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
