import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Copy, Download } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "in", "is", "it",
  "its", "of", "on", "that", "the", "to", "was", "will", "with", "I", "you", "your", "this", "but",
  "they", "their", "what", "which", "who", "can", "do", "if", "or", "than", "then", "when", "where",
  "should", "would", "could", "have", "had", "been", "were", "so", "not", "we", "us", "them"
]);

export default function TextSummarizer() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryMode, setSummaryMode] = useState<"one-line" | "bullets">("bullets");
  const [lengthBias, setLengthBias] = useState<"short" | "balanced" | "long">("balanced");
  const [showScores, setShowScores] = useState(false);
  const [sentenceScores, setSentenceScores] = useState<Array<{ sentence: string; score: number }>>([]);

  // Load draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("text-summarizer-draft");
    if (saved) {
      const data = JSON.parse(saved);
      setInputText(data.text || "");
    }
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    if (inputText) {
      localStorage.setItem("text-summarizer-draft", JSON.stringify({ text: inputText }));
    }
  }, [inputText]);

  const tokenizeSentences = (text: string): string[] => {
    return text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 10);
  };

  const buildWordFrequency = (text: string): Record<string, number> => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freq: Record<string, number> = {};
    
    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 2) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });

    const maxFreq = Math.max(...Object.values(freq));
    Object.keys(freq).forEach(word => {
      freq[word] = freq[word] / maxFreq;
    });

    return freq;
  };

  const scoreSentences = (sentences: string[], wordFreq: Record<string, number>): Array<{ sentence: string; score: number }> => {
    return sentences.map((sentence, index) => {
      const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      let score = 0;

      words.forEach(word => {
        if (wordFreq[word]) {
          score += wordFreq[word];
        }
      });

      if (index === 0) score *= 1.5;
      if (index === sentences.length - 1) score *= 1.2;

      const wordCount = words.length;
      if (wordCount < 5) score *= 0.5;
      if (wordCount > 30) score *= 0.8;

      return { sentence, score: score / words.length };
    });
  };

  const summarizeText = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to summarize");
      return;
    }

    const sentences = tokenizeSentences(inputText);
    if (sentences.length === 0) {
      toast.error("Text is too short to summarize");
      return;
    }

    const wordFreq = buildWordFrequency(inputText);
    const scored = scoreSentences(sentences, wordFreq);
    setSentenceScores(scored.sort((a, b) => b.score - a.score));

    let numSentences = 3;
    if (lengthBias === "short") numSentences = Math.min(2, sentences.length);
    else if (lengthBias === "long") numSentences = Math.min(5, sentences.length);
    else numSentences = Math.min(3, sentences.length);

    const topSentences = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, numSentences)
      .sort((a, b) => inputText.indexOf(a.sentence) - inputText.indexOf(b.sentence));

    if (summaryMode === "one-line") {
      const keywords = Object.entries(wordFreq)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
        .map(([word]) => word);
      
      const oneLine = topSentences[0]?.sentence || keywords.join(", ");
      setSummary(oneLine);
    } else {
      const bullets = topSentences.map(s => `• ${s.sentence}`).join("\n");
      setSummary(bullets);
    }

    toast.success("Text summarized successfully");
  };

  const copyToClipboard = () => {
    if (!summary) {
      toast.error("No summary to copy");
      return;
    }
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard");
  };

  const downloadSummary = () => {
    if (!summary) {
      toast.error("No summary to download");
      return;
    }

    const content = `Original Text (${stats.words} words):\n${inputText}\n\n---\n\nSummary (${summaryMode}):\n${summary}\n\nGenerated: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Summary downloaded");
  };

  const clearAll = () => {
    setInputText("");
    setSummary("");
    setSentenceScores([]);
    localStorage.removeItem("text-summarizer-draft");
    toast.info("Cleared");
  };

  const stats = {
    words: inputText.trim().split(/\s+/).filter(w => w.length > 0).length,
    sentences: tokenizeSentences(inputText).length,
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Text Summarizer | WritingEra</title>
        <meta name="description" content="Summarize long texts quickly with our extractive text summarizer tool. Get key points in seconds." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Text Summarizer</h1>
            <p className="text-muted-foreground text-center mb-12">Condense long texts into concise summaries using extractive summarization</p>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Input Text</h2>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here..."
                  rows={15}
                  className="resize-none mb-4"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-2xl font-bold">{stats.words}</p>
                    <p className="text-sm text-muted-foreground">Words</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-2xl font-bold">{stats.sentences}</p>
                    <p className="text-sm text-muted-foreground">Sentences</p>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Summary Mode</label>
                    <Select value={summaryMode} onValueChange={(v: any) => setSummaryMode(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bullets">Bullet Points (2-5 points)</SelectItem>
                        <SelectItem value="one-line">One-Line Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Length Bias</label>
                    <Select value={lengthBias} onValueChange={(v: any) => setLengthBias(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (2 sentences)</SelectItem>
                        <SelectItem value="balanced">Balanced (3 sentences)</SelectItem>
                        <SelectItem value="long">Long (5 sentences)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={summarizeText} disabled={!inputText.trim()}>
                    <FileText className="mr-2 w-4 h-4" />
                    Summarize Text
                  </Button>
                  <Button variant="outline" onClick={clearAll} disabled={!inputText && !summary}>
                    Clear All
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">Summary</h2>
                  {summary && (
                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button onClick={downloadSummary} variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {summary ? (
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 min-h-[300px]">
                    <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
                  </div>
                ) : (
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 min-h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">Your summary will appear here</p>
                  </div>
                )}

                {sentenceScores.length > 0 && (
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowScores(!showScores)}
                      className="mb-2"
                    >
                      {showScores ? "Hide" : "Show"} Sentence Scores
                    </Button>

                    {showScores && (
                      <div className="bg-muted/30 p-3 rounded-lg max-h-[300px] overflow-y-auto">
                        <p className="text-xs font-medium mb-2 text-muted-foreground">
                          Top-scoring sentences (for transparency)
                        </p>
                        {sentenceScores.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="mb-2 pb-2 border-b border-border last:border-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium">#{idx + 1}</span>
                              <span className="text-xs text-muted-foreground">
                                Score: {item.score.toFixed(3)}
                              </span>
                            </div>
                            <p className="text-sm">{item.sentence}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
