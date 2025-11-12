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

interface Novel {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string | null;
  cover_image: string | null;
  chapters: number;
  published: boolean;
  created_at: string;
}

export default function NovelsManager() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNovel, setEditingNovel] = useState<Novel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    description: '',
    cover_image: '',
    chapters: 1,
    meta_title: '',
    meta_description: '',
    og_image: '',
    read_time: '',
    published: false,
    writer_name: '',
  });

  const [customDate, setCustomDate] = useState('');


  const { clearSaved, getSaved } = useAutoSave('novel-draft', formData, dialogOpen && !editingNovel);

  useEffect(() => {
    fetchNovels();
  }, []);

  useEffect(() => {
    if (dialogOpen && !editingNovel) {
      const saved = getSaved();
      if (saved && confirm('Recover unsaved draft?')) {
        setFormData(saved);
      }
    }
  }, [dialogOpen, editingNovel]);

  const fetchNovels = async () => {
    const { data, error } = await supabase
      .from('novels')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch novels',
        variant: 'destructive',
      });
    } else {
      setNovels(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      description: '',
      cover_image: '',
      chapters: 1,
      meta_title: '',
      meta_description: '',
      og_image: '',
      read_time: '',
      published: false,
      writer_name: '',
    });
    setCustomDate('');
    setEditingNovel(null);
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

    const novelData = {
      ...formData,
      author_id: user?.id,
      ...(customDate && { created_at: new Date(customDate).toISOString() }),
    };

    if (editingNovel) {
      const { error } = await supabase
        .from('novels')
        .update(novelData)
        .eq('id', editingNovel.id);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success', description: 'Novel updated successfully' });
        setDialogOpen(false);
        resetForm();
        fetchNovels();
      }
    } else {
      const { error } = await supabase.from('novels').insert([novelData]);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success', description: 'Novel created successfully' });
        setDialogOpen(false);
        resetForm();
        fetchNovels();
      }
    }
  };

  const handleEdit = (novel: any) => {
    setEditingNovel(novel);
    setFormData({
      title: novel.title,
      slug: novel.slug,
      content: novel.content,
      description: novel.description || '',
      cover_image: novel.cover_image || '',
      chapters: novel.chapters,
      meta_title: novel.meta_title || '',
      meta_description: novel.meta_description || '',
      og_image: novel.og_image || '',
      read_time: novel.read_time || '',
      published: novel.published,
      writer_name: novel.writer_name || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this novel?')) return;

    const { error } = await supabase.from('novels').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Success', description: 'Novel deleted successfully' });
      fetchNovels();
    }
  };

  const filteredNovels = novels.filter(novel =>
    novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    novel.slug.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-3xl font-bold text-foreground">Novels</h1>
          <p className="text-muted-foreground mt-1">Manage your novels</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search novels..."
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
                New Novel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingNovel ? 'Edit Novel' : 'Create New Novel'}</DialogTitle>
              </DialogHeader>
              {!editingNovel && (
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
                        placeholder="novel-url"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief summary of the novel"
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
                      <Label htmlFor="chapters">Number of Chapters</Label>
                      <Input
                        id="chapters"
                        type="number"
                        min="1"
                        value={formData.chapters}
                        onChange={(e) => setFormData({ ...formData, chapters: parseInt(e.target.value) || 1 })}
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
                      bucket="novel-covers"
                      onUploadComplete={(url) => setFormData({ ...formData, cover_image: url })}
                      currentImage={formData.cover_image}
                      label="Cover Image"
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
                        placeholder="e.g., 2 hours"
                      />
                    </div>
                    <ImageUpload
                      bucket="novel-covers"
                      onUploadComplete={(url) => setFormData({ ...formData, og_image: url })}
                      currentImage={formData.og_image}
                      label="OG Image (Social Media)"
                    />
                  </TabsContent>
                </Tabs>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingNovel ? 'Update' : 'Create'} Novel
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
        {filteredNovels.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No novels found matching your search' : 'No novels yet. Create your first one!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNovels.map((novel) => (
            <Card key={novel.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{novel.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">/{novel.slug}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {novel.chapters} {novel.chapters === 1 ? 'Chapter' : 'Chapters'}
                      </span>
                    </div>
                    {novel.description && (
                      <p className="text-sm text-muted-foreground mt-2">{novel.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(novel)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(novel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className={`px-2 py-1 rounded ${novel.published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {novel.published ? 'Published' : 'Draft'}
                  </span>
                  <span>{new Date(novel.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
