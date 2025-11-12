import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Delete, Download, Copy, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import * as math from "mathjs";

interface HistoryEntry {
  id: number;
  expression: string;
  result: string;
}

export default function SmartCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [lastAnswer, setLastAnswer] = useState("0");
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");
  const [precision, setPrecision] = useState(4);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [multilineInput, setMultilineInput] = useState("");
  
  // Matrix state
  const [matrixRows, setMatrixRows] = useState(3);
  const [matrixCols, setMatrixCols] = useState(3);
  const [matrixA, setMatrixA] = useState<string[][]>(Array(3).fill(null).map(() => Array(3).fill("0")));
  const [matrixB, setMatrixB] = useState<string[][]>(Array(3).fill(null).map(() => Array(3).fill("0")));
  const [matrixResult, setMatrixResult] = useState("");

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when not typing in inputs
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") {
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        handleNumber(e.key);
        e.preventDefault();
      } else if (["+", "-", "*", "/", "(", ")", "."].includes(e.key)) {
        handleNumber(e.key);
        e.preventDefault();
      } else if (e.key === "Enter") {
        calculate();
        e.preventDefault();
      } else if (e.key === "Backspace") {
        setDisplay(display === "0" || display.length === 1 ? "0" : display.slice(0, -1));
        e.preventDefault();
      } else if (e.key === "Escape") {
        clear();
        e.preventDefault();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display]);

  useEffect(() => {
    const saved = localStorage.getItem("calc-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("calc-history", JSON.stringify(history));
    }
  }, [history]);

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setExpression(display + " " + op + " ");
    setDisplay("0");
  };

  const handleFunction = (func: string) => {
    let value = parseFloat(display);
    
    try {
      let result: any;
      
      if (angleMode === "deg" && ["sin", "cos", "tan"].includes(func)) {
        value = (value * Math.PI) / 180;
      }

      switch (func) {
        case "sin":
          result = Math.sin(value);
          break;
        case "cos":
          result = Math.cos(value);
          break;
        case "tan":
          result = Math.tan(value);
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        case "log":
          result = Math.log10(value);
          break;
        case "ln":
          result = Math.log(value);
          break;
        case "abs":
          result = Math.abs(value);
          break;
        case "ceil":
          result = Math.ceil(value);
          break;
        case "floor":
          result = Math.floor(value);
          break;
        case "factorial":
          result = math.factorial(value);
          break;
        default:
          result = value;
      }

      const formatted = Number(result.toFixed(precision));
      setDisplay(String(formatted));
      addToHistory(func + "(" + value + ")", String(formatted));
    } catch (error) {
      setDisplay("Error");
      toast.error("Calculation error");
    }
  };

  const handleSpecial = (special: string) => {
    switch (special) {
      case "pi":
        setDisplay(Math.PI.toFixed(precision));
        break;
      case "e":
        setDisplay(Math.E.toFixed(precision));
        break;
      case "ans":
        setDisplay(lastAnswer);
        break;
    }
  };

  const calculate = () => {
    try {
      const fullExpression = expression + display;
      const result = math.evaluate(fullExpression);
      const formatted = typeof result === "number" ? Number(result.toFixed(precision)) : String(result);
      setDisplay(String(formatted));
      setLastAnswer(String(formatted));
      setExpression("");
      addToHistory(fullExpression, String(formatted));
    } catch (error) {
      setDisplay("Error");
      toast.error("Invalid expression");
    }
  };

  const evaluateMultiline = () => {
    try {
      const lines = multilineInput.split(";").filter(l => l.trim());
      let result: any = 0;
      
      for (const line of lines) {
        result = math.evaluate(line.trim());
      }
      
      const formatted = typeof result === "number" ? Number(result.toFixed(precision)) : String(result);
      setDisplay(String(formatted));
      setLastAnswer(String(formatted));
      addToHistory(multilineInput, String(formatted));
      toast.success("Evaluated successfully");
    } catch (error) {
      toast.error("Evaluation error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const addToHistory = (expr: string, result: string) => {
    setHistory([{ id: Date.now(), expression: expr, result }, ...history].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calc-history");
    toast.success("History cleared");
  };

  const copyResult = (result: string) => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const downloadResult = () => {
    const text = `Expression: ${expression}${display}\nResult: ${display}\nMode: ${angleMode}\nPrecision: ${precision}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "calculation.txt";
    a.click();
    toast.success("Downloaded");
  };

  const updateMatrixSize = (rows: number, cols: number) => {
    setMatrixRows(rows);
    setMatrixCols(cols);
    setMatrixA(Array(rows).fill(null).map(() => Array(cols).fill("0")));
    setMatrixB(Array(rows).fill(null).map(() => Array(cols).fill("0")));
  };

  const updateMatrixCell = (matrix: "A" | "B", row: number, col: number, value: string) => {
    if (matrix === "A") {
      const newMatrix = [...matrixA];
      newMatrix[row][col] = value;
      setMatrixA(newMatrix);
    } else {
      const newMatrix = [...matrixB];
      newMatrix[row][col] = value;
      setMatrixB(newMatrix);
    }
  };

  const performMatrixOperation = (operation: string) => {
    try {
      const a = math.matrix(matrixA.map(row => row.map(cell => parseFloat(cell) || 0)));
      const b = math.matrix(matrixB.map(row => row.map(cell => parseFloat(cell) || 0)));

      let result: any;

      switch (operation) {
        case "det":
          result = math.det(a);
          setMatrixResult(`Determinant: ${Number(result.toFixed(precision))}`);
          break;
        case "inv":
          result = math.inv(a);
          setMatrixResult(`Inverse:\n${math.format(result, { precision })}`);
          break;
        case "transpose":
          result = math.transpose(a);
          setMatrixResult(`Transpose:\n${math.format(result, { precision })}`);
          break;
        case "rank":
          const U = math.lup(a).U;
          const rankVal = (U as any).toArray().filter((row: number[]) => 
            row.some((val: number) => Math.abs(val) > 1e-10)
          ).length;
          setMatrixResult(`Rank: ${rankVal}`);
          break;
        case "add":
          result = math.add(a, b);
          setMatrixResult(`A + B:\n${math.format(result, { precision })}`);
          break;
        case "subtract":
          result = math.subtract(a, b);
          setMatrixResult(`A - B:\n${math.format(result, { precision })}`);
          break;
        case "multiply":
          result = math.multiply(a, b);
          setMatrixResult(`A × B:\n${math.format(result, { precision })}`);
          break;
        default:
          setMatrixResult("Unknown operation");
      }

      toast.success("Operation completed");
    } catch (error: any) {
      setMatrixResult(`Error: ${error.message}`);
      toast.error("Matrix operation failed");
    }
  };

  const buttonClass = "h-14 text-lg font-medium";

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Smart Calculator | WritingEra</title>
        <meta name="description" content="Advanced calculator with scientific functions, matrix operations, and complex number support." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - All-in-One Smart Calculator</h1>
          <p className="text-muted-foreground text-center mb-8">Advanced calculations made simple</p>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="scientific">Scientific</TabsTrigger>
                <TabsTrigger value="matrix">Matrix</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="p-6">
                      {/* Display */}
                      <div className="mb-6">
                        <div className="bg-muted p-4 rounded-lg text-right mb-2">
                          <p className="text-sm text-muted-foreground h-6">{expression}</p>
                          <p className="text-4xl font-bold break-all">{display}</p>
                        </div>
                        <div className="flex gap-2 mb-4">
                          <Select value={angleMode} onValueChange={(v) => setAngleMode(v as "deg" | "rad")}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="deg">Degrees</SelectItem>
                              <SelectItem value="rad">Radians</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={String(precision)} onValueChange={(v) => setPrecision(Number(v))}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[2, 3, 4, 6, 8, 10, 12, 16].map(p => (
                                <SelectItem key={p} value={String(p)}>{p} decimals</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button onClick={downloadResult} variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Keypad */}
                      <div className="grid grid-cols-4 gap-2">
                        <Button onClick={clear} variant="secondary" className={buttonClass}>AC</Button>
                        <Button onClick={toggleSign} variant="secondary" className={buttonClass}>+/-</Button>
                        <Button onClick={() => handleOperator("%")} variant="secondary" className={buttonClass}>%</Button>
                        <Button onClick={() => handleOperator("/")} variant="secondary" className={buttonClass}>÷</Button>

                        {[7, 8, 9].map(num => (
                          <Button key={num} onClick={() => handleNumber(String(num))} variant="outline" className={buttonClass}>
                            {num}
                          </Button>
                        ))}
                        <Button onClick={() => handleOperator("*")} variant="secondary" className={buttonClass}>×</Button>

                        {[4, 5, 6].map(num => (
                          <Button key={num} onClick={() => handleNumber(String(num))} variant="outline" className={buttonClass}>
                            {num}
                          </Button>
                        ))}
                        <Button onClick={() => handleOperator("-")} variant="secondary" className={buttonClass}>-</Button>

                        {[1, 2, 3].map(num => (
                          <Button key={num} onClick={() => handleNumber(String(num))} variant="outline" className={buttonClass}>
                            {num}
                          </Button>
                        ))}
                        <Button onClick={() => handleOperator("+")} variant="secondary" className={`${buttonClass} row-span-2`}>+</Button>

                        <Button onClick={() => handleNumber("0")} variant="outline" className={`${buttonClass} col-span-2`}>0</Button>
                        <Button onClick={() => handleNumber(".")} variant="outline" className={buttonClass}>.</Button>
                        <Button onClick={calculate} variant="default" className={buttonClass}>=</Button>
                      </div>
                    </Card>
                  </div>

                  {/* Special Functions */}
                  <div>
                    <Card className="p-4">
                      <h3 className="font-bold mb-4">Functions</h3>
                      <div className="space-y-2">
                        <Button onClick={() => handleFunction("sqrt")} variant="outline" className="w-full">√x</Button>
                        <Button onClick={() => handleOperator("^")} variant="outline" className="w-full">x^y</Button>
                        <Button onClick={() => handleFunction("factorial")} variant="outline" className="w-full">x!</Button>
                        <Button onClick={() => handleNumber("(")} variant="outline" className="w-full">(</Button>
                        <Button onClick={() => handleNumber(")")} variant="outline" className="w-full">)</Button>
                        <Button onClick={() => handleSpecial("pi")} variant="outline" className="w-full">π</Button>
                        <Button onClick={() => handleSpecial("e")} variant="outline" className="w-full">e</Button>
                        <Button onClick={() => handleNumber("i")} variant="outline" className="w-full">i</Button>
                        <Button onClick={() => handleSpecial("ans")} variant="outline" className="w-full">ANS</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scientific">
                <Card className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold mb-4">Trigonometry</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Button onClick={() => handleFunction("sin")} variant="outline">sin</Button>
                        <Button onClick={() => handleFunction("cos")} variant="outline">cos</Button>
                        <Button onClick={() => handleFunction("tan")} variant="outline">tan</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-4">Logarithms</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button onClick={() => handleFunction("log")} variant="outline">log</Button>
                        <Button onClick={() => handleFunction("ln")} variant="outline">ln</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-4">Rounding</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Button onClick={() => handleFunction("abs")} variant="outline">abs</Button>
                        <Button onClick={() => handleFunction("ceil")} variant="outline">ceil</Button>
                        <Button onClick={() => handleFunction("floor")} variant="outline">floor</Button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="font-bold mb-4">Complex Numbers</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Use "i" for imaginary unit. Examples: 3+4i, sqrt(-1), (2+3i)*(1-i)
                      </p>
                      <div className="space-y-2">
                        <Input
                          value={display}
                          onChange={(e) => setDisplay(e.target.value)}
                          placeholder="Enter complex expression..."
                          className="font-mono"
                        />
                        <Button onClick={calculate} className="w-full">Evaluate Complex Expression</Button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="font-bold mb-4">Multi-line Expression Evaluator</h3>
                      <Textarea
                        value={multilineInput}
                        onChange={(e) => setMultilineInput(e.target.value)}
                        placeholder="Enter expressions (use ; to separate)&#10;Example:&#10;x = 5;&#10;y = x^2;&#10;z = y + 10"
                        rows={6}
                        className="font-mono text-sm mb-2"
                      />
                      <Button onClick={evaluateMultiline} className="w-full">Evaluate</Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 Keyboard shortcuts: Enter = Calculate, Escape = Clear, Backspace = Delete
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="matrix">
                <Card className="p-6">
                  <div className="mb-6">
                    <div className="flex gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium">Rows</label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={matrixRows}
                          onChange={(e) => updateMatrixSize(parseInt(e.target.value) || 3, matrixCols)}
                          className="w-20"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Columns</label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={matrixCols}
                          onChange={(e) => updateMatrixSize(matrixRows, parseInt(e.target.value) || 3)}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold mb-2">Matrix A</h4>
                      <div className="space-y-2">
                        {matrixA.map((row, i) => (
                          <div key={i} className="flex gap-2">
                            {row.map((cell, j) => (
                              <Input
                                key={j}
                                value={cell}
                                onChange={(e) => updateMatrixCell("A", i, j, e.target.value)}
                                className="w-16 text-center"
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">Matrix B</h4>
                      <div className="space-y-2">
                        {matrixB.map((row, i) => (
                          <div key={i} className="flex gap-2">
                            {row.map((cell, j) => (
                              <Input
                                key={j}
                                value={cell}
                                onChange={(e) => updateMatrixCell("B", i, j, e.target.value)}
                                className="w-16 text-center"
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                    <Button onClick={() => performMatrixOperation("det")} variant="outline">Determinant</Button>
                    <Button onClick={() => performMatrixOperation("inv")} variant="outline">Inverse</Button>
                    <Button onClick={() => performMatrixOperation("transpose")} variant="outline">Transpose</Button>
                    <Button onClick={() => performMatrixOperation("rank")} variant="outline">Rank</Button>
                    <Button onClick={() => performMatrixOperation("add")} variant="outline">A + B</Button>
                    <Button onClick={() => performMatrixOperation("subtract")} variant="outline">A - B</Button>
                    <Button onClick={() => performMatrixOperation("multiply")} variant="outline">A × B</Button>
                  </div>

                  {matrixResult && (
                    <Card className="p-4 bg-muted">
                      <h4 className="font-bold mb-2">Result</h4>
                      <pre className="text-sm whitespace-pre-wrap font-mono">{matrixResult}</pre>
                    </Card>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Calculation History</h3>
                    <Button onClick={clearHistory} variant="destructive" size="sm" disabled={history.length === 0}>
                      <Trash2 className="mr-2 w-4 h-4" />
                      Clear All
                    </Button>
                  </div>

                  {history.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No calculations yet</p>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {history.map((entry) => (
                        <Card key={entry.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground">{entry.expression}</p>
                              <p className="text-lg font-bold">{entry.result}</p>
                            </div>
                            <Button onClick={() => copyResult(entry.result)} variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
