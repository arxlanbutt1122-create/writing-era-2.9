import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Newspaper, User, BookOpen, Book, Eye } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    articles: 0,
    biography: 0,
    storytelling: 0,
    novels: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [blogs, articles, biography, storytelling, novels] = await Promise.all([
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('biography').select('id', { count: 'exact', head: true }),
        supabase.from('storytelling').select('id', { count: 'exact', head: true }),
        supabase.from('novels').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        blogs: blogs.count || 0,
        articles: articles.count || 0,
        biography: biography.count || 0,
        storytelling: storytelling.count || 0,
        novels: novels.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Blogs', count: stats.blogs, icon: FileText, color: 'text-blue-500' },
    { title: 'Articles', count: stats.articles, icon: Newspaper, color: 'text-green-500' },
    { title: 'Biography', count: stats.biography, icon: User, color: 'text-purple-500' },
    { title: 'Storytelling', count: stats.storytelling, icon: BookOpen, color: 'text-orange-500' },
    { title: 'Novels', count: stats.novels, icon: Book, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.count}</div>
              <p className="text-xs text-muted-foreground mt-1">Total entries</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/admin/blogs" className="p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold text-foreground">Create New Blog</h3>
              <p className="text-sm text-muted-foreground mt-1">Add a new blog post</p>
            </a>
            <a href="/admin/articles" className="p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold text-foreground">Create New Article</h3>
              <p className="text-sm text-muted-foreground mt-1">Write an article</p>
            </a>
            <a href="/admin/storytelling" className="p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold text-foreground">Add Storytelling</h3>
              <p className="text-sm text-muted-foreground mt-1">Share a story</p>
            </a>
            <a href="/admin/novels" className="p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold text-foreground">Create Novel</h3>
              <p className="text-sm text-muted-foreground mt-1">Start writing a novel</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
