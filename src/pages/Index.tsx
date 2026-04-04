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
import { organizationSchema, websiteSchema, webpageSchema } from "@/utils/structuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Globe2, GraduationCap, Briefcase, MessageCircle } from "lucide-react";

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
  { label: "Cover Letter", value: "cover-letter", href: "/services/cover-letter" },
];

const pageOptions = Array.from({ length: 20 }, (_, i) => ({
  label: `${i + 1} Page${i === 0 ? "" : "s"}`,
  value: String(i + 1),
}));

const levelOptions = ["High School", "College", "Undergraduate", "Master's", "PhD", "Professional"];
const deadlineOptions = ["6 Hours", "12 Hours", "24 Hours", "2 Days", "3 Days", "5 Days", "7 Days"];

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
        title="WritingEra | Academic & Business Writing Services"
        description="WritingEra offers assignment writing service support, essay writing, research paper help, dissertation assistance, report writing, proofreading, and business writing for students and professionals worldwide."
        path="/"
        keywords={[
          "assignment writing service",
          "essay writing service",
          "research paper writing",
          "dissertation writing service",
          "academic report writing",
          "proofreading service",
          "business writing services",
          "resume writing service",
          "website content writing",
          "cover letter writing",
        ]}
        schema={[
          organizationSchema,
          websiteSchema,
          webpageSchema({
            title: "WritingEra | Academic & Business Writing Services",
            description:
              "WritingEra offers academic and business writing services including assignment writing, essays, research papers, dissertations, proofreading, editing, and business content.",
            url: "https://www.writingera.com/",
          }),
        ]}
      />

      <Navigation />
      <HeroSection />
      <TrustBadges />
      <UniversityCarousel />
      <FeaturedServices />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />

      <section className="py-16 md:py-20 border-y border-border/60 bg-muted/30">
        <div className="container mx-auto px-4 grid lg:grid-cols-[1.35fr_0.95fr] gap-6 items-start">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="space-y-4">
              <div className="inline-flex w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Global academic and business writing support
              </div>
              <CardTitle className="text-3xl md:text-4xl leading-tight">
                Trusted writing help for academic, professional, and business needs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-muted-foreground leading-relaxed text-[17px]">
              <p>
                WritingEra supports students, researchers, professionals, and businesses that need reliable help with academic work,
                business documents, career materials, and polished final drafts. Whether you are working against a short deadline
                or preparing a larger project, the goal is simple: connect you with the right service page quickly and clearly.
              </p>

              <p>
                For academic work, many clients begin with {" "}
                <Link to="/services/assignment-writing" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Assignment Writing Service
                </Link>{" "}
                when they need structured coursework support, {" "}
                <Link to="/services/essay-writing" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Essay Writing Service
                </Link>{" "}
                for arguments and reflective tasks, {" "}
                <Link to="/services/research-paper" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Research Paper Writing
                </Link>{" "}
                for source-based projects, and {" "}
                <Link to="/services/dissertation-writing" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Dissertation Writing
                </Link>{" "}
                for long-form academic work.
              </p>

              <p>
                If your draft already exists and only needs refinement, you can move straight to {" "}
                <Link to="/services/proofreading" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Proofreading
                </Link>{" "}
                or {" "}
                <Link to="/services/academic-editing" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Academic Editing
                </Link>. For professional and commercial requirements, popular starting points include {" "}
                <Link to="/services/business-plan" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Business Plan Writing
                </Link>, {" "}
                <Link to="/services/website-content" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Website Content
                </Link>, {" "}
                <Link to="/services/resume-cv-writing" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Resume / CV Writing
                </Link>, and {" "}
                <Link to="/services/cover-letter" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  Cover Letter Support
                </Link>.
              </p>

              <p>
                We work with clients from the <strong className="text-foreground">UK</strong>, the <strong className="text-foreground">USA</strong>, the <strong className="text-foreground">UAE</strong>, across <strong className="text-foreground">Europe</strong>, and with international clients worldwide. If you want to compare everything first, visit the {" "}
                <Link to="/services" className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                  full services page
                </Link>. If you already know what you need, you can go directly to the matching page and place your order with clearer instructions.
              </p>

              <div className="grid gap-3 pt-2 sm:grid-cols-2 xl:grid-cols-3">
                <Link to="/services/assignment-writing" className="rounded-2xl border border-border/60 bg-background p-4 transition hover:border-primary/40 hover:shadow-sm">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Academic work
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Assignments, essays, reports, dissertations, case studies, and research writing.
                  </p>
                </Link>
                <Link to="/services/business-plan" className="rounded-2xl border border-border/60 bg-background p-4 transition hover:border-primary/40 hover:shadow-sm">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Professional work
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Business plans, website copy, resumes, cover letters, and content for brands.
                  </p>
                </Link>
                <Link to="/contact" className="rounded-2xl border border-border/60 bg-background p-4 transition hover:border-primary/40 hover:shadow-sm">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                    <Globe2 className="h-4 w-4 text-primary" />
                    International clients
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Support tailored for global universities, international students, and remote clients.
                  </p>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader className="space-y-3">
              <div className="inline-flex w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Quick order on WhatsApp
              </div>
              <CardTitle className="text-2xl leading-tight">Tell us what you need and send it straight to our WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="home-service">What do you need?</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger id="home-service">
                    <SelectValue placeholder="Select a service" />
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="home-level">Academic / project level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger id="home-level">
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

                <div className="grid gap-2">
                  <Label htmlFor="home-pages">Number of pages</Label>
                  <Select value={pages} onValueChange={setPages}>
                    <SelectTrigger id="home-pages">
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
              </div>

              <div className="grid gap-2">
                <Label htmlFor="home-deadline">Deadline</Label>
                <Select value={deadline} onValueChange={setDeadline}>
                  <SelectTrigger id="home-deadline">
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

              <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground">
                This quick form prepares a ready message for WhatsApp so your team gets the service, level,
                pages, and deadline in one go.
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button onClick={handleQuickOrder} className="sm:flex-1 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Send to WhatsApp
                </Button>
                <Button asChild variant="outline" className="sm:flex-1">
                  <Link to={`/order/${selectedService.value}`}>Open full order form</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Popular service paths
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              Start from the service that matches your brief, deadline, and document type
            </h2>
            <p className="text-muted-foreground text-[17px] leading-relaxed">
              These internal links take visitors directly to the pages most often needed for coursework, essays,
              research, editing, business writing, and career documents. Choose the closest match below and continue
              to the dedicated service page for details, pricing direction, and the order route.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
            {[
              {
                title: "Assignments and coursework",
                links: [
                  { label: "Assignment Writing Service", href: "/services/assignment-writing" },
                  { label: "Academic Report Writing", href: "/services/report-writing" },
                  { label: "Case Study Analysis", href: "/services/case-study" },
                ],
              },
              {
                title: "Essays and research",
                links: [
                  { label: "Essay Writing Service", href: "/services/essay-writing" },
                  { label: "Research Paper Writing", href: "/services/research-paper" },
                  { label: "Literature Review", href: "/services/literature-review" },
                ],
              },
              {
                title: "Dissertations and editing",
                links: [
                  { label: "Dissertation Writing", href: "/services/dissertation-writing" },
                  { label: "Proofreading", href: "/services/proofreading" },
                  { label: "Academic Editing", href: "/services/academic-editing" },
                ],
              },
              {
                title: "Business and career writing",
                links: [
                  { label: "Business Plan Writing", href: "/services/business-plan" },
                  { label: "Website Content", href: "/services/website-content" },
                  { label: "Resume / CV Writing", href: "/services/resume-cv-writing" },
                ],
              },
            ].map((group) => (
              <Card key={group.title} className="border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {group.links.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-start gap-2 rounded-xl border border-transparent px-2 py-2 text-sm font-medium text-primary underline underline-offset-4 transition hover:border-primary/20 hover:bg-primary/5"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
