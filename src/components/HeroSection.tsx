import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-main-new.jpg";
import StatsCounter from "@/components/StatsCounter";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground py-20 md:py-32 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Students studying together" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-success-light" />
            <span className="text-white font-semibold">Trusted by 1000+ Students Worldwide</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>
            Expert Academic & Business <br />
            <span className="text-secondary" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>Writing Solutions</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-medium" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)' }}>
            100% Original Content with FREE Turnitin Report. Trusted globally by students and professionals from UK, UAE, USA, and Pakistan. Available 24/7.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-secondary hover:bg-secondary-light text-white font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 border-2 border-white/20"
            >
              <Link to="/shop">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-primary font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Link to="/services">View Services</Link>
            </Button>
          </div>

          {/* Trust Stats with Animation */}
          <div className="pt-12 max-w-3xl mx-auto">
            <StatsCounter
              stats={[
                { end: 1000, suffix: "+", label: "Happy Clients" },
                { end: 5000, suffix: "+", label: "Projects Done" },
                { end: 45, suffix: "+", label: "Services" },
                { end: 98, suffix: "%", label: "Satisfaction" },
              ]}
              className="grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default HeroSection;
