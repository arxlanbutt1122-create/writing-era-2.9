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
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, FileText, GraduationCap, Layers3, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { organizationSchema, websiteSchema, webpageSchema } from "@/utils/structuredData";

const textLink =
  "font-semibold text-primary underline underline-offset-4 decoration-primary/60 transition hover:text-primary/80";

const categoryCards = [
  {
    icon: BookOpen,
    title: "Academic writing",
    description:
      "For assignments, essays, reports, coursework, lab reports, and day-to-day university submissions.",
    links: [
      { label: "Assignment writing", href: "/services/assignment-writing" },
      { label: "Essay writing", href: "/services/essay-writing" },
      { label: "Academic report writing", href: "/services/report-writing" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Research and postgraduate support",
    description:
      "For source-based research, thesis chapters, dissertation sections, literature reviews, and methodology work.",
    links: [
      { label: "Research paper writing", href: "/services/research-paper" },
      { label: "Thesis writing", href: "/services/thesis-writing" },
      { label: "Dissertation writing", href: "/services/dissertation-writing" },
    ],
  },
  {
    icon: Briefcase,
    title: "Business and content work",
    description:
      "For business plans, website copy, SEO content, articles, and conversion-focused commercial writing.",
    links: [
      { label: "Business plan writing", href: "/services/business-plan" },
      { label: "Website content", href: "/services/website-content" },
      { label: "SEO content writing", href: "/services/seo-content" },
    ],
  },
  {
    icon: Layers3,
    title: "Career and custom projects",
    description:
      "For resumes, cover letters, personal statements, coding assignments, and custom project briefs.",
    links: [
      { label: "Resume / CV writing", href: "/services/resume-cv-writing" },
      { label: "Cover letter support", href: "/services/cover-letter" },
      { label: "Coding assignment help", href: "/services/coding-assignment" },
    ],
  },
];

const comparisonRows = [
  {
    need: "Urgent coursework, daily university tasks, and structured submissions",
    page: { label: "Assignment Writing Service", href: "/services/assignment-writing" },
    notes: "Best for deadline-driven academic work with clear instructions and fast turnaround.",
  },
  {
    need: "Argument-led essays, reflective pieces, and critical discussion",
    page: { label: "Essay Writing Service", href: "/services/essay-writing" },
    notes: "Useful when the brief needs structure, position, evidence, and polished academic style.",
  },
  {
    need: "Research projects, source evaluation, literature handling, and evidence-based writing",
    page: { label: "Research Paper Writing", href: "/services/research-paper" },
    notes: "A strong starting point for research-heavy work and academic projects built around sources.",
  },
  {
    need: "Long-form postgraduate work with chapters, frameworks, and analysis",
    page: { label: "Dissertation Writing", href: "/services/dissertation-writing" },
    notes: "Ideal for master’s and doctoral support where depth, structure, and consistency matter most.",
  },
  {
    need: "Final-draft polishing before submission or client delivery",
    page: { label: "Proofreading Services", href: "/services/proofreading" },
    notes: "Best for grammar, clarity, flow, formatting, and reducing avoidable mistakes.",
  },
  {
    need: "Business plans, service-page copy, SEO content, and commercial writing",
    page: { label: "Business and content services", href: "/services" },
    notes: "Start here if the project is commercial rather than academic and needs a broader options view.",
  },
];

const Index = () => {
  const homeSchema = [
    organizationSchema,
    websiteSchema,
    webpageSchema({
      title: "WritingEra | Academic and Business Writing Services",
      description:
        "Professional writing support for assignments, essays, research papers, dissertations, editing, business plans, and web content.",
      url: "https://www.writingera.com/",
    }),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="WritingEra | Academic and Business Writing Services"
        description="Professional writing support for assignments, essays, research papers, dissertations, editing, business plans, website content, and career documents."
        path="/"
        schema={homeSchema}
      />

      <Navigation />
      <HeroSection />
      <TrustBadges />
      <UniversityCarousel />

      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Global academic and business writing support
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Clear writing help for students, researchers, professionals, and growing businesses
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              WritingEra supports clients who need dependable help with university assignments, essays, research papers,
              dissertations, reports, editing, business documents, and career materials. Whether the brief comes from the
              <span className="font-semibold text-foreground"> UK</span>, the <span className="font-semibold text-foreground">USA</span>, the <span className="font-semibold text-foreground">UAE</span>, across <span className="font-semibold text-foreground">Europe</span>, or from global clients elsewhere, the focus stays the same: clear communication, original work, and service pages that are easy to follow.
            </p>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Clients usually start with{" "}
              <Link to="/services/assignment-writing" className={textLink}>
                assignment writing
              </Link>
              ,{" "}
              <Link to="/services/essay-writing" className={textLink}>
                essay writing
              </Link>
              ,{" "}
              <Link to="/services/research-paper" className={textLink}>
                research paper support
              </Link>
              , or{" "}
              <Link to="/services/dissertation-writing" className={textLink}>
                dissertation help
              </Link>
              . For commercial work, visitors can move directly to{" "}
              <Link to="/services/business-plan" className={textLink}>
                business plan writing
              </Link>
              ,{" "}
              <Link to="/services/website-content" className={textLink}>
                website content
              </Link>
              ,{" "}
              <Link to="/services/seo-content" className={textLink}>
                SEO content writing
              </Link>
              ,{" "}
              <Link to="/services/resume-cv-writing" className={textLink}>
                resume / CV writing
              </Link>
              , and{" "}
              <Link to="/services/cover-letter" className={textLink}>
                cover letter support
              </Link>
              .
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categoryCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="h-full border-primary/10 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-5 text-sm leading-7 text-muted-foreground">{card.description}</p>
                    <div className="space-y-3">
                      {card.links.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center justify-between rounded-xl border border-primary/10 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <FeaturedServices />

      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                A simpler route to the right page
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Start from the service that matches your brief, not from guesswork
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                A strong homepage should help visitors choose the right service quickly. Some people already know they need
                assignment help. Others only know they have a deadline, a subject, and a word count. This section gives a
                direct guide so clients can move from the homepage to the page that best fits the task, the academic level,
                and the deadline.
              </p>
              <div className="mt-8 overflow-hidden rounded-3xl border border-primary/10 bg-background shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-primary/5 text-sm uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-5 py-4 font-semibold">What you need</th>
                        <th className="px-5 py-4 font-semibold">Best page to open</th>
                        <th className="px-5 py-4 font-semibold">Why this is the right start</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row.page.href} className="border-t border-primary/10 align-top">
                          <td className="px-5 py-4 text-sm leading-7 text-foreground">{row.need}</td>
                          <td className="px-5 py-4 text-sm leading-7">
                            <Link to={row.page.href} className={textLink}>
                              {row.page.label}
                            </Link>
                          </td>
                          <td className="px-5 py-4 text-sm leading-7 text-muted-foreground">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Card className="border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Why clients and students choose WritingEra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  "Clear communication before the work starts and after the draft is delivered.",
                  "Support for urgent, standard, and long-term projects across academic and professional categories.",
                  "A better path from homepage to service page, so visitors reach the right option without confusion.",
                  "Useful for students aiming for stronger grades, cleaner structure, better research flow, and more polished final submission quality.",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-sm leading-7 text-muted-foreground">{point}</p>
                  </div>
                ))}

                <div className="rounded-2xl bg-primary/5 p-5">
                  <h3 className="text-lg font-semibold text-foreground">Popular starting points</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Assignment Writing Service", href: "/services/assignment-writing" },
                      { label: "Essay Writing Service", href: "/services/essay-writing" },
                      { label: "Research Paper Writing", href: "/services/research-paper" },
                      { label: "Dissertation Writing", href: "/services/dissertation-writing" },
                      { label: "Proofreading Services", href: "/services/proofreading" },
                      { label: "Business Plan Writing", href: "/services/business-plan" },
                    ].map((item) => (
                      <Link key={item.href} to={item.href} className={textLink}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
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

      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
