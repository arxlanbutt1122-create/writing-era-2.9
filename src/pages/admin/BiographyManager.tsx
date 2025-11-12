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

interface Biography {
  id: string;
  title: string;
  content: string;
  featured_image: string | null;
  published: boolean;
  created_at: string;
}

export default function BiographyManager() {
  const [biographies, setBiographies] = useState<Biography[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBiography, setEditingBiography] = useState<Biography | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    featured_image: '',
    meta_title: '',
    meta_description: '',
    og_image: '',
    published: false,
    writer_name: '',
  });

  const [customDate, setCustomDate] = useState('');


  const { clearSaved, getSaved } = useAutoSave('biography-draft', formData, dialogOpen && !editingBiography);

  useEffect(() => {
    fetchBiographies();
  }, []);

  useEffect(() => {
    if (dialogOpen && !editingBiography) {
      const saved = getSaved();
      if (saved && confirm('Recover unsaved draft?')) {
        setFormData(saved);
      }
    }
  }, [dialogOpen, editingBiography]);

  const fetchBiographies = async () => {
    const { data, error } = await supabase
      .from('biography')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch biographies',
        variant: 'destructive',
      });
    } else {
      setBiographies(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      featured_image: '',
      meta_title: '',
      meta_description: '',
      og_image: '',
      published: false,
      writer_name: '',
    });
    setCustomDate('');
    setEditingBiography(null);
    clearSaved();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const bioData = {
      ...formData,
      author_id: user?.id,
      ...(customDate && { created_at: new Date(customDate).toISOString() }),
    };

    if (editingBiography) {
      const { error } = await supabase
        .from('biography')
        .update(bioData)
        .eq('id', editingBiography.id);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success', description: 'Biography updated successfully' });
        setDialogOpen(false);
        resetForm();
        fetchBiographies();
      }
    } else {
      const { error } = await supabase.from('biography').insert([bioData]);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success', description: 'Biography created successfully' });
        setDialogOpen(false);
        resetForm();
        fetchBiographies();
      }
    }
  };

  const handleEdit = (bio: any) => {
    setEditingBiography(bio);
    setFormData({
      title: bio.title,
      content: bio.content,
      featured_image: bio.featured_image || '',
      meta_title: bio.meta_title || '',
      meta_description: bio.meta_description || '',
      og_image: bio.og_image || '',
      published: bio.published,
      writer_name: bio.writer_name || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this biography?')) return;

    const { error } = await supabase.from('biography').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Success', description: 'Biography deleted successfully' });
      fetchBiographies();
    }
  };

  const filteredBiographies = biographies.filter(bio =>
    bio.title.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-3xl font-bold text-foreground">Biography</h1>
          <p className="text-muted-foreground mt-1">Manage biography content</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search biographies..."
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
                New Biography
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBiography ? 'Edit Biography' : 'Create New Biography'}</DialogTitle>
              </DialogHeader>
              {!editingBiography && (
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
                      bucket="biography-images"
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
                    <ImageUpload
                      bucket="biography-images"
                      onUploadComplete={(url) => setFormData({ ...formData, og_image: url })}
                      currentImage={formData.og_image}
                      label="OG Image (Social Media)"
                    />
                  </TabsContent>
                </Tabs>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingBiography ? 'Update' : 'Create'} Biography
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
        {filteredBiographies.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No biographies found matching your search' : 'No biography content yet. Create your first one!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredBiographies.map((bio) => (
            <Card key={bio.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{bio.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{bio.content.replace(/<[^>]*>/g, '')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(bio)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(bio.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className={`px-2 py-1 rounded ${bio.published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {bio.published ? 'Published' : 'Draft'}
                  </span>
                  <span>{new Date(bio.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
