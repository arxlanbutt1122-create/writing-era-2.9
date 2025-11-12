import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Copy, RefreshCw } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

export default function PromptGenerator() {
  const [topic, setTopic] = useState("");
  const [aiModel, setAiModel] = useState("chatgpt");
  const [tone, setTone] = useState("professional");
  const [purpose, setPurpose] = useState("content");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const generatePrompt = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    const prompts = {
      content: `Create comprehensive ${tone} content about "${topic}". Include key points, examples, and actionable insights.`,
      analysis: `Provide a detailed ${tone} analysis of "${topic}". Examine multiple perspectives and draw evidence-based conclusions.`,
      creative: `Generate creative and ${tone} content related to "${topic}". Be imaginative while maintaining relevance.`,
      technical: `Explain "${topic}" in a ${tone} manner. Include technical details, best practices, and practical examples.`,
    };

    const basePrompt = prompts[purpose as keyof typeof prompts];
    const enhancedPrompt = `${basePrompt}\n\nPlease structure your response with:\n1. Introduction\n2. Main Content\n3. Key Takeaways\n4. Conclusion`;

    setGeneratedPrompt(enhancedPrompt);
    toast.success("Prompt generated successfully");
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copied to clipboard");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - AI Prompt Generator | WritingEra</title>
        <meta name="description" content="Generate optimized AI prompts for ChatGPT, Claude, and other AI models." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - AI Prompt Generator</h1>
            <p className="text-muted-foreground text-center mb-12">Create optimized prompts for any AI model</p>

            <Card className="p-8 mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Topic or Subject</label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Digital Marketing Strategies"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">AI Model</label>
                    <Select value={aiModel} onValueChange={setAiModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatgpt">ChatGPT</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tone</label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Purpose</label>
                    <Select value={purpose} onValueChange={setPurpose}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="content">Content Creation</SelectItem>
                        <SelectItem value="analysis">Analysis</SelectItem>
                        <SelectItem value="creative">Creative Writing</SelectItem>
                        <SelectItem value="technical">Technical Explanation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={generatePrompt} className="w-full" size="lg">
                  <Sparkles className="mr-2" />
                  Generate Prompt
                </Button>
              </div>
            </Card>

            {generatedPrompt && (
              <Card className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Generated Prompt</h3>
                  <div className="flex gap-2">
                    <Button onClick={generatePrompt} variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button onClick={copyPrompt} variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  rows={10}
                  className="resize-none font-mono text-sm"
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
