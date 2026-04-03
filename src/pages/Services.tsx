import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, categories } from "@/data/servicesData";
import { getServiceKeywords } from "@/utils/serviceContent";
import servicesHeroImage from "@/assets/services-hero-new.jpg";
import { useCurrency } from "@/contexts/CurrencyContext";
import SEO from "@/components/SEO";
import { webpageSchema } from "@/utils/structuredData";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("Academic Writing");
  const { convertPrice, convertPriceRange, convertPerWordPrice } = useCurrency();

  const filteredServices = services.filter(
    (service) => service.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Writing Services | WritingEra"
        description="Explore WritingEra writing services for assignment writing, essay help, research papers, dissertations, reports, proofreading, resumes, and business documents across multiple categories."
        path="/services"
        keywords={["writing services", "assignment writing service", "assignment help", "essay writing service", "essay help", "research paper writing", "dissertation writing service", "report writing service", "proofreading services", "business writing services", "resume writing service", "editing services"]}
        schema={webpageSchema({ title: "Writing Services | WritingEra", description: "Explore WritingEra writing services for assignments, essays, research papers, dissertations, reports, proofreading, business plans, resumes, and more across multiple categories.", url: "https://www.writingera.com/services" })}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img 
            src={servicesHeroImage} 
            alt="Professional Writing Services" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white animate-fade-in-up" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>
            Comprehensive Writing Solutions
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white font-medium" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)' }}>
            Explore 59 writing and editing solutions across academic, business, admissions, research, and content categories. Popular requests include assignment writing service, essay help, research paper writing, dissertation support, report writing, proofreading, and resume writing.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
            {["100% Original", "On-Time Delivery", "24/7 Support", "Money-Back Guarantee"].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-success-light rounded-full shadow-sm" />
                <span className="font-semibold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
            {/* Category Tabs */}
            <TabsList className="w-full h-auto flex-wrap justify-center gap-2 bg-muted/50 p-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Services Grid */}
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="mb-6">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
                    {category} Services
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredServices.length} professional services available in this category
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service, index) => (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.id}`}
                      className="block h-full"
                    >
                      <Card
                        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-gradient-card animate-fade-in overflow-hidden cursor-pointer h-full flex flex-col"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                      {/* Service Image */}
                      {service.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <Badge className="absolute top-3 right-3 bg-success/90 backdrop-blur-sm text-white border-success/20 text-xs shadow-lg">
                            FREE Turnitin
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                            <service.icon className="h-8 w-8 text-primary" />
                          </div>
                          {!service.image && (
                            <Badge className="bg-success/10 text-success border-success/20 text-xs">
                              FREE Turnitin
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground line-clamp-3">
                          {service.description}
                        </p>

                        {service.attributes && service.attributes.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {service.attributes.slice(0, 3).map((attr, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {attr}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 border-t border-border space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                            <p className="font-heading font-bold text-2xl text-primary">
                              {convertPrice(service.pricing?.basePkr || 4200)}
                            </p>
                            <p className="text-xs text-muted-foreground">{convertPriceRange(service.priceRange)}</p>
                          </div>
                          <div className="pt-2 border-t border-border/50">
                            <p className="text-sm font-semibold text-accent">{convertPerWordPrice()}</p>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2 mt-auto">
                        <Button
                          variant="outline"
                          className="flex-1 hover:bg-primary hover:text-primary-foreground"
                        >
                          Learn More
                        </Button>
                        <Button
                          asChild
                          className="flex-1 bg-secondary hover:bg-secondary-light"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <Link to="/contact">Order Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>


      <section className="py-16 border-t border-border/60">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-heading font-bold text-3xl text-foreground">Choose the right service for your brief, level, and deadline</h2>
            <p className="text-muted-foreground leading-relaxed">
              This page is built to help you compare services quickly instead of guessing which category fits your requirement. You can browse assignment writing support for coursework and university tasks, essay writing for structured academic arguments, research paper writing for source-based projects, report writing for formal submissions, and proofreading for final draft improvement.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If your main requirement is <strong>assignment writing service</strong>, begin with our <Link to="/services/assignment-writing" className="text-primary underline underline-offset-4">Assignment Writing Service</Link> page. For related needs, explore <Link to="/services/essay-writing" className="text-primary underline underline-offset-4">Essay Writing Service</Link>, <Link to="/services/research-paper" className="text-primary underline underline-offset-4">Research Paper Writing</Link>, <Link to="/services/report-writing" className="text-primary underline underline-offset-4">Academic Report Writing</Link>, and <Link to="/services/dissertation-writing" className="text-primary underline underline-offset-4">Dissertation Writing</Link>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We also support resumes, cover letters, SOP writing, website content, SEO content writing, technical documentation, business plans, and editing services for clients who need professional documents beyond academic work.
            </p>
          </div>
          <Card>
            <CardHeader>
              <h3 className="font-heading font-semibold text-2xl">Popular search topics</h3>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {Array.from(new Set(services.flatMap((service) => getServiceKeywords(service)).slice(0, 24))).map((keyword) => (
                <Badge key={keyword} variant="secondary">{keyword}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Which page should I visit for assignment writing help?",
                a: "Use the Assignment Writing Service page for coursework, university tasks, reports, and deadline-based submissions. It is the main commercial page for assignment-writing intent.",
              },
              {
                q: "Do all service pages include pricing and deliverables?",
                a: "Yes. We have strengthened service pages with clearer overviews, included features, FAQs, and internal links so visitors can compare services faster.",
              },
              {
                q: "Can I order a custom brief instead of a standard package?",
                a: "Yes. If your requirement does not fit a listed category, use the contact or order page and share your instructions for a custom quote.",
              },
              {
                q: "Which services are most popular for students?",
                a: "Students most often choose assignment writing, essay writing, research paper writing, report writing, dissertation help, thesis help, editing, and proofreading depending on the stage of their work.",
              },
            ].map((item) => (
              <Card key={item.q}>
                <CardHeader>
                  <h3 className="font-semibold text-xl">{item.q}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We offer custom writing solutions for unique requirements. Contact us to discuss your specific needs.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
            <Link to="/contact">Get a Custom Quote</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
