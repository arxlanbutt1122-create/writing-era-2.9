import { Award, Shield, Clock, Users, RefreshCw, DollarSign } from "lucide-react";
import whyChooseBg from "@/assets/why-choose-us-bg-new.jpg";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Expert Writers",
      description: "Qualified professionals with Masters and PhD degrees in their fields.",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "100% Plagiarism-Free",
      description: "Original content with FREE Turnitin report for complete peace of mind.",
      color: "text-success",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "We respect deadlines. Get your work delivered before the due date.",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer support via WhatsApp, email, and phone.",
      color: "text-secondary",
    },
    {
      icon: RefreshCw,
      title: "Unlimited Revisions",
      description: "Free revisions until you're 100% satisfied with the quality.",
      color: "text-primary",
    },
    {
      icon: DollarSign,
      title: "Money-Back Guarantee",
      description: "Full refund if the work doesn't meet your quality standards.",
      color: "text-success",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={whyChooseBg} 
          alt="Why choose us illustration" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="animate-fade-in-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>
              Why Choose <span className="text-secondary" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>WritingEra</span>?
            </h2>
            <p className="text-lg text-white font-medium mb-8" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)' }}>
              We're committed to delivering exceptional writing services that help you succeed academically and professionally. Our track record speaks for itself with thousands of satisfied clients globally.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <p className="text-white font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Trusted by students from 50+ countries</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <p className="text-white font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>98% client satisfaction rate</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <p className="text-white font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Strict confidentiality and privacy protection</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <p className="text-white font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Secure payment options</p>
              </div>
            </div>
          </div>

          {/* Right: Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mb-4 ${feature.color}`}>
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
