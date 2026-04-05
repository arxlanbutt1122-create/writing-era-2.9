import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import UniversityCarousel from "@/components/UniversityCarousel";
import FeaturedServices from "@/components/FeaturedServices";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  organizationSchema,
  websiteSchema,
  webpageSchema,
} from "@/utils/structuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, GraduationCap, Briefcase, FileSearch, PenTool, Presentation, MessageCircle } from "lucide-react";

const quickOrderServices = [
  { label: "Assignment Writing Service", value: "assignment-writing", href: "/services/assignment-writing" },
  { label: "Essay Writing Service", value: "essay-writing", href: "/services/essay-writing" },
  { label: "Research Paper Writing", value: "research-paper", href: "/services/research-paper" },
  { label: "Dissertation Writing", value: "dissertation-writing", href: "/services/dissertation-writing" },
  { label: "Academic Report Writing", value: "report-writing", href: "/services/report-writing" },
  { label: "Proofreading Service", value: "proofreading", href: "/services/proofreading" },
  { label: "Business Plan Writing", value: "business-plan", href: "/services/business-plan" },
  { label: "Website Content", value: "website-content", href: "/services/website-content" },
  { label: "Resume / CV Writing", value: "resume-cv-writing", href: "/services/resume-cv-writing" },
  { label: "Cover Letter Support", value: "cover-letter", href: "/services/cover-letter" },
];

const pageOptions = Array.from({ length: 20 }, (_, i) => ({
  label: `${i + 1} Page${i === 0 ? "" : "s"}`,
  value: String(i + 1),
}));

const levelOptions = ["College", "Undergraduate", "Master's", "PhD", "Professional"];
const deadlineOptions = ["6 Hours", "12 Hours", "24 Hours", "2 Days", "3 Days", "5 Days", "7 Days"];

const categoryCards = [
  {
    icon: GraduationCap,
    title: "Academic Writing",
    description: "Assignments, essays, reports, case studies, and coursework support.",
    href: "/services?category=Academic%20Writing",
  },
  {
    icon: FileSearch,
    title: "Research & Dissertation",
    description: "Research papers, literature reviews, thesis writing, and dissertation chapters.",
    href: "/services?category=Academic%20Writing",
  },
  {
    icon: PenTool,
    title: "Editing & Proofreading",
    description: "Academic editing, proofreading, manuscript checks, and final-draft polishing.",
    href: "/services?category=Editing%20%26%20Proofreading",
  },
  {
    icon: Briefcase,
    title: "Business & Content",
    description: "Business plans, website content, SEO content, and commercial writing support.",
    href: "/services?category=Business%20Writing",
  },
  {
    icon: Presentation,
    title: "Career Documents",
    description: "Resume writing, cover letters, LinkedIn optimization, and personal statements.",
    href: "/services?category=Other%20Services",
  },
  {
    icon: MessageCircle,
    title: "Talk to WritingEra",
    description: "Need something custom? Start with contact or the order form and share your brief.",
    href: "/contact",
  },
];

const comparisonRows = [
  {
    need: "Urgent coursework, assignment brief, or university report",
    page: { label: "Assignment Writing Service", href: "/services/assignment-writing" },
    bestFor: "Deadline-driven academic work with instructions already available",
  },
  {
    need: "Argument-led essays, reflective tasks, or analytical papers",
    page: { label: "Essay Writing Service", href: "/services/essay-writing" },
    bestFor: "Students who need structure, clarity, and source-backed writing",
  },
  {
    need: "Methodology, literature review, or evidence-based research",
    page: { label: "Research Paper Writing", href: "/services/research-paper" },
    bestFor: "Research-heavy university work and source-based assignments",
  },
  {
    need: "Long-form postgraduate work or chapter-level help",
    page: { label: "Dissertation Writing", href: "/services/dissertation-writing" },
    bestFor: "Master's and PhD clients handling larger research projects",
  },
  {
    need: "Final draft polishing before submission",
    page: { label: "Proofreading & Academic Editing", href: "/services/proofreading" },
    bestFor: "Improving grammar, structure, clarity, citations, and academic tone",
  },
  {
    need: "Commercial copy, brand messaging, or business documents",
    page: { label: "Business Plan Writing", href: "/services/business-plan" },
    bestFor: "Founders, agencies, and teams that need polished business writing",
  },
];

const benefitPoints = [
  "Clear structure and academic formatting for assignment, essay, and report submissions",
  "Research-backed writing support for literature reviews, methodology, and source handling",
  "Editing and proofreading that improve clarity, coherence, and presentation quality",
  "Business and content writing for proposals, websites, brand pages, and career documents",
];

