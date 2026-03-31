import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, Search, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

interface Biography {
  id: string;
  title: string;
  content: string;
  featured_image: string | null;
  created_at: string;
}

const Biographies = () => {
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBiographies();
  }, []);

  const fetchBiographies = async () => {
    const { data, error } = await supabase
      .from('biography')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBiographies(data);
    }
    setLoading(false);
  };

  const filteredBiographies = biographies.filter(bio =>
    bio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bio.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Biographies - WritingEra</title>
        <meta name="description" content="Read inspiring biographies of renowned writers and literary figures." />
      </Helmet>
      
      <Navigation />
      
      <section className="relative py-20 md:py-28 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
            Biographies
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover the lives and legacies of literary greats
          </p>
        </div>
      </section>
      
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search biographies..."
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
          ) : filteredBiographies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No biographies found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBiographies.map((bio) => (
                <Card key={bio.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {bio.featured_image && (
                    <Link to={`/biographies/${bio.id}`} className="block">
                      <div className="w-full h-48 bg-cover bg-center cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundImage: `url(${bio.featured_image})` }} />
                    </Link>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">{bio.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {bio.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(bio.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button asChild variant="default" className="w-full">
                      <Link to={`/biographies/${bio.id}`}>
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

export default Biographies;
