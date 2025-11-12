import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FileText, Download, Plus, Trash2, Upload, Image as ImageIcon, Save, GripVertical } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Entry {
  id: number;
  title: string;
  subtitle: string;
  startDate?: Date;
  endDate?: Date;
  duration: string;
  description: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
  };
  summary: string;
  experience: Entry[];
  education: Entry[];
  skills: string[];
  projects: Entry[];
  certifications: Entry[];
  languages: { language: string; proficiency: string }[];
}

type Template = "classic" | "modern" | "minimal";

const emptyResume: ResumeData = {
  personalInfo: { name: "", email: "", phone: "", address: "", photo: "" },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

function SortableEntryCard({ entry, section, onRemove, onUpdate }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: entry.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </div>
          <h4 className="font-medium capitalize">{section} Entry</h4>
        </div>
        <Button onClick={() => onRemove(entry.id)} variant="ghost" size="sm">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <Input
          value={entry.title}
          onChange={(e) => onUpdate(entry.id, "title", e.target.value)}
          placeholder="Title"
        />
        <Input
          value={entry.subtitle}
          onChange={(e) => onUpdate(entry.id, "subtitle", e.target.value)}
          placeholder={section === "education" ? "Institution" : "Company/Organization"}
        />
        
        {/* Date Pickers */}
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                {entry.startDate ? format(entry.startDate, "MMM yyyy") : "Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={entry.startDate}
                onSelect={(date) => onUpdate(entry.id, "startDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                {entry.endDate ? format(entry.endDate, "MMM yyyy") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={entry.endDate}
                onSelect={(date) => onUpdate(entry.id, "endDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <Textarea
          value={entry.description}
          onChange={(e) => onUpdate(entry.id, "description", e.target.value)}
          placeholder="Description"
          rows={3}
        />
      </div>
    </Card>
  );
}

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeData>(emptyResume);
  const [template, setTemplate] = useState<Template>("classic");
  const [activeTab, setActiveTab] = useState("personal");
  const previewRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const saved = localStorage.getItem("resume-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Convert date strings back to Date objects
        const parseDates = (entries: Entry[]) => entries.map(e => ({
          ...e,
          startDate: e.startDate ? new Date(e.startDate) : undefined,
          endDate: e.endDate ? new Date(e.endDate) : undefined,
        }));
        
        setResume({
          ...data,
          experience: parseDates(data.experience || []),
          education: parseDates(data.education || []),
          projects: parseDates(data.projects || []),
          certifications: parseDates(data.certifications || []),
        });
      } catch (e) {
        console.error("Failed to load resume");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(resume));
  }, [resume]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResume({ ...resume, personalInfo: { ...resume.personalInfo, [field]: value } });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      updatePersonalInfo("photo", event.target?.result as string);
      toast.success("Photo uploaded");
    };
    reader.readAsDataURL(file);
  };

  const addEntry = (section: keyof ResumeData) => {
    if (Array.isArray(resume[section])) {
      setResume({
        ...resume,
        [section]: [...(resume[section] as Entry[]), { id: Date.now(), title: "", subtitle: "", duration: "", description: "" }],
      });
    }
  };

  const removeEntry = (section: keyof ResumeData, id: number) => {
    if (Array.isArray(resume[section])) {
      setResume({
        ...resume,
        [section]: (resume[section] as Entry[]).filter((e) => e.id !== id),
      });
    }
  };

  const updateEntry = (section: keyof ResumeData, id: number, field: string, value: any) => {
    if (Array.isArray(resume[section])) {
      setResume({
        ...resume,
        [section]: (resume[section] as Entry[]).map((e) => {
          if (e.id === id) {
            const updated = { ...e, [field]: value };
            // Auto-update duration when dates change
            if (field === "startDate" || field === "endDate") {
              if (updated.startDate && updated.endDate) {
                updated.duration = `${format(updated.startDate, "MMM yyyy")} - ${format(updated.endDate, "MMM yyyy")}`;
              } else if (updated.startDate) {
                updated.duration = `${format(updated.startDate, "MMM yyyy")} - Present`;
              }
            }
            return updated;
          }
          return e;
        }),
      });
    }
  };

  const handleDragEnd = (section: keyof ResumeData) => (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const entries = resume[section] as Entry[];
      const oldIndex = entries.findIndex((e) => e.id === active.id);
      const newIndex = entries.findIndex((e) => e.id === over.id);
      
      setResume({
        ...resume,
        [section]: arrayMove(entries, oldIndex, newIndex),
      });
    }
  };

  const addSkill = () => {
    setResume({ ...resume, skills: [...resume.skills, ""] });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resume.skills];
    newSkills[index] = value;
    setResume({ ...resume, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    setResume({ ...resume, skills: resume.skills.filter((_, i) => i !== index) });
  };

  const addLanguage = () => {
    setResume({ ...resume, languages: [...resume.languages, { language: "", proficiency: "Intermediate" }] });
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const newLangs = [...resume.languages];
    newLangs[index] = { ...newLangs[index], [field]: value };
    setResume({ ...resume, languages: newLangs });
  };

  const removeLanguage = (index: number) => {
    setResume({ ...resume, languages: resume.languages.filter((_, i) => i !== index) });
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
    pdf.save("resume.pdf");
    toast.success("Resume downloaded!");
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-data.json";
    a.click();
    toast.success("Data exported");
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        setResume(data);
        toast.success("Data imported");
      } catch (error) {
        toast.error("Failed to import");
      }
    };
    reader.readAsText(file);
  };

  const printResume = () => {
    window.print();
    toast.success("Opening print dialog");
  };

  const getTemplateStyles = () => {
    const base = "bg-white p-8 shadow-lg min-h-[1000px]";
    if (template === "modern") return `${base} border-l-8 border-primary`;
    if (template === "minimal") return `${base} font-light`;
    return base;
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Resume Builder | WritingEra</title>
        <meta name="description" content="Create a professional resume with our easy-to-use resume builder tool." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Professional Resume Builder</h1>
          <p className="text-muted-foreground text-center mb-8">Build your resume in minutes</p>

          {/* Controls */}
          <Card className="p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <Select value={template} onValueChange={(v) => setTemplate(v as Template)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={exportPDF} variant="outline">
                <Download className="mr-2 w-4 h-4" />
                PDF
              </Button>
              <Button onClick={exportJSON} variant="outline">
                <Save className="mr-2 w-4 h-4" />
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
              <Button onClick={printResume} variant="outline">
                <FileText className="mr-2 w-4 h-4" />
                Print
              </Button>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 lg:grid-cols-8">
                  <TabsTrigger value="personal">Info</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="experience">Exp</TabsTrigger>
                  <TabsTrigger value="education">Edu</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="certifications">Certs</TabsTrigger>
                  <TabsTrigger value="languages">Langs</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <Card className="p-6 space-y-4">
                    <div className="flex gap-4 items-center">
                      {resume.personalInfo.photo && (
                        <img src={resume.personalInfo.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                      )}
                      <label>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        <Button type="button" variant="outline" asChild>
                          <span>
                            <ImageIcon className="mr-2 w-4 h-4" />
                            Upload Photo
                          </span>
                        </Button>
                      </label>
                    </div>
                    <Input value={resume.personalInfo.name} onChange={(e) => updatePersonalInfo("name", e.target.value)} placeholder="Full Name" />
                    <Input value={resume.personalInfo.email} onChange={(e) => updatePersonalInfo("email", e.target.value)} placeholder="Email" type="email" />
                    <Input value={resume.personalInfo.phone} onChange={(e) => updatePersonalInfo("phone", e.target.value)} placeholder="Phone" />
                    <Input value={resume.personalInfo.address} onChange={(e) => updatePersonalInfo("address", e.target.value)} placeholder="Address" />
                  </Card>
                </TabsContent>

                <TabsContent value="summary">
                  <Card className="p-6">
                    <Textarea
                      value={resume.summary}
                      onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                      placeholder="Professional summary..."
                      rows={8}
                    />
                    <p className="text-sm text-muted-foreground mt-2">{resume.summary.length} characters</p>
                  </Card>
                </TabsContent>

                {["experience", "education", "projects", "certifications"].map((section) => (
                  <TabsContent key={section} value={section}>
                    <div className="space-y-4">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd(section as keyof ResumeData)}
                      >
                        <SortableContext
                          items={(resume[section as keyof ResumeData] as Entry[]).map(e => e.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          {(resume[section as keyof ResumeData] as Entry[]).map((entry) => (
                            <SortableEntryCard
                              key={entry.id}
                              entry={entry}
                              section={section}
                              onRemove={(id: number) => removeEntry(section as keyof ResumeData, id)}
                              onUpdate={(id: number, field: string, value: any) => updateEntry(section as keyof ResumeData, id, field, value)}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                      <Button onClick={() => addEntry(section as keyof ResumeData)} variant="outline" className="w-full">
                        <Plus className="mr-2 w-4 h-4" />
                        Add {section}
                      </Button>
                    </div>
                  </TabsContent>
                ))}

                <TabsContent value="skills">
                  <div className="space-y-4">
                    {resume.skills.map((skill, index) => (
                      <Card key={index} className="p-4 flex gap-2">
                        <Input value={skill} onChange={(e) => updateSkill(index, e.target.value)} placeholder="Skill name" />
                        <Button onClick={() => removeSkill(index)} variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </Card>
                    ))}
                    <Button onClick={addSkill} variant="outline" className="w-full">
                      <Plus className="mr-2 w-4 h-4" />
                      Add Skill
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="languages">
                  <div className="space-y-4">
                    {resume.languages.map((lang, index) => (
                      <Card key={index} className="p-4 flex gap-2">
                        <Input value={lang.language} onChange={(e) => updateLanguage(index, "language", e.target.value)} placeholder="Language" />
                        <Select value={lang.proficiency} onValueChange={(v) => updateLanguage(index, "proficiency", v)}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Native">Native</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={() => removeLanguage(index)} variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </Card>
                    ))}
                    <Button onClick={addLanguage} variant="outline" className="w-full">
                      <Plus className="mr-2 w-4 h-4" />
                      Add Language
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-4 h-fit">
              <h3 className="text-lg font-bold mb-4">Live Preview</h3>
              <div ref={previewRef} className={getTemplateStyles()}>
                {/* Header */}
                <div className="mb-6 text-center">
                  {resume.personalInfo.photo && (
                    <img src={resume.personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  )}
                  <h1 className="text-3xl font-bold mb-2">{resume.personalInfo.name || "Your Name"}</h1>
                  <div className="text-sm text-gray-600 space-y-1">
                    {resume.personalInfo.email && <p>{resume.personalInfo.email}</p>}
                    {resume.personalInfo.phone && <p>{resume.personalInfo.phone}</p>}
                    {resume.personalInfo.address && <p>{resume.personalInfo.address}</p>}
                  </div>
                </div>

                {/* Summary */}
                {resume.summary && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Summary</h2>
                    <p className="text-sm text-gray-700">{resume.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {resume.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Experience</h2>
                    {resume.experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <h3 className="font-bold">{exp.title}</h3>
                        <p className="text-sm text-gray-600">{exp.subtitle}</p>
                        <p className="text-sm text-gray-500 italic">{exp.duration}</p>
                        <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {resume.education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Education</h2>
                    {resume.education.map((edu) => (
                      <div key={edu.id} className="mb-4">
                        <h3 className="font-bold">{edu.title}</h3>
                        <p className="text-sm text-gray-600">{edu.subtitle}</p>
                        <p className="text-sm text-gray-500 italic">{edu.duration}</p>
                        <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {resume.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, i) => (
                        <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resume.projects.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Projects</h2>
                    {resume.projects.map((proj) => (
                      <div key={proj.id} className="mb-4">
                        <h3 className="font-bold">{proj.title}</h3>
                        <p className="text-sm text-gray-600">{proj.subtitle}</p>
                        <p className="text-sm text-gray-500 italic">{proj.duration}</p>
                        <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications */}
                {resume.certifications.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Certifications</h2>
                    {resume.certifications.map((cert) => (
                      <div key={cert.id} className="mb-4">
                        <h3 className="font-bold">{cert.title}</h3>
                        <p className="text-sm text-gray-600">{cert.subtitle}</p>
                        <p className="text-sm text-gray-500 italic">{cert.duration}</p>
                        <p className="text-sm text-gray-700 mt-1">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages */}
                {resume.languages.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Languages</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {resume.languages.map((lang, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-semibold">{lang.language}</span>: {lang.proficiency}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}