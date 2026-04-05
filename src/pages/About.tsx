import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Shield,
  Clock,
  CheckCircle,
  Target,
  Heart,
  TrendingUp,
  Globe,
  Zap,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { founderPersonSchema, organizationSchema, webpageSchema, breadcrumbSchema } from "@/utils/structuredData";
import aboutHeroImage from "@/assets/about-writingera-global-services.webp";
import founderImage from "@/assets/founder-ceo-m-arslan-asif.webp";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "Every project goes through careful checks for structure, clarity, formatting, and client requirements.",
    },
    {
      icon: Shield,
      title: "Academic Integrity",
      description: "Original writing, source-based work, proper citations, and responsible use of research materials.",
    },
    {
      icon: Clock,
      title: "Deadline Focus",
      description: "Support for urgent, standard, and long-term projects with realistic delivery planning.",
    },
    {
      icon: Heart,
      title: "Client Success",
      description: "The goal is better structure, clearer writing, and stronger final submissions for every brief.",
    },
    {
      icon: CheckCircle,
      title: "Confidentiality",
      description: "Your project details, draft materials, and communication remain private and secure.",
    },
    {
      icon: Target,
      title: "Clear Communication",
      description: "Straightforward pricing, better brief handling, and practical support from inquiry to delivery.",
    },
  ];

  const stats = [
    { number: "5000+", label: "Projects Completed" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "100+", label: "Expert Writers" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About WritingEra | Founder & CEO M. Arslan Asif"
        description="Learn about WritingEra, founded by CEO M. Arslan Asif, and explore our academic, research, business, editing, and content writing support for global clients."
        path="/about"
        image="/about-writingera-global-services.webp"
        schema={[
          organizationSchema,
          founderPersonSchema,
          webpageSchema({
            title: "About WritingEra | Founder & CEO M. Arslan Asif",
            description:
              "Learn about WritingEra, founded by CEO M. Arslan Asif, and explore academic, research, business, editing, and content writing support for global clients.",
            url: "https://www.writingera.com/about",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://www.writingera.com" },
            { name: "About", url: "https://www.writingera.com/about" },
          ]),
        ]}
      />

      <Navigation />

      <main>
        <section className="relative bg-gradient-hero text-primary-foreground py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src={aboutHeroImage} alt="About WritingEra and founder M. Arslan Asif" className="w-full h-full object-cover" loading="eager" />
          </div>
          <div className="absolute inset-0 bg-black/60" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg">About WritingEra</Badge>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)" }}>
              Writing support built for real deadlines and real client needs
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white mb-8 font-medium" style={{ textShadow: "0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)" }}>
              WritingEra helps students, researchers, professionals, and businesses move from vague requirements to clearer, stronger final submissions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg">
                  <div className="font-heading font-bold text-3xl md:text-4xl text-secondary mb-2">{stat.number}</div>
                  <div className="text-sm text-white font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Founder Story</Badge>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Meet CEO M. Arslan Asif</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  WritingEra was built to solve a practical problem: many students and professionals know they need help, but they do not always know where to start or how to improve the quality of their final work.
                </p>
                <p>
                  Founder and CEO M. Arslan Asif started WritingEra with a focus on academic quality, clear service paths, and dependable support for real deadlines. The goal was never to create vague service claims. The goal was to build a writing platform where clients can quickly move from homepage to the exact page that matches their assignment, research brief, business document, or career requirement.
                </p>
                <p>
                  Today, WritingEra supports clients across the UK, the USA, the UAE, Europe, and worldwide through academic writing, editing, research support, business writing, and content services.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-square md:aspect-[4/5]">
              <img src={founderImage} alt="CEO M. Arslan Asif, founder of WritingEra" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To deliver dependable writing support that improves structure, clarity, academic presentation, and decision-making for students, professionals, and businesses.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-accent/20">
                <CardHeader>
                  <Zap className="h-12 w-12 text-accent mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To become a trusted global writing partner for academic work, research, editing, business documents, and practical client support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Why WritingEra</Badge>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">What clients rely on most</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              WritingEra combines research support, editing standards, service clarity, and deadline awareness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: BookOpen, title: "Expert Writers", desc: "Specialist writers for assignments, essays, reports, dissertations, business documents, and content writing." },
              { icon: CheckCircle, title: "Original Work", desc: "Research-based, structured, and plagiarism-aware writing with revision support where needed." },
              { icon: Globe, title: "Global Client Base", desc: "Support for clients in the UK, USA, UAE, Europe, and international markets." },
              { icon: Clock, title: "Urgent to Long-Term", desc: "Short deadlines, standard briefs, and extended research projects can all be handled with clear planning." },
              { icon: Shield, title: "Better Process", desc: "Clear communication, stronger briefs, and more practical next steps from inquiry to final submission." },
              { icon: TrendingUp, title: "Stronger Outcomes", desc: "Clients usually come for clarity, polishing, better structure, and submission-ready work." },
            ].map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Ready to work with WritingEra?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore service pages, compare categories, or go directly to the order form if your brief is ready.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg"><Link to="/services">Browse Services</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/order">Start an Order</Link></Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
