import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Search, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAutoSave } from '@/hooks/useAutoSave';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Story {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published: boolean;
  created_at: string;
}

export default function StorytellingManager() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    meta_title: '',
    meta_description: '',
    og_image: '',
    read_time: '',
    published: false,
    writer_name: '',
  });

  const [customDate, setCustomDate] = useState('');


  const { clearSaved, getSaved } = useAutoSave('story-draft', formData, dialogOpen && !editingStory);

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (dialogOpen && !editingStory) {
      const saved = getSaved();
      if (saved && confirm('Recover unsaved draft?')) {
        setFormData(saved);
      }
    }
  }, [dialogOpen, editingStory]);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('storytelling')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch stories',
        variant: 'destructive',
      });
    } else {
      setStories(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featured_image: '',
      meta_title: '',
      meta_description: '',
      og_image: '',
      read_time: '',
      published: false,
      writer_name: '',
    });
    setCustomDate('');
    setEditingStory(null);
    clearSaved();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const storyData = {
      ...formData,
      author_id: user?.id,
      ...(customDate && { created_at: new Date(customDate).toISOString() }),
    };

    if (editingStory) {
      const { error } = await supabase
        .from('storytelling')
        .update(storyData)
        .eq('id', editingStory.id);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success', description: 'Story updated successfully' });
        setDialogOpen(false);
        resetForm();
        fetchStories();
      }
    } else {
      const { error } = await supabase.from('storytelling').insert([storyData]);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success', description: 'Story created successfully' });
        setDialogOpen(false);
        resetForm();
        fetchStories();
      }
    }
  };

  const handleEdit = (story: any) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      slug: story.slug,
      content: story.content,
      excerpt: story.excerpt || '',
      featured_image: story.featured_image || '',
      meta_title: story.meta_title || '',
      meta_description: story.meta_description || '',
      og_image: story.og_image || '',
      read_time: story.read_time || '',
      published: story.published,
      writer_name: story.writer_name || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    const { error } = await supabase.from('storytelling').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Success', description: 'Story deleted successfully' });
      fetchStories();
    }
  };

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Storytelling</h1>
          <p className="text-muted-foreground mt-1">Manage your storytelling content</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingStory ? 'Edit Story' : 'Create New Story'}</DialogTitle>
              </DialogHeader>
              {!editingStory && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Auto-saving draft every 5 seconds...
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                  </TabsList>
                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="story-url"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Input
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Brief summary of the story"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="writer_name">Writer Name</Label>
                      <Input
                        id="writer_name"
                        value={formData.writer_name}
                        onChange={(e) => setFormData({ ...formData, writer_name: e.target.value })}
                        placeholder="Enter writer's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content *</Label>
                      <RichTextEditor
                        content={formData.content}
                        onChange={(html) => setFormData({ ...formData, content: html })}
                      />
                    </div>
                    <ImageUpload
                      bucket="storytelling-images"
                      onUploadComplete={(url) => setFormData({ ...formData, featured_image: url })}
                      currentImage={formData.featured_image}
                      label="Featured Image"
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customDate">Custom Publish Date & Time (Optional)</Label>
                      <Input
                        id="customDate"
                        type="datetime-local"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Leave empty to publish with current date/time</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="seo" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                        placeholder="SEO title (max 60 characters)"
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">{formData.meta_title.length}/60</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Input
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        placeholder="SEO description (max 160 characters)"
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">{formData.meta_description.length}/160</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="read_time">Read Time</Label>
                      <Input
                        id="read_time"
                        value={formData.read_time}
                        onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                        placeholder="e.g., 10 min read"
                      />
                    </div>
                    <ImageUpload
                      bucket="storytelling-images"
                      onUploadComplete={(url) => setFormData({ ...formData, og_image: url })}
                      currentImage={formData.og_image}
                      label="OG Image (Social Media)"
                    />
                  </TabsContent>
                </Tabs>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingStory ? 'Update' : 'Create'} Story
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredStories.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No stories found matching your search' : 'No stories yet. Create your first one!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredStories.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{story.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">/{story.slug}</p>
                    {story.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2">{story.excerpt}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(story)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(story.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className={`px-2 py-1 rounded ${story.published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {story.published ? 'Published' : 'Draft'}
                  </span>
                  <span>{new Date(story.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
