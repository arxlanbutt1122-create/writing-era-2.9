import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, ArrowLeftRight, Copy } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Translator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");

  const languages = [
    { code: "en", name: "English" },
    { code: "ur", name: "Urdu" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" },
    { code: "pa", name: "Punjabi" },
  ];

  const translate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLang === targetLang) {
      toast.error("Source and target languages must be different");
      return;
    }

    try {
      toast.info("Translating...");
      
      const { data, error } = await supabase.functions.invoke('translate', {
        body: { 
          text: inputText,
          sourceLang,
          targetLang
        }
      });

      if (error) {
        throw error;
      }
      
      if (data.translatedText) {
        setOutputText(data.translatedText);
        toast.success("Translation complete");
      } else if (data.error) {
        toast.error(`Translation failed: ${data.error}`);
        setOutputText(`Error: ${data.error}`);
      } else {
        toast.error("Translation failed. Please try again.");
        setOutputText("Translation failed. Please try a different text or language pair.");
      }
    } catch (error: any) {
      console.error("Translation error:", error);
      toast.error("Translation service unavailable");
      setOutputText(`Error: ${error.message || 'Unable to connect to translation service'}. Please check your internet connection.`);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyTranslation = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Translation copied to clipboard");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Translator | WritingEra</title>
        <meta name="description" content="Translate text between multiple languages instantly with our translation tool." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Multi-Language Translator</h1>
            <p className="text-muted-foreground text-center mb-12">Translate text between multiple languages</p>

            <Card className="p-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Select value={sourceLang} onValueChange={setSourceLang}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button onClick={swapLanguages} variant="outline" size="icon">
                  <ArrowLeftRight className="w-5 h-5" />
                </Button>

                <Select value={targetLang} onValueChange={setTargetLang}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Source Text</label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text to translate..."
                    rows={12}
                    className="resize-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Translation</label>
                    {outputText && (
                      <Button onClick={copyTranslation} variant="ghost" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Translation will appear here..."
                    rows={12}
                    className="resize-none bg-muted"
                  />
                </div>
              </div>

              <Button onClick={translate} className="w-full mt-6" size="lg">
                <Languages className="mr-2" />
                Translate
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
