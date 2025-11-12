import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Trash2, Calculator, Download, Upload, ChevronDown, FileJson } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

interface Semester {
  id: number;
  name: string;
  courses: Course[];
}

type GradingScale = "4.0" | "5.0" | "10.0";

const gradePointsMap: Record<GradingScale, Record<string, number>> = {
  "4.0": {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0,
  },
  "5.0": {
    "A+": 5.0, "A": 5.0, "A-": 4.5,
    "B+": 4.0, "B": 3.5, "B-": 3.0,
    "C+": 2.5, "C": 2.0, "C-": 1.5,
    "D+": 1.0, "D": 0.5, "F": 0.0,
  },
  "10.0": {
    "A+": 10.0, "A": 9.0, "A-": 8.5,
    "B+": 8.0, "B": 7.0, "B-": 6.5,
    "C+": 6.0, "C": 5.0, "C-": 4.5,
    "D+": 4.0, "D": 3.0, "F": 0.0,
  },
};

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [gradingScale, setGradingScale] = useState<GradingScale>("4.0");
  const [precision, setPrecision] = useState<number>(2);

  useEffect(() => {
    const saved = localStorage.getItem("cgpa-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSemesters(data.semesters || []);
        setGradingScale(data.gradingScale || "4.0");
        setPrecision(data.precision || 2);
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }
  }, []);

  useEffect(() => {
    if (semesters.length > 0) {
      localStorage.setItem("cgpa-data", JSON.stringify({ semesters, gradingScale, precision }));
    }
  }, [semesters, gradingScale, precision]);

  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now(), name: `Semester ${semesters.length + 1}`, courses: [] }]);
    toast.success("Semester added");
  };

  const removeSemester = (id: number) => {
    setSemesters(semesters.filter((s) => s.id !== id));
    toast.success("Semester removed");
  };

  const updateSemesterName = (id: number, name: string) => {
    setSemesters(semesters.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  const addCourse = (semesterId: number) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId
          ? { ...s, courses: [...s.courses, { id: Date.now(), name: "", credits: 3, grade: "A" }] }
          : s
      )
    );
  };

  const removeCourse = (semesterId: number, courseId: number) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId ? { ...s, courses: s.courses.filter((c) => c.id !== courseId) } : s
      )
    );
  };

  const updateCourse = (semesterId: number, courseId: number, field: keyof Course, value: any) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semesterId
          ? {
              ...s,
              courses: s.courses.map((c) => (c.id === courseId ? { ...c, [field]: value } : c)),
            }
          : s
      )
    );
  };

  const calculateSGPA = (semester: Semester) => {
    let totalPoints = 0;
    let totalCredits = 0;
    const gradePoints = gradePointsMap[gradingScale];

    semester.courses.forEach((course) => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const calculateOverallCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    const gradePoints = gradePointsMap[gradingScale];

    semesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        const points = gradePoints[course.grade] || 0;
        totalPoints += points * course.credits;
        totalCredits += course.credits;
      });
    });

    return { cgpa: totalCredits > 0 ? totalPoints / totalCredits : 0, totalCredits, totalPoints };
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setSemesters([]);
      localStorage.removeItem("cgpa-data");
      toast.success("All data cleared");
    }
  };

  const exportData = () => {
    const data = { semesters, gradingScale, precision };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cgpa-data.json";
    a.click();
    toast.success("Data exported");
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        setSemesters(data.semesters || []);
        setGradingScale(data.gradingScale || "4.0");
        setPrecision(data.precision || 2);
        toast.success("Data imported");
      } catch (error) {
        toast.error("Failed to import data");
      }
    };
    reader.readAsText(file);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const { cgpa, totalCredits, totalPoints } = calculateOverallCGPA();

    doc.setFontSize(20);
    doc.text("CGPA Report", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Grading Scale: ${gradingScale}`, 20, 35);
    doc.text(`Overall CGPA: ${cgpa.toFixed(precision)}`, 20, 45);
    doc.text(`Total Credits: ${totalCredits}`, 20, 55);
    doc.text(`Total Grade Points: ${totalPoints.toFixed(precision)}`, 20, 65);

    let y = 80;

    semesters.forEach((semester, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(`${semester.name}`, 20, y);
      y += 7;

      doc.setFontSize(10);
      doc.text(`SGPA: ${calculateSGPA(semester).toFixed(precision)}`, 20, y);
      y += 10;

      semester.courses.forEach((course) => {
        doc.text(`${course.name || "Unnamed"} - ${course.credits} credits - Grade: ${course.grade}`, 25, y);
        y += 7;
      });

      y += 5;
    });

    doc.save("cgpa-report.pdf");
    toast.success("PDF downloaded");
  };

  const { cgpa, totalCredits, totalPoints } = calculateOverallCGPA();

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - CGPA Calculator | WritingEra</title>
        <meta name="description" content="Calculate your CGPA easily with our advanced calculator. Support for multiple grading systems." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - CGPA Calculator</h1>
            <p className="text-muted-foreground text-center mb-8">Calculate your Cumulative Grade Point Average</p>

            {/* Controls */}
            <Card className="p-6 mb-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Grading Scale</label>
                  <Select value={gradingScale} onValueChange={(v) => setGradingScale(v as GradingScale)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.0">4.0 Scale</SelectItem>
                      <SelectItem value="5.0">5.0 Scale</SelectItem>
                      <SelectItem value="10.0">10.0 Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Precision</label>
                  <Select value={String(precision)} onValueChange={(v) => setPrecision(Number(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 decimals</SelectItem>
                      <SelectItem value="3">3 decimals</SelectItem>
                      <SelectItem value="4">4 decimals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={exportData} variant="outline" className="flex-1">
                    <Download className="mr-2 w-4 h-4" />
                    Export
                  </Button>
                  <label>
                    <input type="file" accept=".json" onChange={importData} className="hidden" />
                    <Button type="button" variant="outline" asChild>
                      <span>
                        <Upload className="mr-2 w-4 h-4" />
                        Import
                      </span>
                    </Button>
                  </label>
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={downloadPDF} variant="outline" disabled={semesters.length === 0} className="flex-1">
                    <FileJson className="mr-2 w-4 h-4" />
                    PDF
                  </Button>
                  <Button onClick={clearAll} variant="destructive" disabled={semesters.length === 0}>
                    Clear
                  </Button>
                </div>
              </div>
            </Card>

            {/* Summary Cards */}
            {semesters.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="p-6 text-center bg-primary/5">
                  <p className="text-sm text-muted-foreground mb-1">Overall CGPA</p>
                  <p className="text-4xl font-bold text-primary">{cgpa.toFixed(precision)}</p>
                  <p className="text-xs text-muted-foreground mt-1">out of {gradingScale}</p>
                </Card>

                <Card className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Credits</p>
                  <p className="text-4xl font-bold">{totalCredits}</p>
                </Card>

                <Card className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Grade Points</p>
                  <p className="text-4xl font-bold">{totalPoints.toFixed(precision)}</p>
                </Card>
              </div>
            )}

            {/* Semesters */}
            {semesters.map((semester) => (
              <Collapsible key={semester.id} defaultOpen className="mb-4">
                <Card>
                  <CollapsibleTrigger className="w-full p-6 flex justify-between items-center hover:bg-muted/50">
                    <div className="flex items-center gap-4 flex-1">
                      <Input
                        value={semester.name}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateSemesterName(semester.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-xs"
                      />
                      <span className="text-sm text-muted-foreground">
                        SGPA: {calculateSGPA(semester).toFixed(precision)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSemester(semester.id);
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <ChevronDown className="w-5 h-5 transition-transform" />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="p-6 pt-0 space-y-4">
                      {semester.courses.map((course) => (
                        <Card key={course.id} className="p-4">
                          <div className="grid md:grid-cols-4 gap-4">
                            <Input
                              value={course.name}
                              onChange={(e) => updateCourse(semester.id, course.id, "name", e.target.value)}
                              placeholder="Course name"
                            />
                            <Input
                              type="number"
                              value={course.credits}
                              onChange={(e) =>
                                updateCourse(semester.id, course.id, "credits", parseInt(e.target.value) || 0)
                              }
                              placeholder="Credits"
                              min="1"
                              max="10"
                            />
                            <Select
                              value={course.grade}
                              onValueChange={(v) => updateCourse(semester.id, course.id, "grade", v)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(gradePointsMap[gradingScale]).map(([grade, points]) => (
                                  <SelectItem key={grade} value={grade}>
                                    {grade} ({points})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              onClick={() => removeCourse(semester.id, course.id)}
                              variant="ghost"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}

                      <Button onClick={() => addCourse(semester.id)} variant="outline" className="w-full">
                        <Plus className="mr-2 w-4 h-4" />
                        Add Course
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}

            <Button onClick={addSemester} variant="default" size="lg" className="w-full">
              <Plus className="mr-2" />
              Add Semester
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
