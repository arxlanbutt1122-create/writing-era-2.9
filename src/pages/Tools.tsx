import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Globe, Brain, BookOpen, Code, Calculator, MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet";
import heroImage from "@/assets/tools-hero-professional.jpg";

const Tools = () => {
  const tools = [
    { title: "Word Counter", description: "Count words, characters, sentences", icon: FileText, link: "/tools/word-counter", color: "text-blue-600" },
    { title: "Smart Reference Formatter Pro", description: "Format multiple references in APA, Harvard, MLA, Chicago, IEEE, Oxford", icon: BookOpen, link: "/tools/smart-reference-formatter", color: "text-purple-600" },
    { title: "File Compressor & Converter", description: "Compress and convert images", icon: FileText, link: "/tools/file-compressor", color: "text-blue-600" },
    { title: "Reference Formatter", description: "APA, MLA, Chicago citations", icon: BookOpen, link: "/tools/reference-formatter", color: "text-green-600" },
    { title: "Survey Builder", description: "Create surveys easily", icon: FileText, link: "/tools/survey-builder", color: "text-purple-600" },
    { title: "CGPA Calculator", description: "Calculate GPA", icon: FileText, link: "/tools/cgpa-calculator", color: "text-orange-600" },
    { title: "Text Summarizer", description: "Summarize texts", icon: FileText, link: "/tools/text-summarizer", color: "text-indigo-600" },
    { title: "AI Prompt Generator", description: "Create AI prompts", icon: Brain, link: "/tools/prompt-generator", color: "text-pink-600" },
    { title: "Math Game", description: "Test math skills", icon: FileText, link: "/tools/math-game", color: "text-yellow-600" },
    { title: "PDF Editor", description: "Edit PDFs", icon: FileText, link: "/tools/pdf-editor", color: "text-red-600" },
    { title: "Smart Calculator", description: "Advanced calculator", icon: FileText, link: "/tools/smart-calculator", color: "text-teal-600" },
    { title: "C++ Reference", description: "C++ guide", icon: BookOpen, link: "/tools/cpp-reference", color: "text-cyan-600" },
    { title: "Citation Generator", description: "Generate citations", icon: FileText, link: "/tools/citation-generator", color: "text-lime-600" },
    { title: "Resume Builder", description: "Build resumes", icon: FileText, link: "/tools/resume-builder", color: "text-amber-600" },
    { title: "Translator", description: "Multi-language translator", icon: Globe, link: "/tools/translator", color: "text-violet-600" },
    { title: "Word Formatter", description: "Format documents", icon: FileText, link: "/tools/word-formatter", color: "text-rose-600" },
    { title: "C++ Compiler", description: "Write and compile C++", icon: Code, link: "/tools/cpp-compiler", color: "text-slate-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sir Arslan Asif - Professional Writing Tools | WritingEra</title>
        <meta name="description" content="Free writing tools including word counter, smart reference formatter, grammar checker resources, citation generators, and plagiarism information." />
      </Helmet>
      
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
            Professional Writing Tools
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Powerful tools and resources to enhance your writing productivity
          </p>
        </div>
      </section>
      
      <main className="py-16 md:py-24">

        {/* Tools Grid */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="font-heading font-bold text-3xl mb-8 text-center">
            All Tools
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className={`h-12 w-12 ${tool.color} mb-3`} />
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = tool.link}
                    >
                      Use Tool
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white max-w-4xl mx-auto">
            <CardContent className="py-12 text-center">
              <h2 className="font-heading font-bold text-3xl mb-4">
                Need Professional Writing Help?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our expert writers are ready to help with any academic or professional writing project
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="secondary" size="lg" onClick={() => window.location.href = "/services"}>
                  Explore Our Services
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => window.location.href = "/contact"}
                >
                  Get a Free Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tools;

