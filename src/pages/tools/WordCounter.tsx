import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "will", "with"
]);

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, "").length;
    const sentenceCount = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim() !== "").length;
    const paragraphCount = text.trim() === "" ? 0 : text.split(/\n\n+/).filter(p => p.trim() !== "").length;
    const readingTime = Math.ceil(wordCount / 200);

    // Calculate average word length
    const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
    const avgWordLength = words.length > 0 
      ? (words.reduce((sum, word) => sum + word.replace(/[^\w]/g, "").length, 0) / words.length).toFixed(1)
      : "0.0";

    // Find longest word
    const longestWord = words.reduce((longest, word) => {
      const cleaned = word.replace(/[^\w]/g, "");
      return cleaned.length > longest.length ? cleaned : longest;
    }, "");

    // Calculate most common words (excluding stopwords)
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      const cleaned = word.toLowerCase().replace(/[^\w]/g, "");
      if (cleaned && !stopWords.has(cleaned)) {
        wordFreq[cleaned] = (wordFreq[cleaned] || 0) + 1;
      }
    });
    const mostCommon = Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      wordCount,
      charCount,
      charCountNoSpaces,
      sentenceCount,
      paragraphCount,
      readingTime,
      avgWordLength,
      longestWord,
      mostCommon
    };
  }, [text]);

  const exportStats = (format: "txt" | "json") => {
    if (!text.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    let content: string;
    let filename: string;

    if (format === "json") {
      const data = {
        text,
        statistics: stats,
        timestamp: new Date().toISOString()
      };
      content = JSON.stringify(data, null, 2);
      filename = "word-counter-stats.json";
    } else {
      content = `Word Counter Statistics
========================
Generated: ${new Date().toLocaleString()}

Basic Stats:
- Words: ${stats.wordCount}
- Characters: ${stats.charCount}
- Characters (no spaces): ${stats.charCountNoSpaces}
- Sentences: ${stats.sentenceCount}
- Paragraphs: ${stats.paragraphCount}
- Reading Time: ${stats.readingTime} min

Advanced Stats:
- Average Word Length: ${stats.avgWordLength} characters
- Longest Word: ${stats.longestWord} (${stats.longestWord.length} characters)

Most Common Words:
${stats.mostCommon.map(([word, count], i) => `${i + 1}. ${word}: ${count} times`).join("\n")}
`;
      filename = "word-counter-stats.txt";
    }

    const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Stats exported as ${format.toUpperCase()}`);
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Word Counter | WritingEra</title>
        <meta name="description" content="Count words, characters, sentences, and paragraphs in real-time with our professional word counter tool." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    Sir Arslan Asif - Word Counter
                  </CardTitle>
                  <CardDescription>
                    Count words, characters, sentences, and paragraphs in real-time
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start typing or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[300px] mb-6 text-base focus-visible:ring-primary/50"
              />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                <div className="bg-card border border-border p-4 rounded-lg text-center hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.wordCount}</p>
                  <p className="text-xs text-muted-foreground font-medium">Words</p>
                </div>
                <div className="bg-card border border-border p-4 rounded-lg text-center hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.charCount}</p>
                  <p className="text-xs text-muted-foreground font-medium">Characters</p>
                </div>
                <div className="bg-card border border-border p-4 rounded-lg text-center hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.charCountNoSpaces}</p>
                  <p className="text-xs text-muted-foreground font-medium">No Spaces</p>
                </div>
                <div className="bg-card border border-border p-4 rounded-lg text-center hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.sentenceCount}</p>
                  <p className="text-xs text-muted-foreground font-medium">Sentences</p>
                </div>
                <div className="bg-card border border-border p-4 rounded-lg text-center hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.paragraphCount}</p>
                  <p className="text-xs text-muted-foreground font-medium">Paragraphs</p>
                </div>
                <div className="bg-card border border-border p-4 rounded-lg text-center hover:border-primary/50 transition-colors">
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.readingTime}</p>
                  <p className="text-xs text-muted-foreground font-medium">Min Read</p>
                </div>
              </div>

              {/* Advanced Stats */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Advanced Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Word Length</span>
                      <span className="font-semibold">{stats.avgWordLength} chars</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Longest Word</span>
                      <span className="font-semibold truncate max-w-[150px]" title={stats.longestWord}>
                        {stats.longestWord || "—"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Most Common Words</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats.mostCommon.length > 0 ? (
                      <ul className="space-y-1">
                        {stats.mostCommon.map(([word, count], i) => (
                          <li key={word} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {i + 1}. {word}
                            </span>
                            <span className="font-semibold">{count}×</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No words yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setText("")}
                  disabled={text.length === 0}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  Clear Text
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => exportStats("txt")}
                  disabled={text.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export as TXT
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => exportStats("json")}
                  disabled={text.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export as JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}