import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import UniversityCarousel from "@/components/UniversityCarousel";
import FeaturedServices from "@/components/FeaturedServices";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { organizationSchema, websiteSchema, webpageSchema } from "@/utils/structuredData";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="WritingEra | Academic & Business Writing Services"
        description="WritingEra offers assignment writing service support, essay writing, research paper help, dissertation assistance, report writing, proofreading, and business writing for students and professionals."
        path="/"
        keywords={["assignment writing service", "assignment help", "academic writing services", "essay writing service", "essay writing help", "research paper writing", "research paper help", "dissertation writing service", "dissertation help", "report writing service", "proofreading service", "business writing services", "editing and proofreading", "coursework help"]}
        schema={[organizationSchema, websiteSchema, webpageSchema({ title: "WritingEra | Academic & Business Writing Services", description: "WritingEra offers academic and business writing services including assignment writing, essays, research papers, dissertations, proofreading, and business content with original work and responsive support.", url: "https://www.writingera.com/" })]}
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
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-3xl">Assignment writing, essay help, and research support in one place</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                WritingEra brings together assignment writing service support, essay help, research paper writing, dissertation guidance, report writing, proofreading, and business writing in one place. Instead of forcing you to browse vague pages, we organise services around real student and client needs such as coursework deadlines, university assignments, structured reports, literature-based tasks, and document polishing.
              </p>
              <p>
                Start with <Link to="/services/assignment-writing" className="text-primary underline underline-offset-4">Assignment Writing Service</Link> if you need coursework, university task support, or urgent assignment help. You can also browse <Link to="/services/essay-writing" className="text-primary underline underline-offset-4">Essay Writing Service</Link>, <Link to="/services/research-paper" className="text-primary underline underline-offset-4">Research Paper Writing</Link>, <Link to="/services/report-writing" className="text-primary underline underline-offset-4">Academic Report Writing</Link>, and <Link to="/services/dissertation-writing" className="text-primary underline underline-offset-4">Dissertation Writing</Link> for more specialised academic support.
              </p>
              <p>
                If you already have a draft and only need language improvement, our <Link to="/services/proofreading" className="text-primary underline underline-offset-4">Proofreading Services</Link> and editing options can help improve structure, clarity, grammar, and overall presentation before submission.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What clients usually come here for</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Assignment help, coursework support, and university writing tasks</p>
              <p>Essays, research papers, reports, and dissertation projects</p>
              <p>Proofreading, editing, and final draft improvement</p>
              <p>Business writing, resumes, and professional documents</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
