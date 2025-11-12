import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, Search, Loader2, BookOpen } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

interface Novel {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  chapters: number;
  read_time: string | null;
  created_at: string;
}

const Novels = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNovels();
  }, []);

  const fetchNovels = async () => {
    const { data, error } = await supabase
      .from('novels')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNovels(data);
    }
    setLoading(false);
  };

  const filteredNovels = novels.filter(novel =>
    novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    novel.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Novels - WritingEra</title>
        <meta name="description" content="Explore our collection of novels and learn the art of novel writing." />
      </Helmet>
      
      <Navigation />
      
      <section className="relative py-20 md:py-28 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
            Novels
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover captivating novels and master novel writing
          </p>
        </div>
      </section>
      
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search novels..."
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
          ) : filteredNovels.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No novels found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNovels.map((novel) => (
                <Card key={novel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {novel.cover_image && (
                    <Link to={`/novels/${novel.slug}`} className="block">
                      <div className="w-full h-64 bg-cover bg-center cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundImage: `url(${novel.cover_image})` }} />
                    </Link>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">{novel.title}</CardTitle>
                    <Badge className="w-fit">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {novel.chapters} {novel.chapters === 1 ? 'Chapter' : 'Chapters'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    {novel.description && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {novel.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(novel.created_at).toLocaleDateString()}</span>
                      </div>
                      {novel.read_time && <span>{novel.read_time}</span>}
                    </div>
                    <Button asChild variant="default" className="w-full">
                      <Link to={`/novels/${novel.slug}`}>
                        Read Novel <ArrowRight className="ml-2 h-4 w-4" />
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

export default Novels;
