import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, Search, Loader2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { breadcrumbSchema, collectionPageSchema } from "@/utils/structuredData";

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  created_at: string;
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from("storytelling")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setStories(data);
    }
    setLoading(false);
  };

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Stories | WritingEra"
        description="Read storytelling pieces, creative writing examples, and narrative inspiration from WritingEra."
        path="/stories"
        schema={[
          collectionPageSchema({
            title: "Stories | WritingEra",
            description: "Read storytelling pieces, creative writing examples, and narrative inspiration from WritingEra.",
            url: "https://www.writingera.com/stories",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://www.writingera.com" },
            { name: "Stories", url: "https://www.writingera.com/stories" },
          ]),
        ]}
      />

      <Navigation />

      <section className="relative py-20 md:py-28 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Storytelling</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">Creative stories, narrative craft, and storytelling inspiration.</p>
        </div>
      </section>

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
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
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No stories found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {story.featured_image && (
                    <Link to={`/stories/${story.slug}`} className="block">
                      <img src={story.featured_image} alt={story.title} className="w-full h-48 object-cover" loading="lazy" />
                    </Link>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">
                      <Link to={`/stories/${story.slug}`} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                        {story.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    {story.excerpt && <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{story.excerpt}</p>}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(story.created_at).toLocaleDateString()}</span>
                      </div>
                      {story.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{story.read_time}</span>
                        </div>
                      )}
                    </div>
                    <Button asChild variant="default" className="w-full">
                      <Link to={`/stories/${story.slug}`}>
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

export default Stories;
