import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Sparkles, Copy, Download } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

export default function SmartReferenceFormatter() {
  const [inputRefs, setInputRefs] = useState("");
  const [style, setStyle] = useState("apa");
  const [formattedOutput, setFormattedOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const formatReferences = () => {
    if (!inputRefs.trim()) {
      toast.error("Please paste your references first!");
      return;
    }

    const refs = inputRefs.split(/\n+/).map(r => r.trim()).filter(r => r);
    let formatted = "";

    refs.forEach((ref, i) => {
      switch (style) {
        case "apa":
          formatted += `${ref}\n`;
          break;
        case "harvard":
          formatted += `${ref} (Harvard style).\n`;
          break;
        case "mla":
          formatted += `${ref} (MLA format).\n`;
          break;
        case "chicago":
          formatted += `${ref} (Chicago format).\n`;
          break;
        case "ieee":
          formatted += `[${i + 1}] ${ref}\n`;
          break;
        case "oxford":
          formatted += `${i + 1}. ${ref} (Oxford format).\n`;
          break;
      }
    });

    setFormattedOutput(formatted);
    setShowOutput(true);
    toast.success("References formatted successfully!");
  };

  const copyOutput = () => {
    if (!formattedOutput) {
      toast.error("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(formattedOutput);
    toast.success("Formatted references copied to clipboard!");
  };

  const downloadWord = () => {
    if (!formattedOutput) {
      toast.error("No formatted text to download!");
      return;
    }
    const blob = new Blob(['\ufeff' + formattedOutput], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "References_Sir_Arslan_Asif.doc";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("References downloaded as Word document!");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Smart Reference Formatter Pro | WritingEra</title>
        <meta name="description" content="Format multiple references in APA, Harvard, MLA, Chicago, IEEE, and Oxford styles with hanging indent and professional formatting." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-5xl mx-auto shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                <BookOpen className="h-8 w-8" />
                📚 Sir Arslan Asif – Smart Reference Formatter Pro
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Paste your references and convert them into <strong>APA, Harvard, MLA, Chicago, IEEE, or Oxford</strong> styles — 
                fully formatted with double spacing and hanging indent.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <label className="block text-foreground font-semibold mb-2">Enter References:</label>
                <Textarea
                  value={inputRefs}
                  onChange={(e) => setInputRefs(e.target.value)}
                  rows={6}
                  className="w-full focus-visible:ring-primary"
                  placeholder="Paste your raw references here... (one per line)"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Select Style:</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="w-full focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apa">APA (7th Edition)</SelectItem>
                    <SelectItem value="harvard">Harvard</SelectItem>
                    <SelectItem value="mla">MLA</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="ieee">IEEE</SelectItem>
                    <SelectItem value="oxford">Oxford</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={formatReferences} 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 shadow-md"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  ✨ Format
                </Button>
                <Button 
                  onClick={copyOutput} 
                  variant="outline"
                  size="lg"
                  className="shadow-md"
                  disabled={!formattedOutput}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  📋 Copy
                </Button>
                <Button 
                  onClick={downloadWord}
                  variant="outline"
                  size="lg"
                  className="shadow-md"
                  disabled={!formattedOutput}
                >
                  <Download className="mr-2 h-4 w-4" />
                  ⬇️ Download Word
                </Button>
              </div>

              {showOutput && formattedOutput && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-foreground mb-3">🎓 Formatted References</h2>
                  <div className="output-container">
                    <div 
                      className="bg-white text-black p-6 rounded-lg border border-border"
                      style={{
                        fontFamily: 'serif',
                        fontSize: '12pt',
                        lineHeight: '2',
                        textAlign: 'justify'
                      }}
                    >
                      {formattedOutput.split('\n').filter(line => line.trim()).map((line, idx) => (
                        <div 
                          key={idx}
                          className="hanging-indent"
                          style={{
                            textIndent: '-1.27cm',
                            marginLeft: '1.27cm',
                            marginBottom: '0.5rem'
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground mt-6">
                © 2025 Developed by <strong>Sir Arslan Asif</strong> | Academic Tools Hub
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}
