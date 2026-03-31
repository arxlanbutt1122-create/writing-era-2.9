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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="WritingEra | Academic & Business Writing Services"
        description="WritingEra provides academic and business writing services including essays, research papers, dissertations, editing, and business content with original work and responsive support."
        path="/"
        keywords={["academic writing services", "essay writing help", "research paper writing", "dissertation help", "business writing services", "editing and proofreading"]}
        schema={[organizationSchema, websiteSchema, webpageSchema({ title: "WritingEra | Academic & Business Writing Services", description: "WritingEra provides academic and business writing services including essays, research papers, dissertations, editing, and business content with original work and responsive support.", url: "https://www.writingera.com/" })]}
      />
      <Navigation />
      <HeroSection />
      <TrustBadges />
      <UniversityCarousel />
      <FeaturedServices />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
