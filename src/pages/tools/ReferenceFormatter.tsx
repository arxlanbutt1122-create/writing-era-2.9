import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, BookOpen } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

export default function ReferenceFormatter() {
  const [citationStyle, setCitationStyle] = useState<string>("apa");
  const [sourceType, setSourceType] = useState<string>("book");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [formattedReference, setFormattedReference] = useState("");

  const generateReference = () => {
    if (!author || !title || !year) {
      toast.error("Please fill in all required fields");
      return;
    }

    let reference = "";
    if (citationStyle === "apa") {
      reference = `${author} (${year}). ${title}. ${publisher}.`;
    } else if (citationStyle === "mla") {
      reference = `${author}. ${title}. ${publisher}, ${year}.`;
    } else if (citationStyle === "chicago") {
      reference = `${author}. ${title}. ${publisher}, ${year}.`;
    } else if (citationStyle === "harvard") {
      reference = `${author} ${year}, ${title}, ${publisher}.`;
    }

    setFormattedReference(reference);
    toast.success("Reference generated successfully");
  };

  const copyReference = () => {
    navigator.clipboard.writeText(formattedReference);
    toast.success("Reference copied to clipboard");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Reference Formatter | WritingEra</title>
        <meta name="description" content="Format your references and bibliographies in APA, MLA, Chicago, and Harvard styles." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Reference & Bibliography Formatter</h1>
            <p className="text-muted-foreground text-center mb-12">Generate perfectly formatted references in multiple citation styles</p>

            <Card className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Citation Style</label>
                    <Select value={citationStyle} onValueChange={setCitationStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apa">APA 7th Edition</SelectItem>
                        <SelectItem value="mla">MLA 9th Edition</SelectItem>
                        <SelectItem value="chicago">Chicago 17th Edition</SelectItem>
                        <SelectItem value="harvard">Harvard</SelectItem>
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
                        <SelectItem value="journal">Journal Article</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="newspaper">Newspaper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Author(s) *</label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Last name, First name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Year *</label>
                    <Input
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024"
                      type="number"
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

                <Button onClick={generateReference} className="w-full" size="lg">
                  <BookOpen className="mr-2" />
                  Generate Reference
                </Button>

                {formattedReference && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium">Formatted Reference:</p>
                      <Button onClick={copyReference} variant="ghost" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm">{formattedReference}</p>
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
