import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2, Download, Upload, FileJson, GripVertical } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Question {
  id: number;
  type: "short" | "paragraph" | "multiple-choice" | "checkboxes" | "dropdown" | "linear-scale";
  question: string;
  required: boolean;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
}

function SortableQuestion({ question, index, onRemove, onUpdate, addOption, updateOption, removeOption }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </div>
          <h4 className="font-medium">Question {index + 1}</h4>
        </div>
        <Button onClick={() => onRemove(question.id)} variant="ghost" size="sm">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <Select value={question.type} onValueChange={(v) => onUpdate(question.id, "type", v as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short Answer</SelectItem>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
            <SelectItem value="checkboxes">Checkboxes</SelectItem>
            <SelectItem value="dropdown">Dropdown</SelectItem>
            <SelectItem value="linear-scale">Linear Scale</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={question.question}
          onChange={(e) => onUpdate(question.id, "question", e.target.value)}
          placeholder="Enter your question"
        />

        <div className="flex items-center gap-2">
          <Checkbox
            checked={question.required}
            onCheckedChange={(checked) => onUpdate(question.id, "required", checked)}
          />
          <label className="text-sm">Required</label>
        </div>

        {(question.type === "multiple-choice" || question.type === "checkboxes" || question.type === "dropdown") && (
          <div className="space-y-2">
            {(question.options || []).map((option, optIndex) => (
              <div key={optIndex} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                  placeholder={`Option ${optIndex + 1}`}
                />
                <Button onClick={() => removeOption(question.id, optIndex)} variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button onClick={() => addOption(question.id)} variant="outline" size="sm">
              <Plus className="mr-2 w-4 h-4" />
              Add Option
            </Button>
          </div>
        )}

        {question.type === "linear-scale" && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                value={question.scaleMin || 1}
                onChange={(e) => onUpdate(question.id, "scaleMin", parseInt(e.target.value))}
                placeholder="Min"
              />
              <Input
                type="number"
                value={question.scaleMax || 10}
                onChange={(e) => onUpdate(question.id, "scaleMax", parseInt(e.target.value))}
                placeholder="Max"
              />
            </div>
            <Input
              value={question.scaleMinLabel || ""}
              onChange={(e) => onUpdate(question.id, "scaleMinLabel", e.target.value)}
              placeholder="Min label (optional)"
            />
            <Input
              value={question.scaleMaxLabel || ""}
              onChange={(e) => onUpdate(question.id, "scaleMaxLabel", e.target.value)}
              placeholder="Max label (optional)"
            />
          </div>
        )}
      </div>
    </Card>
  );
}

export default function SurveyBuilder() {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const saved = localStorage.getItem("survey-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSurveyTitle(data.title || "");
        setSurveyDescription(data.description || "");
        setQuestions(data.questions || []);
      } catch (e) {
        console.error("Failed to load survey");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("survey-data", JSON.stringify({ title: surveyTitle, description: surveyDescription, questions }));
  }, [surveyTitle, surveyDescription, questions]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), type: "short", question: "", required: false },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, field: keyof Question, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (id: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options: [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`] } : q
      )
    );
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const removeOption = (questionId: number, optionIndex: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          return { ...q, options: q.options.filter((_, i) => i !== optionIndex) };
        }
        return q;
      })
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);
      
      setQuestions(arrayMove(questions, oldIndex, newIndex));
    }
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all data?")) {
      setSurveyTitle("");
      setSurveyDescription("");
      setQuestions([]);
      localStorage.removeItem("survey-data");
      toast.success("Survey cleared");
    }
  };

  const exportJSON = () => {
    const data = { title: surveyTitle, description: surveyDescription, questions };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "survey.json";
    a.click();
    toast.success("Survey exported");
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        setSurveyTitle(data.title || "");
        setSurveyDescription(data.description || "");
        setQuestions(data.questions || []);
        toast.success("Survey imported");
      } catch (error) {
        toast.error("Failed to import");
      }
    };
    reader.readAsText(file);
  };

  const exportPDF = async () => {
    if (!previewRef.current) return;

    toast.info("Generating PDF...");
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("survey.pdf");
    toast.success("PDF downloaded");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Survey Builder | WritingEra</title>
        <meta name="description" content="Create professional surveys and questionnaires with our easy-to-use builder tool." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Survey & Questionnaire Builder</h1>
          <p className="text-muted-foreground text-center mb-8">Create professional surveys in minutes</p>

          {/* Controls */}
          <Card className="p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <Button onClick={exportPDF} variant="outline" disabled={!surveyTitle}>
                <Download className="mr-2 w-4 h-4" />
                PDF
              </Button>
              <Button onClick={exportJSON} variant="outline" disabled={!surveyTitle}>
                <FileJson className="mr-2 w-4 h-4" />
                Export
              </Button>
              <label>
                <input type="file" accept=".json" onChange={importJSON} className="hidden" />
                <Button type="button" variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 w-4 h-4" />
                    Import
                  </span>
                </Button>
              </label>
              <Button onClick={clearAll} variant="destructive" disabled={questions.length === 0}>
                Clear All
              </Button>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Builder Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Builder</h3>

              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Survey Title</label>
                    <Input value={surveyTitle} onChange={(e) => setSurveyTitle(e.target.value)} placeholder="Enter survey title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={surveyDescription}
                      onChange={(e) => setSurveyDescription(e.target.value)}
                      placeholder="Enter survey description"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={questions.map(q => q.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {questions.map((question, index) => (
                    <SortableQuestion
                      key={question.id}
                      question={question}
                      index={index}
                      onRemove={removeQuestion}
                      onUpdate={updateQuestion}
                      addOption={addOption}
                      updateOption={updateOption}
                      removeOption={removeOption}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              <Button onClick={addQuestion} variant="outline" className="w-full">
                <Plus className="mr-2" />
                Add Question
              </Button>
            </div>

            {/* Preview Panel */}
            <div className="lg:sticky lg:top-4 h-fit">
              <h3 className="text-lg font-bold mb-4">Live Preview</h3>
              <div ref={previewRef} className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{surveyTitle || "Survey Title"}</h1>
                {surveyDescription && <p className="text-gray-600 mb-6">{surveyDescription}</p>}

                {questions.map((q, index) => (
                  <div key={q.id} className="mb-6 pb-6 border-b last:border-b-0">
                    <p className="font-medium mb-3">
                      {index + 1}. {q.question || "Question text"}
                      {q.required && <span className="text-red-500 ml-1">*</span>}
                    </p>

                    {q.type === "short" && <Input placeholder="Your answer" disabled />}

                    {q.type === "paragraph" && <Textarea placeholder="Your answer" rows={3} disabled />}

                    {q.type === "multiple-choice" && (
                      <RadioGroup>
                        {(q.options || ["Option 1", "Option 2"]).map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <RadioGroupItem value={opt} id={`${q.id}-${i}`} disabled />
                            <Label htmlFor={`${q.id}-${i}`}>{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {q.type === "checkboxes" && (
                      <div className="space-y-2">
                        {(q.options || ["Option 1", "Option 2"]).map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Checkbox id={`${q.id}-cb-${i}`} disabled />
                            <Label htmlFor={`${q.id}-cb-${i}`}>{opt}</Label>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.type === "dropdown" && (
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                        <SelectContent>
                          {(q.options || ["Option 1", "Option 2"]).map((opt, i) => (
                            <SelectItem key={i} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {q.type === "linear-scale" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{q.scaleMinLabel || q.scaleMin || 1}</span>
                          <span>{q.scaleMaxLabel || q.scaleMax || 10}</span>
                        </div>
                        <Slider
                          min={q.scaleMin || 1}
                          max={q.scaleMax || 10}
                          step={1}
                          defaultValue={[Math.floor(((q.scaleMin || 1) + (q.scaleMax || 10)) / 2)]}
                          disabled
                        />
                      </div>
                    )}
                  </div>
                ))}

                {questions.length === 0 && <p className="text-gray-400 text-center py-8">No questions yet. Add one to get started!</p>}
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}