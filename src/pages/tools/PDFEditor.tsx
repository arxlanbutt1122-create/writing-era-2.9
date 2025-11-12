import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Upload, Download, ZoomIn, ZoomOut, RotateCw, Trash2, Copy,
  Pen, Highlighter, Type, Square, Circle, Eraser, Save, FileText,
  ArrowRight, Edit2, Printer, GripVertical
} from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import jsPDF from "jspdf";

// Configure PDF.js worker - use npm package worker for reliability
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface Annotation {
  id: number;
  type: "pen" | "highlight" | "text" | "rect" | "circle" | "arrow" | "signature";
  pageIndex: number;
  data: any;
  color: string;
  size?: number;
  opacity?: number;
}

interface PDFPage {
  index: number;
  canvas: HTMLCanvasElement;
  rotation: number;
  annotations: Annotation[];
}

export default function PDFEditor() {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfPages, setPdfPages] = useState<PDFPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoom, setZoom] = useState(1.0);
  const [tool, setTool] = useState<"select" | "pen" | "highlight" | "text" | "rect" | "circle" | "arrow" | "eraser" | "signature">("select");
  const [color, setColor] = useState("#ff0000");
  const [penSize, setPenSize] = useState(3);
  const [highlightOpacity, setHighlightOpacity] = useState(0.3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tempAnnotation, setTempAnnotation] = useState<any>(null);
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isDrawingSignature, setIsDrawingSignature] = useState(false);
  const [editingText, setEditingText] = useState<{ id: number; text: string; x: number; y: number } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pdf-editor-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPdfPages(data.pages || []);
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }
  }, []);

  useEffect(() => {
    if (pdfPages.length > 0) {
      localStorage.setItem("pdf-editor-data", JSON.stringify({ pages: pdfPages }));
      renderCurrentPage();
    }
  }, [pdfPages, currentPageIndex, zoom]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    if (uploadedFiles.length === 0) return;

    setFiles([...files, ...uploadedFiles]);

    for (const file of uploadedFiles) {
      if (file.type === "application/pdf") {
        await loadPDF(file);
      } else {
        toast.error("Please upload valid PDF files");
      }
    }
  };

  const loadPDF = async (file: File) => {
    try {
      toast.info("Loading PDF...");
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true
      });
      const pdf = await loadingTask.promise;
      
      const newPages: PDFPage[] = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          const renderContext: any = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
        }

        newPages.push({
          index: pdfPages.length + i - 1,
          canvas,
          rotation: 0,
          annotations: [],
        });
      }

      setPdfPages([...pdfPages, ...newPages]);
      toast.success(`Loaded ${pdf.numPages} pages successfully`);
    } catch (error: any) {
      console.error("PDF Loading Error:", error);
      toast.error(`Failed to load PDF: ${error?.message || 'Unknown error'}. Please try a different file.`);
    }
  };

  const renderCurrentPage = () => {
    if (!canvasRef.current || pdfPages.length === 0) return;

    const page = pdfPages[currentPageIndex];
    if (!page) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = page.canvas.width * zoom;
    canvasRef.current.height = page.canvas.height * zoom;

    ctx.save();
    ctx.scale(zoom, zoom);
    
    // Apply rotation
    if (page.rotation !== 0) {
      ctx.translate(page.canvas.width / 2, page.canvas.height / 2);
      ctx.rotate((page.rotation * Math.PI) / 180);
      ctx.translate(-page.canvas.width / 2, -page.canvas.height / 2);
    }

    ctx.drawImage(page.canvas, 0, 0);
    ctx.restore();

    // Render annotations
    page.annotations.forEach(annotation => {
      renderAnnotation(ctx, annotation);
    });
  };

  const renderAnnotation = (ctx: CanvasRenderingContext2D, annotation: Annotation) => {
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.strokeStyle = annotation.color;
    ctx.fillStyle = annotation.color;
    ctx.lineWidth = annotation.size || 3;
    ctx.globalAlpha = annotation.opacity || 1;

    switch (annotation.type) {
      case "pen":
        ctx.beginPath();
        annotation.data.points.forEach((point: [number, number], i: number) => {
          if (i === 0) ctx.moveTo(point[0], point[1]);
          else ctx.lineTo(point[0], point[1]);
        });
        ctx.stroke();
        break;
      
      case "highlight":
        ctx.globalAlpha = annotation.opacity || 0.3;
        ctx.fillRect(annotation.data.x, annotation.data.y, annotation.data.width, annotation.data.height);
        break;
      
      case "text":
        ctx.globalAlpha = 1;
        ctx.font = `${annotation.size || 16}px Arial`;
        ctx.fillText(annotation.data.text, annotation.data.x, annotation.data.y);
        break;
      
      case "rect":
        ctx.strokeRect(annotation.data.x, annotation.data.y, annotation.data.width, annotation.data.height);
        break;
      
      case "circle":
        ctx.beginPath();
        ctx.arc(annotation.data.x, annotation.data.y, annotation.data.radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      
      case "arrow":
        ctx.beginPath();
        ctx.moveTo(annotation.data.x1, annotation.data.y1);
        ctx.lineTo(annotation.data.x2, annotation.data.y2);
        ctx.stroke();
        
        // Draw arrowhead
        const angle = Math.atan2(annotation.data.y2 - annotation.data.y1, annotation.data.x2 - annotation.data.x1);
        const headLength = 15;
        ctx.beginPath();
        ctx.moveTo(annotation.data.x2, annotation.data.y2);
        ctx.lineTo(
          annotation.data.x2 - headLength * Math.cos(angle - Math.PI / 6),
          annotation.data.y2 - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(annotation.data.x2, annotation.data.y2);
        ctx.lineTo(
          annotation.data.x2 - headLength * Math.cos(angle + Math.PI / 6),
          annotation.data.y2 - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
        break;
      
      case "signature":
        if (annotation.data.image) {
          const img = new Image();
          img.src = annotation.data.image;
          ctx.globalAlpha = 1;
          ctx.drawImage(img, annotation.data.x, annotation.data.y, annotation.data.width, annotation.data.height);
        }
        break;
    }

    ctx.restore();
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    // Eraser tool - click to remove annotation
    if (tool === "eraser") {
      const page = pdfPages[currentPageIndex];
      const clickedAnnotation = page.annotations.find(ann => {
        return isPointInAnnotation(x, y, ann);
      });
      
      if (clickedAnnotation) {
        setPdfPages(pdfPages.map((p, idx) =>
          idx === currentPageIndex
            ? { ...p, annotations: p.annotations.filter(a => a.id !== clickedAnnotation.id) }
            : p
        ));
        toast.success("Annotation removed");
      }
      return;
    }

    // Text tool - create editable text
    if (tool === "text") {
      const textId = Date.now();
      setEditingText({ id: textId, text: "", x, y });
      return;
    }

    // Signature tool - place signature
    if (tool === "signature") {
      if (signatureData) {
        addAnnotation({
          type: "signature",
          data: { image: signatureData, x, y, width: 150, height: 75 },
        });
        toast.success("Signature placed");
      } else {
        setSignatureDialogOpen(true);
        toast.info("Please draw a signature first");
      }
      return;
    }

    if (tool === "select") return;

    setIsDrawing(true);

    if (tool === "pen") {
      setTempAnnotation({
        type: "pen",
        points: [[x, y]],
      });
    } else {
      setTempAnnotation({ startX: x, startY: y });
    }
  };

  const isPointInAnnotation = (x: number, y: number, annotation: Annotation): boolean => {
    switch (annotation.type) {
      case "text":
        const textWidth = annotation.data.text.length * (annotation.size || 16) * 0.6;
        return x >= annotation.data.x && x <= annotation.data.x + textWidth &&
               y >= annotation.data.y - (annotation.size || 16) && y <= annotation.data.y + 5;
      case "rect":
        return x >= annotation.data.x && x <= annotation.data.x + annotation.data.width &&
               y >= annotation.data.y && y <= annotation.data.y + annotation.data.height;
      case "circle":
        const dist = Math.sqrt(Math.pow(x - annotation.data.x, 2) + Math.pow(y - annotation.data.y, 2));
        return dist <= annotation.data.radius;
      case "highlight":
        return x >= annotation.data.x && x <= annotation.data.x + annotation.data.width &&
               y >= annotation.data.y && y <= annotation.data.y + annotation.data.height;
      case "signature":
        return x >= annotation.data.x && x <= annotation.data.x + annotation.data.width &&
               y >= annotation.data.y && y <= annotation.data.y + annotation.data.height;
      default:
        return false;
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === "select" || tool === "text") return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (tool === "pen" && tempAnnotation) {
      setTempAnnotation({
        ...tempAnnotation,
        points: [...tempAnnotation.points, [x, y]],
      });
      renderCurrentPage();
      
      // Draw temp line
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.scale(zoom, zoom);
        ctx.strokeStyle = color;
        ctx.lineWidth = penSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        const points = tempAnnotation.points;
        const lastPoint = points[points.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPoint[0], lastPoint[1]);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (tool === "pen" && tempAnnotation) {
      addAnnotation({
        type: "pen",
        data: { points: tempAnnotation.points },
        color,
        size: penSize,
      });
    } else if (tool === "highlight" && tempAnnotation) {
      addAnnotation({
        type: "highlight",
        data: {
          x: tempAnnotation.startX,
          y: tempAnnotation.startY,
          width: x - tempAnnotation.startX,
          height: y - tempAnnotation.startY,
        },
        color,
        opacity: highlightOpacity,
      });
    } else if (tool === "rect" && tempAnnotation) {
      addAnnotation({
        type: "rect",
        data: {
          x: tempAnnotation.startX,
          y: tempAnnotation.startY,
          width: x - tempAnnotation.startX,
          height: y - tempAnnotation.startY,
        },
        color,
        size: penSize,
      });
    } else if (tool === "circle" && tempAnnotation) {
      const radius = Math.sqrt(
        Math.pow(x - tempAnnotation.startX, 2) + Math.pow(y - tempAnnotation.startY, 2)
      );
      addAnnotation({
        type: "circle",
        data: { x: tempAnnotation.startX, y: tempAnnotation.startY, radius },
        color,
        size: penSize,
      });
    } else if (tool === "arrow" && tempAnnotation) {
      addAnnotation({
        type: "arrow",
        data: {
          x1: tempAnnotation.startX,
          y1: tempAnnotation.startY,
          x2: x,
          y2: y,
        },
        color,
        size: penSize,
      });
    }

    setIsDrawing(false);
    setTempAnnotation(null);
  };

  const addAnnotation = (annotationData: any) => {
    const newAnnotation: Annotation = {
      id: Date.now(),
      pageIndex: currentPageIndex,
      ...annotationData,
    };

    setPdfPages(
      pdfPages.map((page, idx) =>
        idx === currentPageIndex
          ? { ...page, annotations: [...page.annotations, newAnnotation] }
          : page
      )
    );
  };

  const rotatePage = () => {
    setPdfPages(
      pdfPages.map((page, idx) =>
        idx === currentPageIndex
          ? { ...page, rotation: (page.rotation + 90) % 360 }
          : page
      )
    );
  };

  const deletePage = () => {
    if (pdfPages.length === 1) {
      toast.error("Cannot delete the last page");
      return;
    }

    setPdfPages(pdfPages.filter((_, idx) => idx !== currentPageIndex));
    setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
    toast.success("Page deleted");
  };

  const duplicatePage = () => {
    const page = pdfPages[currentPageIndex];
    setPdfPages([...pdfPages.slice(0, currentPageIndex + 1), { ...page, index: Date.now() }, ...pdfPages.slice(currentPageIndex + 1)]);
    toast.success("Page duplicated");
  };

  const exportPDF = async () => {
    if (pdfPages.length === 0) return;

    toast.info("Generating PDF...");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [pdfPages[0].canvas.width, pdfPages[0].canvas.height],
    });

    for (let i = 0; i < pdfPages.length; i++) {
      if (i > 0) pdf.addPage();

      const tempCanvas = document.createElement("canvas");
      const ctx = tempCanvas.getContext("2d");
      const page = pdfPages[i];

      tempCanvas.width = page.canvas.width;
      tempCanvas.height = page.canvas.height;

      if (ctx) {
        ctx.drawImage(page.canvas, 0, 0);
        
        // Render all annotations
        page.annotations.forEach(annotation => {
          renderAnnotation(ctx, annotation);
        });
      }

      const imgData = tempCanvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, page.canvas.width, page.canvas.height);
    }

    pdf.save("edited-document.pdf");
    toast.success("PDF exported!");
  };

  const saveDraft = () => {
    localStorage.setItem("pdf-editor-data", JSON.stringify({ pages: pdfPages }));
    toast.success("Draft saved");
  };

  const printPDF = () => {
    window.print();
    toast.success("Opening print dialog");
  };

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      setSignatureData(dataUrl);
      setSignatureDialogOpen(false);
      toast.success("Signature saved! Click on PDF to place it.");
    }
  };

  const handleSignatureMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawingSignature(true);
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const handleSignatureMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingSignature) return;
    const canvas = signatureCanvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const handleSignatureMouseUp = () => {
    setIsDrawingSignature(false);
  };

  const finishEditingText = () => {
    if (editingText && editingText.text.trim()) {
      addAnnotation({
        type: "text",
        data: { text: editingText.text, x: editingText.x, y: editingText.y },
        color,
        size: penSize * 3,
      });
    }
    setEditingText(null);
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - PDF Editor | WritingEra</title>
        <meta name="description" content="Edit, annotate, merge, and manage PDF files with our online PDF editor." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - PDF Editor</h1>
          <p className="text-muted-foreground text-center mb-8">Edit and manage your PDF files online</p>

          {pdfPages.length === 0 ? (
            <Card className="p-12 max-w-2xl mx-auto">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="application/pdf"
                multiple
              />
              <div className="text-center">
                <Upload className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <Button onClick={() => fileInputRef.current?.click()} size="lg">
                  Upload PDF Files
                </Button>
                <p className="text-sm text-muted-foreground mt-4">Supports multiple files</p>
              </div>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Tools Panel */}
              <div className="lg:col-span-1">
                <Card className="p-4 sticky top-4">
                  <h3 className="font-bold mb-4">Tools</h3>
                  
                  <Tabs defaultValue="annotate" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="annotate">Annotate</TabsTrigger>
                      <TabsTrigger value="page">Page</TabsTrigger>
                    </TabsList>

                    <TabsContent value="annotate" className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button onClick={() => setTool("select")} variant={tool === "select" ? "default" : "outline"} size="sm">
                          Select
                        </Button>
                        <Button onClick={() => setTool("pen")} variant={tool === "pen" ? "default" : "outline"} size="sm">
                          <Pen className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setTool("highlight")} variant={tool === "highlight" ? "default" : "outline"} size="sm">
                          <Highlighter className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setTool("text")} variant={tool === "text" ? "default" : "outline"} size="sm">
                          <Type className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setTool("rect")} variant={tool === "rect" ? "default" : "outline"} size="sm">
                          <Square className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setTool("circle")} variant={tool === "circle" ? "default" : "outline"} size="sm">
                          <Circle className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setTool("arrow")} variant={tool === "arrow" ? "default" : "outline"} size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setTool("eraser")} variant={tool === "eraser" ? "default" : "outline"} size="sm">
                          <Eraser className="w-4 h-4" />
                        </Button>
                      </div>

                      <Dialog open={signatureDialogOpen} onOpenChange={setSignatureDialogOpen}>
                        <DialogTrigger asChild>
                          <Button onClick={() => setTool("signature")} variant={tool === "signature" ? "default" : "outline"} className="w-full">
                            <Edit2 className="mr-2 w-4 h-4" />
                            Signature
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Draw Your Signature</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <canvas
                              ref={signatureCanvasRef}
                              width={400}
                              height={200}
                              onMouseDown={handleSignatureMouseDown}
                              onMouseMove={handleSignatureMouseMove}
                              onMouseUp={handleSignatureMouseUp}
                              className="border border-border rounded-lg w-full cursor-crosshair bg-white"
                            />
                            <div className="flex gap-2">
                              <Button onClick={clearSignature} variant="outline">Clear</Button>
                              <Button onClick={saveSignature} className="flex-1">Save Signature</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <div>
                        <label className="text-sm font-medium">Color</label>
                        <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Size: {penSize}</label>
                        <Slider value={[penSize]} onValueChange={(v) => setPenSize(v[0])} min={1} max={20} step={1} />
                      </div>

                      {tool === "highlight" && (
                        <div>
                          <label className="text-sm font-medium">Opacity: {highlightOpacity}</label>
                          <Slider
                            value={[highlightOpacity]}
                            onValueChange={(v) => setHighlightOpacity(v[0])}
                            min={0.1}
                            max={1}
                            step={0.1}
                          />
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="page" className="space-y-2">
                      <Button onClick={rotatePage} variant="outline" className="w-full">
                        <RotateCw className="mr-2 w-4 h-4" />
                        Rotate
                      </Button>
                      <Button onClick={duplicatePage} variant="outline" className="w-full">
                        <Copy className="mr-2 w-4 h-4" />
                        Duplicate
                      </Button>
                      <Button onClick={deletePage} variant="destructive" className="w-full">
                        <Trash2 className="mr-2 w-4 h-4" />
                        Delete
                      </Button>
                      <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                        <Upload className="mr-2 w-4 h-4" />
                        Add PDF
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="application/pdf"
                        multiple
                      />
                    </TabsContent>
                  </Tabs>

                  <div className="mt-4 pt-4 border-t space-y-2">
                    <Button onClick={saveDraft} variant="outline" className="w-full">
                      <Save className="mr-2 w-4 h-4" />
                      Save Draft
                    </Button>
                    <Button onClick={exportPDF} className="w-full">
                      <Download className="mr-2 w-4 h-4" />
                      Export PDF
                    </Button>
                    <Button onClick={printPDF} variant="outline" className="w-full">
                      <Printer className="mr-2 w-4 h-4" />
                      Print
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Viewer */}
              <div className="lg:col-span-3">
                <Card className="p-4 mb-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Button onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))} disabled={currentPageIndex === 0} size="sm">
                        Prev
                      </Button>
                      <span className="text-sm">
                        Page {currentPageIndex + 1} / {pdfPages.length}
                      </span>
                      <Button
                        onClick={() => setCurrentPageIndex(Math.min(pdfPages.length - 1, currentPageIndex + 1))}
                        disabled={currentPageIndex === pdfPages.length - 1}
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} size="sm" variant="outline">
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <span className="text-sm">{Math.round(zoom * 100)}%</span>
                      <Button onClick={() => setZoom(Math.min(2.0, zoom + 0.1))} size="sm" variant="outline">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                <div className="bg-muted p-8 rounded-lg overflow-auto max-h-[800px] relative">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    className="mx-auto bg-white shadow-lg cursor-crosshair"
                  />
                  
                  {editingText && (
                    <div
                      style={{
                        position: "absolute",
                        left: `${editingText.x * zoom + 32}px`,
                        top: `${editingText.y * zoom + 32}px`,
                        zIndex: 1000,
                      }}
                    >
                      <Input
                        autoFocus
                        value={editingText.text}
                        onChange={(e) => setEditingText({ ...editingText, text: e.target.value })}
                        onBlur={finishEditingText}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") finishEditingText();
                          if (e.key === "Escape") setEditingText(null);
                        }}
                        placeholder="Type text..."
                        className="min-w-[200px]"
                        style={{ color, fontSize: `${penSize * 3}px` }}
                      />
                    </div>
                  )}
                </div>

                {files.length > 1 && (
                  <Card className="p-4 mt-4">
                    <h3 className="font-bold mb-4">All Pages ({pdfPages.length} pages from {files.length} files)</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                      {pdfPages.map((page, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPageIndex(idx)}
                          className={`p-2 border rounded-lg hover:border-primary transition-colors ${
                            idx === currentPageIndex ? "border-primary bg-primary/10" : "border-border"
                          }`}
                        >
                          <div className="text-xs text-center mb-1">Page {idx + 1}</div>
                          <div className="aspect-[8.5/11] bg-muted rounded flex items-center justify-center">
                            <FileText className="w-6 h-6 text-muted-foreground" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
