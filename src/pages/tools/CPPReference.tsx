import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Code, Book, Copy, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CodeExample {
  title: string;
  code: string;
}

interface Topic {
  name: string;
  description: string;
  examples: CodeExample[];
}

export default function CPPReference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Basics"]);

  const cppTopics: Record<string, Topic[]> = {
    "Basics": [
      {
        name: "If/Else Statement",
        description: "Conditional execution based on boolean expressions",
        examples: [{
          title: "Basic If/Else",
          code: `int x = 10;
if (x > 5) {
    cout << "x is greater than 5";
} else {
    cout << "x is 5 or less";
}`
        }]
      },
      {
        name: "Switch Statement",
        description: "Multi-way branch statement",
        examples: [{
          title: "Switch Example",
          code: `int day = 3;
switch(day) {
    case 1: cout << "Monday"; break;
    case 2: cout << "Tuesday"; break;
    case 3: cout << "Wednesday"; break;
    default: cout << "Other day";
}`
        }]
      },
      {
        name: "Loops",
        description: "For, while, and do-while loops",
        examples: [{
          title: "For Loop",
          code: `for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
// Output: 0 1 2 3 4`
        }, {
          title: "While Loop",
          code: `int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
}`
        }]
      },
      {
        name: "Data Types",
        description: "Built-in data types in C++",
        examples: [{
          title: "Common Data Types",
          code: `int age = 25;           // Integer
double price = 99.99;   // Double precision float
char grade = 'A';       // Character
bool isValid = true;    // Boolean
string name = "John";   // String`
        }]
      }
    ],
    "Functions": [
      {
        name: "Function Declaration",
        description: "Defining and declaring functions",
        examples: [{
          title: "Basic Function",
          code: `// Function declaration
int add(int a, int b);

// Function definition
int add(int a, int b) {
    return a + b;
}

// Function call
int result = add(5, 3); // result = 8`
        }]
      },
      {
        name: "Function Overloading",
        description: "Multiple functions with same name but different parameters",
        examples: [{
          title: "Overloaded Functions",
          code: `int multiply(int a, int b) {
    return a * b;
}

double multiply(double a, double b) {
    return a * b;
}

// Both work
int x = multiply(5, 3);        // calls int version
double y = multiply(5.5, 2.5); // calls double version`
        }]
      }
    ],
    "Arrays & Strings": [
      {
        name: "Arrays",
        description: "Fixed-size sequential collections",
        examples: [{
          title: "Array Declaration",
          code: `int numbers[5] = {1, 2, 3, 4, 5};

// Accessing elements
cout << numbers[0];  // Output: 1

// Iterating
for (int i = 0; i < 5; i++) {
    cout << numbers[i] << " ";
}`
        }]
      },
      {
        name: "Strings",
        description: "String manipulation and operations",
        examples: [{
          title: "String Operations",
          code: `string str = "Hello";
str += " World";           // Concatenation
cout << str.length();      // Length
cout << str.substr(0, 5);  // Substring
cout << str.find("World"); // Find position`
        }]
      }
    ],
    "Pointers & References": [
      {
        name: "Pointers",
        description: "Variables that store memory addresses",
        examples: [{
          title: "Basic Pointers",
          code: `int x = 10;
int* ptr = &x;  // ptr stores address of x

cout << *ptr;   // Dereference: prints 10
*ptr = 20;      // Changes x to 20`
        }]
      },
      {
        name: "References",
        description: "Alias for existing variables",
        examples: [{
          title: "References",
          code: `int x = 10;
int& ref = x;  // ref is an alias for x

ref = 20;      // Changes x to 20
cout << x;     // Output: 20`
        }]
      }
    ],
    "OOP": [
      {
        name: "Classes",
        description: "User-defined data types",
        examples: [{
          title: "Basic Class",
          code: `class Rectangle {
private:
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    
    int area() {
        return width * height;
    }
};

Rectangle rect(10, 5);
cout << rect.area(); // Output: 50`
        }]
      },
      {
        name: "Inheritance",
        description: "Deriving classes from base classes",
        examples: [{
          title: "Inheritance Example",
          code: `class Animal {
public:
    void eat() { cout << "Eating..."; }
};

class Dog : public Animal {
public:
    void bark() { cout << "Woof!"; }
};

Dog myDog;
myDog.eat();   // Inherited method
myDog.bark();  // Own method`
        }]
      },
      {
        name: "Polymorphism",
        description: "Virtual functions and runtime polymorphism",
        examples: [{
          title: "Virtual Functions",
          code: `class Shape {
public:
    virtual double area() { return 0; }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override {
        return 3.14159 * radius * radius;
    }
};`
        }]
      }
    ],
    "STL": [
      {
        name: "Vectors",
        description: "Dynamic arrays",
        examples: [{
          title: "Vector Operations",
          code: `#include <vector>

vector<int> v = {1, 2, 3};
v.push_back(4);         // Add element
v.pop_back();           // Remove last
cout << v.size();       // Size
cout << v[0];           // Access element`
        }]
      },
      {
        name: "Maps",
        description: "Key-value pairs",
        examples: [{
          title: "Map Operations",
          code: `#include <map>

map<string, int> ages;
ages["John"] = 25;
ages["Jane"] = 30;

cout << ages["John"];   // Output: 25
ages.erase("Jane");     // Remove entry`
        }]
      },
      {
        name: "Sets",
        description: "Unique element collections",
        examples: [{
          title: "Set Operations",
          code: `#include <set>

set<int> s = {3, 1, 4, 1, 5};
s.insert(2);
s.erase(1);

// Prints: 2 3 4 5 (unique & sorted)
for (int x : s) cout << x << " ";`
        }]
      }
    ],
    "File I/O": [
      {
        name: "File Reading",
        description: "Reading data from files",
        examples: [{
          title: "Read File",
          code: `#include <fstream>

ifstream file("data.txt");
string line;

while (getline(file, line)) {
    cout << line << endl;
}
file.close();`
        }]
      },
      {
        name: "File Writing",
        description: "Writing data to files",
        examples: [{
          title: "Write File",
          code: `#include <fstream>

ofstream file("output.txt");
file << "Hello, World!" << endl;
file << "Line 2" << endl;
file.close();`
        }]
      }
    ]
  };

  const filteredTopics = Object.entries(cppTopics).reduce((acc, [category, topics]) => {
    const filtered = topics.filter(topic =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, Topic[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - C++ Reference | WritingEra</title>
        <meta name="description" content="Comprehensive C++ programming reference with examples and tutorials covering basics to advanced topics." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Ultimate C++ Reference</h1>
            <p className="text-muted-foreground text-center mb-12">Complete C++ programming guide with code examples</p>

            <Card className="p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search C++ topics, concepts, or keywords..."
                  className="pl-10"
                />
              </div>
            </Card>

            <div className="space-y-6">
              {Object.entries(filteredTopics).map(([category, topics]) => (
                <Card key={category} className="overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-6 text-left hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Code className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">{category}</h2>
                      <span className="ml-auto text-muted-foreground">{topics.length} topics</span>
                    </div>
                  </button>

                  {expandedCategories.includes(category) && (
                    <div className="px-6 pb-6 space-y-4">
                      {topics.map((topic) => (
                        <Card key={topic.name} className="p-4 bg-muted/30">
                          <div className="flex items-start gap-3 mb-3">
                            <Book className="w-5 h-5 text-primary mt-1" />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{topic.name}</h3>
                              <p className="text-sm text-muted-foreground">{topic.description}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {topic.examples.map((example, idx) => (
                              <div key={idx} className="relative">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-sm font-medium text-muted-foreground">{example.title}</p>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyCode(example.code)}
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      asChild
                                    >
                                      <a href="https://www.onlinegdb.com/online_c++_compiler" target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                                <pre className="bg-slate-950 text-slate-50 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto">
                                  <code className="text-sm font-mono">{example.code}</code>
                                </pre>
                              </div>
                            ))}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {Object.keys(filteredTopics).length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No topics found matching "{searchTerm}"</p>
              </Card>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
