import { MessageSquare, FileCheck, Users, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Choose Your Service",
      description: "Select the writing service you need from our comprehensive list of 45+ services.",
    },
    {
      icon: FileCheck,
      number: "02",
      title: "Submit Requirements",
      description: "Provide us with your instructions, deadline, and any reference materials.",
    },
    {
      icon: Users,
      number: "03",
      title: "Expert Works on It",
      description: "Our qualified writers with subject expertise complete your project with care.",
    },
    {
      icon: Download,
      number: "04",
      title: "Receive Quality Work",
      description: "Get your completed work with FREE Turnitin report. Request revisions if needed.",
    },
  ];

  return (
    <section 
      className="relative py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/how-it-works-bg-new.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/95" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting professional writing help is simple and straightforward
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-accent" />
              )}

              <div className="relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group h-full">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-primary">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 p-4 bg-primary/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
