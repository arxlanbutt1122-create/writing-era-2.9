import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, FileArchive, X, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

interface CompressedFile {
  id: string;
  original: File;
  originalSize: number;
  originalUrl: string;
  compressed: Blob | null;
  compressedSize: number | null;
  compressedUrl: string | null;
  status: "pending" | "processing" | "done";
}

export default function FileCompressor() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>("webp");
  const [quality, setQuality] = useState<number>(80);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    const validFiles: CompressedFile[] = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      if (file.type.startsWith("image/")) {
        validFiles.push({
          id: `${Date.now()}-${i}`,
          original: file,
          originalSize: file.size,
          originalUrl: URL.createObjectURL(file),
          compressed: null,
          compressedSize: null,
          compressedUrl: null,
          status: "pending"
        });
      } else {
        toast.error(`${file.name} is not a valid image`);
      }
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added`);
    }
  };

  const compressFile = (fileData: CompressedFile): Promise<CompressedFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({
                  ...fileData,
                  compressed: blob,
                  compressedSize: blob.size,
                  compressedUrl: URL.createObjectURL(blob),
                  status: "done"
                });
              }
            },
            `image/${outputFormat}`,
            quality / 100
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(fileData.original);
    });
  };

  const handleCompressAll = async () => {
    if (files.length === 0) {
      toast.error("Please add files first");
      return;
    }

    const pendingFiles = files.filter(f => f.status === "pending");
    if (pendingFiles.length === 0) {
      toast.info("All files are already compressed");
      return;
    }

    setFiles(prev => prev.map(f => f.status === "pending" ? { ...f, status: "processing" as const } : f));

    const compressed = await Promise.all(
      pendingFiles.map(file => compressFile(file))
    );

    setFiles(prev => prev.map(f => {
      const updated = compressed.find(c => c.id === f.id);
      return updated || f;
    }));

    toast.success(`${compressed.length} file(s) compressed successfully`);
  };

  const downloadFile = (file: CompressedFile) => {
    if (!file.compressedUrl) return;
    
    const a = document.createElement("a");
    a.href = file.compressedUrl;
    a.download = `compressed_${file.original.name.split(".")[0]}.${outputFormat}`;
    a.click();
    toast.success("Downloaded!");
  };

  const downloadAll = () => {
    const completed = files.filter(f => f.status === "done");
    if (completed.length === 0) {
      toast.error("No compressed files to download");
      return;
    }

    completed.forEach(file => downloadFile(file));
    toast.success(`Downloaded ${completed.length} file(s)`);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    toast.info("File removed");
  };

  const clearAll = () => {
    files.forEach(f => {
      URL.revokeObjectURL(f.originalUrl);
      if (f.compressedUrl) URL.revokeObjectURL(f.compressedUrl);
    });
    setFiles([]);
    toast.info("All files cleared");
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const calculateSavings = (original: number, compressed: number | null) => {
    if (!compressed) return "—";
    const saved = ((original - compressed) / original * 100).toFixed(1);
    return `${saved}%`;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - File Compressor & Converter | WritingEra</title>
        <meta name="description" content="Compress and convert your images easily. Support for PNG, JPG, WebP, and GIF formats with quality control." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - File Compressor & Converter</h1>
            <p className="text-muted-foreground text-center mb-12">Compress and convert images with ease</p>

            <Card className="p-8 mb-6">
              <div className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDragEnter={handleDragIn}
                  onDragLeave={handleDragOut}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Input
                    type="file"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                    multiple
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">Images (PNG, JPG, WebP, GIF) - Multiple files supported</p>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Output Format</label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webp">WebP</SelectItem>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Quality: {quality}%</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleCompressAll} disabled={files.length === 0}>
                    <FileArchive className="mr-2 w-4 h-4" />
                    Compress All
                  </Button>
                  <Button variant="outline" onClick={downloadAll} disabled={files.filter(f => f.status === "done").length === 0}>
                    <Download className="mr-2 w-4 h-4" />
                    Download All
                  </Button>
                  <Button variant="outline" onClick={clearAll} disabled={files.length === 0}>
                    <Trash2 className="mr-2 w-4 h-4" />
                    Clear All
                  </Button>
                </div>
              </div>
            </Card>

            {files.length > 0 && (
              <div className="space-y-4">
                {files.map(file => (
                  <Card key={file.id} className="p-4">
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                          <img src={file.originalUrl} alt="Original" className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.original.name}</p>
                            <p className="text-sm text-muted-foreground">{formatSize(file.originalSize)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        {file.status === "processing" ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        ) : file.status === "done" && file.compressedUrl ? (
                          <img src={file.compressedUrl} alt="Compressed" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                            Pending
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        {file.status === "done" && file.compressedSize ? (
                          <>
                            <p className="font-semibold">{formatSize(file.compressedSize)}</p>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              Saved {calculateSavings(file.originalSize, file.compressedSize)}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">—</p>
                        )}
                      </div>

                      <div className="flex gap-2 justify-end">
                        {file.status === "done" && (
                          <Button size="sm" variant="outline" onClick={() => downloadFile(file)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => removeFile(file.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
