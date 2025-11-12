import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Code, Play, Copy, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function CPPCompiler() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`);
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);

  const runCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to compile");
      return;
    }

    setIsCompiling(true);
    setOutput("Compiling and executing...");

    try {
      const { data, error } = await supabase.functions.invoke('compile-cpp', {
        body: { code }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        setOutput(`Error: ${data.error}`);
        toast.error("Compilation failed");
      } else if (data.output) {
        setOutput(data.output);
        toast.success("Code executed successfully");
      } else {
        setOutput("No output generated");
        toast.info("Compilation completed with no output");
      }
    } catch (error: any) {
      const errorMsg = error.message || "Failed to connect to compilation service";
      setOutput(`Error: ${errorMsg}\n\nPlease check your internet connection and try again.`);
      toast.error("Failed to execute code");
      console.error("Compilation Error:", error);
    } finally {
      setIsCompiling(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard");
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - C++ Compiler | WritingEra</title>
        <meta name="description" content="Write and test C++ code online with our C++ compiler tool." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - C++ Online Compiler</h1>
            <p className="text-muted-foreground text-center mb-8">Write, compile, and run C++ code online with real-time execution</p>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Code Editor
                    </CardTitle>
                    <Button onClick={copyCode} variant="ghost" size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <CardDescription>Write your C++ code here</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm min-h-[400px] resize-none"
                    placeholder="Write your C++ code here..."
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={runCode} className="flex-1" disabled={isCompiling}>
                      {isCompiling ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Compiling...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 w-4 h-4" />
                          Run Code
                        </>
                      )}
                    </Button>
                    <Button onClick={clearCode} variant="outline" disabled={isCompiling}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Output</CardTitle>
                    {output && (
                      <Button onClick={copyOutput} variant="ghost" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    )}
                  </div>
                  <CardDescription>Compilation and execution results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg min-h-[400px] font-mono text-sm whitespace-pre-wrap">
                    {output || "Output will appear here..."}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Write and edit C++ code with syntax preservation</li>
                  <li>Real-time code compilation using JDoodle API</li>
                  <li>View compilation errors and runtime output</li>
                  <li>Copy code and output with one click</li>
                  <li>Support for C++17 standard</li>
                  <li>Instant execution without installing any compiler</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}