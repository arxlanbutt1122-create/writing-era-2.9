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
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, Briefcase, GraduationCap, PenTool } from "lucide-react";

const academicLinks = [
  { label: "Assignment Writing", href: "/services/assignment-writing" },
  { label: "Essay Writing", href: "/services/essay-writing" },
  { label: "Research Paper", href: "/services/research-paper" },
  { label: "Dissertation Writing", href: "/services/dissertation-writing" },
  { label: "Academic Report Writing", href: "/services/report-writing" },
  { label: "Literature Review", href: "/services/literature-review" },
];

const editingLinks = [
  { label: "Proofreading", href: "/services/proofreading" },
  { label: "Academic Editing", href: "/services/academic-editing" },
  { label: "Lab Report", href: "/services/lab-report" },
  { label: "Case Study Analysis", href: "/services/case-study" },
  { label: "Capstone Project", href: "/services/capstone-project" },
  { label: "Exam Notes", href: "/services/exam-notes" },
];

const businessLinks = [
  { label: "Business Plan", href: "/services/business-plan" },
  { label: "Website Content", href: "/services/website-content" },
  { label: "SEO Content", href: "/services/seo-content" },
  { label: "Resume / CV Writing", href: "/services/resume-cv-writing" },
  { label: "Cover Letter", href: "/services/cover-letter" },
  { label: "Personal Statement", href: "/services/personal-statement" },
];

const reasons = [
  "Clear communication before and after you place an order",
  "Support for urgent, standard, and long-term academic projects",
  "Help with assignments, essays, research, reports, editing, and business documents",
  "One website with direct links to the pages that match your exact brief",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="WritingEra | Academic & Business Writing Services"
        description="WritingEra provides assignment writing, essay help, research paper support, dissertation assistance, proofreading, editing, business writing, and career documents with clear service pages and practical support."
        path="/"
        schema={[
          organizationSchema,
          websiteSchema,
          webpageSchema({
            title: "WritingEra | Academic & Business Writing Services",
            description:
              "Assignment writing, essays, research papers, dissertations, proofreading, business writing, and career documents in one place.",
            url: "https://www.writingera.com/",
          }),
        ]}
      />

      <Navigation />
      <HeroSection />
      <TrustBadges />
      <UniversityCarousel />
      <FeaturedServices />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Practical support for real deadlines
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Writing support built around real student and client needs
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              WritingEra is for people who need clear, reliable help with coursework,
              essays, research papers, dissertations, reports, editing, business
              documents, and career materials. Instead of forcing visitors through vague
              pages, we guide them to the service that actually fits the brief, the level,
              and the deadline.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              Whether you are handling an urgent university assignment, polishing a final
              draft before submission, preparing a business plan, or improving your resume,
              the goal is simple: give you a clear path from the homepage to the exact page
              that matches your requirement.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="border-primary/10 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Academic writing support</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  For assignments, essays, research papers, dissertations, literature
                  reviews, reports, and other university work that needs structure,
                  clarity, evidence, and proper formatting.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {academicLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="rounded-full border border-border px-3 py-1 text-sm transition hover:border-primary hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <PenTool className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Editing and improvement</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  For drafts that already exist but still need proofreading, academic
                  editing, stronger presentation, cleaner language, or better flow before
                  you submit or share them.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {editingLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="rounded-full border border-border px-3 py-1 text-sm transition hover:border-primary hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Business and career documents</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  For business plans, website content, SEO content, resumes, cover letters,
                  and personal statements when you need professional writing beyond academic
                  work.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {businessLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="rounded-full border border-border px-3 py-1 text-sm transition hover:border-primary hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />

      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Why clients choose WritingEra
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                One homepage, clear next steps, and direct links to the right service
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                Many visitors land on a writing website without knowing whether they need
                assignment help, essay support, research assistance, editing, or a business
                document. A good homepage should remove confusion. It should explain what
                the company does, who it helps, and where a visitor should click next.
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                That is why this page connects academic, editing, business, and career
                services with clear language and direct internal links. You can start from
                the full <Link to="/services" className="font-medium text-primary hover:underline">services page</Link>,
                learn more <Link to="/about" className="font-medium text-primary hover:underline">about WritingEra</Link>,
                share your requirements on the <Link to="/contact" className="font-medium text-primary hover:underline">contact page</Link>,
                or go straight to <Link to="/order" className="font-medium text-primary hover:underline">order</Link>
                when your instructions are ready.
              </p>
            </div>

            <Card className="border-primary/10 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-semibold">What makes this service useful</h3>
                <div className="mt-5 space-y-4">
                  {reasons.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-muted p-5">
                  <h4 className="text-lg font-semibold">Popular starting points</h4>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link to="/services/assignment-writing" className="text-sm font-medium text-primary hover:underline">
                      Assignment Writing Service
                    </Link>
                    <Link to="/services/essay-writing" className="text-sm font-medium text-primary hover:underline">
                      Essay Writing Service
                    </Link>
                    <Link to="/services/research-paper" className="text-sm font-medium text-primary hover:underline">
                      Research Paper Writing
                    </Link>
                    <Link to="/services/dissertation-writing" className="text-sm font-medium text-primary hover:underline">
                      Dissertation Writing
                    </Link>
                    <Link to="/services/proofreading" className="text-sm font-medium text-primary hover:underline">
                      Proofreading Services
                    </Link>
                    <Link to="/services/business-plan" className="text-sm font-medium text-primary hover:underline">
                      Business Plan Writing
                    </Link>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <Link to="/services">Browse All Services</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Talk to Our Team</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
