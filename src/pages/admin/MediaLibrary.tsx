import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, Search, Copy, Trash2, Image as ImageIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StorageFile {
  name: string;
  bucket: string;
  url: string;
  created_at: string;
}

const BUCKETS = [
  { id: 'blog-images', name: 'Blog Images' },
  { id: 'article-images', name: 'Article Images' },
  { id: 'biography-images', name: 'Biography Images' },
  { id: 'storytelling-images', name: 'Storytelling Images' },
  { id: 'novel-covers', name: 'Novel Covers' },
];

export default function MediaLibrary() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBucket, setSelectedBucket] = useState<string>('all');

  useEffect(() => {
    fetchFiles();
  }, [selectedBucket]);

  const fetchFiles = async () => {
    setLoading(true);
    const allFiles: StorageFile[] = [];

    const bucketsToFetch = selectedBucket === 'all' 
      ? BUCKETS.map(b => b.id) 
      : [selectedBucket];

    for (const bucketId of bucketsToFetch) {
      const { data, error } = await supabase.storage.from(bucketId).list();

      if (error) {
        console.error(`Error fetching from ${bucketId}:`, error);
        continue;
      }

      if (data) {
        const filesWithUrls = data.map(file => ({
          name: file.name,
          bucket: bucketId,
          url: supabase.storage.from(bucketId).getPublicUrl(file.name).data.publicUrl,
          created_at: file.created_at || '',
        }));
        allFiles.push(...filesWithUrls);
      }
    }

    setFiles(allFiles.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ));
    setLoading(false);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Success',
      description: 'URL copied to clipboard',
    });
  };

  const deleteFile = async (file: StorageFile) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    const { error } = await supabase.storage
      .from(file.bucket)
      .remove([file.name]);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'File deleted successfully',
      });
      fetchFiles();
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div>
        <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
        <p className="text-muted-foreground mt-1">Manage all uploaded images</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedBucket} onValueChange={setSelectedBucket}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select bucket" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Buckets</SelectItem>
            {BUCKETS.map(bucket => (
              <SelectItem key={bucket.id} value={bucket.id}>
                {bucket.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredFiles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No files found matching your search' : 'No files uploaded yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card key={`${file.bucket}-${file.name}`} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {BUCKETS.find(b => b.id === file.bucket)?.name || file.bucket}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => copyUrl(file.url)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy URL
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteFile(file)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
