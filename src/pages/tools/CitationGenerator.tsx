import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, BookMarked } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

export default function CitationGenerator() {
  const [style, setStyle] = useState("APA");
  const [sourceType, setSourceType] = useState("book");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [citation, setCitation] = useState("");

  const generateCitation = () => {
    if (!author || !title || !year) {
      toast.error("Please fill in all required fields");
      return;
    }

    let result = "";
    if (style === "APA") {
      result = `${author} (${year}). ${title}. ${publisher}.`;
    } else if (style === "MLA") {
      result = `${author}. ${title}. ${publisher}, ${year}.`;
    } else if (style === "Chicago") {
      result = `${author}. ${title}. ${publisher}, ${year}.`;
    } else if (style === "Harvard") {
      result = `${author} ${year}, ${title}, ${publisher}.`;
    }

    setCitation(result);
    toast.success("Citation generated!");
  };

  const copyCitation = () => {
    navigator.clipboard.writeText(citation);
    toast.success("Citation copied to clipboard");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Citation Generator | WritingEra</title>
        <meta name="description" content="Generate accurate citations in APA, MLA, Chicago, and Harvard styles." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Citation Generator</h1>
            <p className="text-muted-foreground text-center mb-12">Create accurate citations in multiple formats</p>

            <Card className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Citation Style</label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APA">APA 7th</SelectItem>
                        <SelectItem value="MLA">MLA 9th</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="Harvard">Harvard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Source Type</label>
                    <Select value={sourceType} onValueChange={setSourceType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="journal">Journal</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="magazine">Magazine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Author(s) *</label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Smith, J."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title of work"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Year *</label>
                    <Input
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Publisher</label>
                    <Input
                      value={publisher}
                      onChange={(e) => setPublisher(e.target.value)}
                      placeholder="Publisher name"
                    />
                  </div>
                </div>

                <Button onClick={generateCitation} className="w-full" size="lg">
                  <BookMarked className="mr-2" />
                  Generate Citation
                </Button>

                {citation && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium">{style} Citation:</p>
                      <Button onClick={copyCitation} variant="ghost" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm">{citation}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
