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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { organizationSchema, websiteSchema, webpageSchema } from "@/utils/structuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="WritingEra | Assignment Writing, Essays, Research & Editing Services"
        description="WritingEra provides assignment writing service support, essay writing, research paper help, dissertation assistance, report writing, proofreading, academic editing, business writing, and website content services."
        path="/"
        keywords={[
          "assignment writing service",
          "assignment help",
          "online assignment help",
          "university assignment help",
          "essay writing service",
          "essay writing help",
          "research paper writing",
          "dissertation writing service",
          "academic report writing",
          "proofreading services",
          "academic editing",
          "business writing services",
          "website content writing",
          "seo content writing",
        ]}
        schema={[
          organizationSchema,
          websiteSchema,
          webpageSchema({
            title: "WritingEra | Assignment Writing, Essays, Research & Editing Services",
            description:
              "WritingEra provides assignment writing service support, essay writing, research paper help, dissertation assistance, report writing, proofreading, academic editing, business writing, and website content services.",
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
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-3xl">
                  Assignment writing, essay help, research support, and professional documents in one place
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  WritingEra is built for students, researchers, job seekers, and business clients who need
                  practical writing support instead of vague service claims. On one website you can compare
                  <Link to="/services/assignment-writing" className="text-primary underline underline-offset-4 mx-1">
                    assignment writing service
                  </Link>
                  help,
                  <Link to="/services/essay-writing" className="text-primary underline underline-offset-4 mx-1">
                    essay writing
                  </Link>
                  ,
                  <Link to="/services/research-paper" className="text-primary underline underline-offset-4 mx-1">
                    research paper writing
                  </Link>
                  ,
                  <Link to="/services/dissertation-writing" className="text-primary underline underline-offset-4 mx-1">
                    dissertation writing
                  </Link>
                  ,
                  <Link to="/services/report-writing" className="text-primary underline underline-offset-4 mx-1">
                    academic report writing
                  </Link>
                  ,
                  <Link to="/services/proofreading" className="text-primary underline underline-offset-4 mx-1">
                    proofreading services
                  </Link>
                  , and
                  <Link to="/services/academic-editing" className="text-primary underline underline-offset-4 mx-1">
                    academic editing
                  </Link>
                  without jumping between disconnected pages.
                </p>

                <p>
                  Many visitors arrive with urgent coursework, overdue essays, source-based research tasks,
                  thesis chapters, or final-draft polishing needs. That is why this homepage now connects
                  directly to the pages that usually convert best. If your requirement is deadline-driven,
                  begin with
                  <Link to="/services/assignment-writing" className="text-primary underline underline-offset-4 mx-1">
                    Assignment Writing Service
                  </Link>
                  . If your task is argument-led or reflective, go to
                  <Link to="/services/essay-writing" className="text-primary underline underline-offset-4 mx-1">
                    Essay Writing Service
                  </Link>
                  . If you need source evaluation, methodology support, or evidence-based writing, open
                  <Link to="/services/research-paper" className="text-primary underline underline-offset-4 mx-1">
                    Research Paper Writing
                  </Link>
                  or
                  <Link to="/services/dissertation-writing" className="text-primary underline underline-offset-4 mx-1">
                    Dissertation Writing
                  </Link>
                  .
                </p>

                <p>
                  WritingEra is not only for academic work. Clients also use the platform for
                  <Link to="/services/business-plan" className="text-primary underline underline-offset-4 mx-1">
                    business plan writing
                  </Link>
                  ,
                  <Link to="/services/website-content" className="text-primary underline underline-offset-4 mx-1">
                    website content
                  </Link>
                  ,
                  <Link to="/services/seo-content" className="text-primary underline underline-offset-4 mx-1">
                    SEO content writing
                  </Link>
                  ,
                  <Link to="/services/resume-cv-writing" className="text-primary underline underline-offset-4 mx-1">
                    resume and CV writing
                  </Link>
                  , and
                  <Link to="/services/cover-letter" className="text-primary underline underline-offset-4 mx-1">
                    cover letter support
                  </Link>
                  . This broader internal linking helps both users and search engines understand that the site
                  covers multiple writing intents, not just one keyword.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Most common visitor intents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Urgent assignment help for college and university deadlines</p>
                <p>Essay writing support for structured academic arguments</p>
                <p>Research papers, reports, literature reviews, and dissertations</p>
                <p>Proofreading and editing for final draft improvement</p>
                <p>Business plans, resumes, web copy, and SEO content</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">How to choose the right page on WritingEra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The easiest way to improve rankings is not by stuffing random phrases into one page. It is by
                  building clear topic paths. Your homepage should introduce the main service clusters and then
                  pass visitors to more specific pages with clear anchor text. That is why this section links to
                  academic, editing, business, and content-writing pages using plain wording that matches real
                  search intent.
                </p>
                <p>
                  Start with
                  <Link to="/services" className="text-primary underline underline-offset-4 mx-1">
                    the full services page
                  </Link>
                  if you want to compare every category. Open
                  <Link to="/about" className="text-primary underline underline-offset-4 mx-1">
                    About WritingEra
                  </Link>
                  if you want the brand story and founder context. Visit
                  <Link to="/contact" className="text-primary underline underline-offset-4 mx-1">
                    Contact
                  </Link>
                  for custom requirements, and go straight to
                  <Link to="/order" className="text-primary underline underline-offset-4 mx-1">
                    Order
                  </Link>
                  when your brief and deadline are ready.
                </p>
                <p>
                  For research-led jobs, also review
                  <Link to="/services/literature-review" className="text-primary underline underline-offset-4 mx-1">
                    Literature Review
                  </Link>
                  ,
                  <Link to="/services/case-study" className="text-primary underline underline-offset-4 mx-1">
                    Case Study Analysis
                  </Link>
                  , and
                  <Link to="/services/lab-report" className="text-primary underline underline-offset-4 mx-1">
                    Lab Report Writing
                  </Link>
                  . For job-market documents, explore
                  <Link to="/services/personal-statement" className="text-primary underline underline-offset-4 mx-1">
                    Personal Statement
                  </Link>
                  and
                  <Link to="/services/linkedin-optimization" className="text-primary underline underline-offset-4 mx-1">
                    LinkedIn Optimization
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Popular service clusters</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Assignment Writing Service", href: "/services/assignment-writing" },
                  { label: "Essay Writing Service", href: "/services/essay-writing" },
                  { label: "Research Paper Writing", href: "/services/research-paper" },
                  { label: "Dissertation Writing", href: "/services/dissertation-writing" },
                  { label: "Academic Report Writing", href: "/services/report-writing" },
                  { label: "Proofreading Services", href: "/services/proofreading" },
                  { label: "Academic Editing", href: "/services/academic-editing" },
                  { label: "Business Plan Writing", href: "/services/business-plan" },
                  { label: "Website Content", href: "/services/website-content" },
                  { label: "SEO Content Writing", href: "/services/seo-content" },
                  { label: "Resume / CV Writing", href: "/services/resume-cv-writing" },
                  { label: "Cover Letter", href: "/services/cover-letter" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="rounded-lg border border-border px-3 py-2 hover:border-primary hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl">Why more homepage content can help this site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Your homepage already has service sections and testimonials, but its original text block is
                  still relatively short for a site that wants to rank across assignment writing, essay help,
                  research support, editing, business writing, and SEO content. Adding more useful, readable,
                  internally linked content can make the page a stronger hub for both users and crawlers.
                </p>
                <p>
                  The goal is not to repeat the same phrase unnaturally. The goal is to explain who the site is
                  for, what problems it solves, which pages should be visited next, and how services are grouped.
                  This gives Google cleaner topical signals while also sending visitors deeper into the site.
                </p>
                <p>
                  After updating this homepage, the next best content moves are expanding the
                  <Link to="/services" className="text-primary underline underline-offset-4 mx-1">
                    Services
                  </Link>
                  page, improving individual high-value pages like
                  <Link to="/services/assignment-writing" className="text-primary underline underline-offset-4 mx-1">
                    Assignment Writing Service
                  </Link>
                  and
                  <Link to="/services/research-paper" className="text-primary underline underline-offset-4 mx-1">
                    Research Paper Writing
                  </Link>
                  , and publishing articles that answer buyer-intent questions rather than only broad student topics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Next clicks to push visitors deeper</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <Link to="/services" className="block text-primary underline underline-offset-4">
                  Browse all services
                </Link>
                <Link to="/about" className="block text-primary underline underline-offset-4">
                  Read the founder story
                </Link>
                <Link to="/articles" className="block text-primary underline underline-offset-4">
                  Visit articles
                </Link>
                <Link to="/tools" className="block text-primary underline underline-offset-4">
                  Try writing tools
                </Link>
                <Link to="/contact" className="block text-primary underline underline-offset-4">
                  Get a custom quote
                </Link>
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