const Index = () => {
  const [service, setService] = useState(quickOrderServices[0].value);
  const [level, setLevel] = useState("Undergraduate");
  const [pages, setPages] = useState("2");
  const [deadline, setDeadline] = useState("3 Days");

  const selectedService = quickOrderServices.find((item) => item.value === service) ?? quickOrderServices[0];

  const handleQuickOrder = () => {
    const message = [
      "Hello WritingEra, I want to place a new order.",
      "",
      `Service: ${selectedService.label}`,
      `Academic level: ${level}`,
      `Number of pages: ${pages}`,
      `Deadline: ${deadline}`,
      "",
      "Please share price and next steps.",
    ].join("\n");

    window.open(`https://wa.me/923234827157?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="WritingEra | Assignment Writing, Essays & Research Support"
        description="Assignment writing, essay help, research papers, dissertations, proofreading, business writing, and career document support for global students and professionals."
        path="/"
        schema={[
          organizationSchema,
          websiteSchema,
          webpageSchema({
            title: "WritingEra | Assignment Writing, Essays & Research Support",
            description:
              "Assignment writing, essay help, research papers, dissertations, proofreading, business writing, and career document support for global students and professionals.",
            url: "https://www.writingera.com/",
          }),
        ]}
      />

      <Navigation />
      <HeroSection />
      <TrustBadges />
      <UniversityCarousel />
      <FeaturedServices />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12 space-y-5">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
              Global academic and business writing support
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
              Clear writing help for students, researchers, professionals, and growing businesses
            </h2>
            <p className="text-lg text-muted-foreground leading-8">
              WritingEra supports clients who need dependable help with university assignments, essays,
              research papers, dissertations, reports, editing, business documents, and career materials.
              You can start directly from the page that matches your brief, deadline, and academic or
              professional level.
            </p>
            <p className="text-lg text-muted-foreground leading-8">
              Popular starting points include{" "}
              <Link to="/services/assignment-writing" className="font-medium text-primary underline underline-offset-4">
                assignment writing service
              </Link>
              ,{" "}
              <Link to="/services/essay-writing" className="font-medium text-primary underline underline-offset-4">
                essay writing service
              </Link>
              ,{" "}
              <Link to="/services/research-paper" className="font-medium text-primary underline underline-offset-4">
                research paper writing
              </Link>
              ,{" "}
              <Link to="/services/dissertation-writing" className="font-medium text-primary underline underline-offset-4">
                dissertation writing
              </Link>
              ,{" "}
              <Link to="/services/business-plan" className="font-medium text-primary underline underline-offset-4">
                business plan writing
              </Link>
              ,{" "}
              <Link to="/services/website-content" className="font-medium text-primary underline underline-offset-4">
                website content
              </Link>
              ,{" "}
              <Link to="/services/proofreading" className="font-medium text-primary underline underline-offset-4">
                proofreading
              </Link>
              , and{" "}
              <Link to="/services/academic-editing" className="font-medium text-primary underline underline-offset-4">
                academic editing
              </Link>
              . We work with clients in the UK, the USA, the UAE, across Europe, and internationally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryCards.map((card) => (
              <Link key={card.title} to={card.href} className="block h-full">
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 border-primary/10">
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                      <card.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid xl:grid-cols-[1.5fr_1fr] gap-8 items-start">
            <Card className="overflow-hidden border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Choose the right service without guesswork</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold">If you need</th>
                      <th className="text-left py-3 pr-4 font-semibold">Best page to open</th>
                      <th className="text-left py-3 font-semibold">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.need} className="border-b border-border/60 align-top">
                        <td className="py-4 pr-4 text-muted-foreground">{row.need}</td>
                        <td className="py-4 pr-4">
                          <Link to={row.page.href} className="font-medium text-primary underline underline-offset-4">
                            {row.page.label}
                          </Link>
                        </td>
                        <td className="py-4 text-muted-foreground">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="border-primary/10 sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Quick order on WhatsApp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Pick your service, level, page count, and deadline. We will prepare a ready message for
                  WhatsApp so your team gets the full brief faster.
                </p>

                <div className="space-y-2">
                  <Label>What do you need?</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {quickOrderServices.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Academic / project level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Number of pages</Label>
                  <Select value={pages} onValueChange={setPages}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pages" />
                    </SelectTrigger>
                    <SelectContent>
                      {pageOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Select value={deadline} onValueChange={setDeadline}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deadline" />
                    </SelectTrigger>
                    <SelectContent>
                      {deadlineOptions.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3 pt-2">
                  <Button onClick={handleQuickOrder} className="w-full bg-success hover:bg-success/90">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Send to WhatsApp
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={selectedService.href}>Open Selected Service Page</Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to="/order">Open Full Order Form</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary mb-4">
                Why clients choose WritingEra
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-5">
                Better structure, clearer writing, and stronger submissions
              </h2>
              <p className="text-lg text-muted-foreground leading-8 mb-5">
                Clients usually come to WritingEra when they need more than just words on a page. They need
                better organization, cleaner academic structure, reliable source use, polished editing, and a
                smoother route from brief to final submission. That matters whether the work is a short essay,
                a research-heavy paper, a dissertation chapter, or a business document.
              </p>
              <p className="text-lg text-muted-foreground leading-8">
                If you are comparing options, start from the{" "}
                <Link to="/services" className="font-medium text-primary underline underline-offset-4">
                  full services page
                </Link>
                , learn more{" "}
                <Link to="/about" className="font-medium text-primary underline underline-offset-4">
                  about WritingEra
                </Link>
                , or contact the team through the{" "}
                <Link to="/contact" className="font-medium text-primary underline underline-offset-4">
                  contact page
                </Link>
                . If your brief is ready, go directly to the{" "}
                <Link to="/order" className="font-medium text-primary underline underline-offset-4">
                  order form
                </Link>
                .
              </p>
            </div>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl">What clients usually improve</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefitPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
