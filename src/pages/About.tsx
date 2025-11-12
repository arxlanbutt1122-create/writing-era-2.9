import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, Shield, Clock, Users, CheckCircle, Target, 
  Heart, TrendingUp, Globe, Zap, BookOpen, Star 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import aboutHeroImage from "@/assets/about-hero-new.jpg";
import founderImage from "@/assets/founder-arslan.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "Every project undergoes rigorous quality checks to ensure A+ standards and academic excellence.",
    },
    {
      icon: Shield,
      title: "Academic Integrity",
      description: "100% original work with proper citations. We uphold the highest ethical standards in all our services.",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "We respect deadlines. On-time delivery guaranteed, even for urgent orders with tight timeframes.",
    },
    {
      icon: Heart,
      title: "Client Success Focus",
      description: "Your success is our mission. We're committed to helping you achieve your academic and career goals.",
    },
    {
      icon: CheckCircle,
      title: "Confidentiality Guaranteed",
      description: "Your privacy is sacred. All information and projects are handled with complete confidentiality.",
    },
    {
      icon: Target,
      title: "Transparent Communication",
      description: "Clear pricing, regular updates, and open communication throughout your project journey.",
    },
  ];

  const qualitySteps = [
    { step: "1", title: "Research", description: "In-depth research using credible sources" },
    { step: "2", title: "Writing", description: "Expert writers craft your content" },
    { step: "3", title: "Editing", description: "Professional editing for clarity" },
    { step: "4", title: "Quality Check", description: "Comprehensive quality assurance" },
    { step: "5", title: "Turnitin Scan", description: "Plagiarism check with FREE report" },
    { step: "6", title: "Delivery", description: "On-time delivery to you" },
  ];

  const stats = [
    { number: "5000+", label: "Projects Completed" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "100+", label: "Expert Writers" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About WritingEra - Expert Writing Services Founded by Arslan</title>
        <meta name="description" content="Learn about WritingEra's mission to provide quality academic and business writing services. Founded by Arslan, serving UK, UAE, USA, EU, and Pakistan with 5000+ successful projects." />
      </Helmet>
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-primary-foreground py-20 md:py-32 overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <img 
              src={aboutHeroImage} 
              alt="About WritingEra" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg">About WritingEra</Badge>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in-up text-white" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>
              Your Writing Success Partner
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white mb-8 font-medium" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)' }}>
              Trusted globally for academic and professional writing excellence. Founded by Arslan with a mission to help students and professionals achieve their goals.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg">
                  <div className="font-heading font-bold text-3xl md:text-4xl text-secondary mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{stat.number}</div>
                  <div className="text-sm text-white font-medium mt-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </section>

        {/* Founder's Story */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Our Story</Badge>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                  Meet Arslan - Founder & CEO
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    WritingEra was born from a simple yet powerful vision: to help students and professionals worldwide achieve their academic and career aspirations through quality writing services.
                  </p>
                  <p>
                    Founded by Arslan, a passionate advocate for educational excellence, WritingEra started as a small venture in Lahore, Pakistan. What began with helping a few local students has now grown into a global service trusted by thousands across UK, UAE, USA, EU, and Pakistan.
                  </p>
                  <p>
                    "I've always believed that everyone deserves access to professional writing support. Quality shouldn't be compromised by geographical or financial barriers," says Arslan.
                  </p>
                  <p>
                    Today, with 100+ expert writers and 5000+ successful projects, WritingEra continues to uphold its founding principles: quality, integrity, and client success above all else.
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-square md:aspect-[4/5]">
                <img 
                  src={founderImage} 
                  alt="Arslan - Founder & CEO of WritingEra" 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
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
                    To provide accessible, high-quality writing services that empower students and professionals to succeed in their academic and career endeavors. We believe in democratizing access to expert writing support, regardless of location or background.
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
                    To become the world's most trusted writing partner, recognized for exceptional quality, ethical practices, and transformative impact on our clients' success. We envision a future where geographical and financial barriers never limit access to professional writing excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose WritingEra */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Why WritingEra?</Badge>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, integrity, and client-first approach to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: BookOpen, title: "Expert PhD Writers", desc: "25+ PhD holders and 50+ Master's level experts across all academic fields" },
              { icon: CheckCircle, title: "100% Original Work", desc: "Every piece is written from scratch with FREE Turnitin plagiarism report" },
              { icon: Globe, title: "Global Reach", desc: "Serving clients in UK, UAE, USA, EU, Pakistan and 15+ countries worldwide" },
              { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock support and writers available for urgent deadlines" },
              { icon: Shield, title: "Money-Back Guarantee", desc: "Not satisfied? Full refund, no questions asked. Your satisfaction guaranteed" },
              { icon: TrendingUp, title: "98% Success Rate", desc: "5000+ projects delivered with 98% client satisfaction and repeat business" },
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
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

        {/* Our Core Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Values</Badge>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                The Principles We Live By
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide every project and interaction
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {values.map((value, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="bg-gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Assurance Process */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Quality Process</Badge>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Our 6-Step Quality Assurance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every project goes through our rigorous quality process
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {qualitySteps.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-gradient-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Meet Our Expert Writers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A diverse team of qualified professionals covering all academic disciplines
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="font-heading font-bold text-4xl text-primary mb-2">25+</div>
                  <p className="font-semibold mb-1">PhD Holders</p>
                  <p className="text-sm text-muted-foreground">Doctoral level experts</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="font-heading font-bold text-4xl text-primary mb-2">50+</div>
                  <p className="font-semibold mb-1">Master's Experts</p>
                  <p className="text-sm text-muted-foreground">Graduate level specialists</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="font-heading font-bold text-4xl text-primary mb-2">30+</div>
                  <p className="font-semibold mb-1">Industry Pros</p>
                  <p className="text-sm text-muted-foreground">Business professionals</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="font-heading font-bold text-4xl text-primary mb-2">All</div>
                  <p className="font-semibold mb-1">Majors Covered</p>
                  <p className="text-sm text-muted-foreground">Every subject area</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications & Guarantees */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Guarantees</Badge>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Your Satisfaction, Guaranteed
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: "100% Original Work", desc: "Every project written from scratch" },
              { icon: Shield, title: "Plagiarism-Free Promise", desc: "FREE Turnitin report with every order" },
              { icon: Clock, title: "On-Time Delivery", desc: "Never miss a deadline" },
              { icon: Star, title: "Unlimited Revisions", desc: "We work until you're satisfied" },
              { icon: Award, title: "Money-Back Guarantee", desc: "Full refund if not satisfied" },
              { icon: Heart, title: "Confidentiality Agreement", desc: "Your privacy is protected" },
            ].map((item, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Global Reach */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Serving Clients Globally
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Trusted by students and professionals from top universities and companies worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-2">🇬🇧 United Kingdom</Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-2">🇦🇪 UAE</Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-2">🇺🇸 United States</Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-2">🇪🇺 European Union</Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-2">🇵🇰 Pakistan</Badge>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 container mx-auto px-4">
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Ready to Work With Us?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied clients who trusted WritingEra for their success
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild className="bg-secondary hover:bg-secondary-light">
                  <Link to="/services">Explore Services</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
