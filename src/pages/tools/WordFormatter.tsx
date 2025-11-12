import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileType, Download, Copy } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

export default function WordFormatter() {
  const [inputText, setInputText] = useState("");
  const [fontSize, setFontSize] = useState("12");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [alignment, setAlignment] = useState("left");
  const [lineSpacing, setLineSpacing] = useState("1.5");

  const formatText = () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to format");
      return;
    }
    toast.success("Text formatting applied");
  };

  const copyFormatted = () => {
    navigator.clipboard.writeText(inputText);
    toast.success("Formatted text copied to clipboard");
  };

  const downloadDocument = () => {
    const blob = new Blob([inputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-document.txt";
    a.click();
    toast.success("Document downloaded");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Word Formatter | WritingEra</title>
        <meta name="description" content="Format your documents with professional styling and export options." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Word Document Formatter</h1>
            <p className="text-muted-foreground text-center mb-12">Professional document formatting and styling</p>

            <Card className="p-8">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Font Family</label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Calibri">Calibri</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Font Size</label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10pt</SelectItem>
                      <SelectItem value="12">12pt</SelectItem>
                      <SelectItem value="14">14pt</SelectItem>
                      <SelectItem value="16">16pt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Alignment</label>
                  <Select value={alignment} onValueChange={setAlignment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="justify">Justify</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Line Spacing</label>
                  <Select value={lineSpacing} onValueChange={setLineSpacing}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">Single</SelectItem>
                      <SelectItem value="1.5">1.5 lines</SelectItem>
                      <SelectItem value="2.0">Double</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Document Content</label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter or paste your document content here..."
                  rows={15}
                  className="resize-none"
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    textAlign: alignment as any,
                    lineHeight: lineSpacing,
                  }}
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={formatText} variant="outline" className="flex-1">
                  <FileType className="mr-2" />
                  Apply Formatting
                </Button>
                <Button onClick={copyFormatted} variant="outline" className="flex-1">
                  <Copy className="mr-2" />
                  Copy Text
                </Button>
                <Button onClick={downloadDocument} className="flex-1">
                  <Download className="mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
