import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, categories } from "@/data/servicesData";
import servicesHeroImage from "@/assets/comprehensive-writing-services-hero.webp";
import { useCurrency } from "@/contexts/CurrencyContext";
import SEO from "@/components/SEO";
import { collectionPageSchema, breadcrumbSchema } from "@/utils/structuredData";

const categoryDescriptions: Record<string, string> = {
  "Academic Writing": "Assignments, essays, research papers, dissertations, reports, case studies, and coursework support.",
  "Business Writing": "Business plans, reports, proposals, white papers, feasibility studies, and market research.",
  "Creative Writing": "Stories, novels, poetry, scripts, and creative writing support for original projects.",
  "Content Writing": "Website content, SEO content, articles, newsletters, social content, and commercial copy.",
  "Technical Writing": "Documentation, manuals, SOPs, process guides, and structured technical communication.",
  "Editing & Proofreading": "Proofreading, academic editing, manuscript editing, and business document polishing.",
  "Marketing Writing": "Landing pages, ad copy, email campaigns, social strategy, and content marketing support.",
  "Other Services": "Career documents, translations, speeches, presentations, and specialist support services.",
};

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const validInitialCategory = initialCategory && categories.includes(initialCategory) ? initialCategory : "Academic Writing";

  const [activeCategory, setActiveCategory] = useState(validInitialCategory);
  const { convertPrice, convertPriceRange, convertPerWordPrice } = useCurrency();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredServices = useMemo(
    () => services.filter((service) => service.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchParams({ category });
  };

  const collectionSchema = collectionPageSchema({
    title: "Writing Services | WritingEra",
    description:
      "Browse academic writing, research support, editing, business writing, content writing, and career document services from WritingEra.",
    url: "https://www.writingera.com/services",
  });

  const servicesFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I choose the right WritingEra service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with the service that matches your document type, deadline, and academic or business requirement. You can compare categories on the services page and then open the dedicated service page for full details.",
        },
      },
      {
        "@type": "Question",
        name: "Can I order directly from a service page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Each service page includes direct order and contact routes, and the homepage also includes a quick WhatsApp order card for faster inquiries.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Writing Services | Assignment, Essay, Research & Business Support | WritingEra"
        description="Browse assignment writing, essay help, research papers, dissertations, proofreading, business writing, website content, and career document services from WritingEra."
        path="/services"
        schema={[
          collectionSchema,
          breadcrumbSchema([
            { name: "Home", url: "https://www.writingera.com" },
            { name: "Services", url: "https://www.writingera.com/services" },
          ]),
          servicesFaqSchema,
        ]}
      />

      <Navigation />

      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src={servicesHeroImage}
            alt="Browse WritingEra services for academic, business, editing, and content support"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)" }}
          >
            Writing services for academic, business, and career needs
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white font-medium"
            style={{ textShadow: "0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)" }}
          >
            Compare categories, open the exact page that matches your brief, and move from homepage visit to
            service page, quote, and order route with less guesswork.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
            {["100% Original", "On-Time Delivery", "24/7 Support", "FREE Turnitin Report"].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-success-light rounded-full shadow-sm" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-border/60">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-5">
          <h2 className="font-heading font-bold text-3xl md:text-4xl">Find the right category first, then open the right page</h2>
          <p className="text-lg text-muted-foreground leading-8">
            Some clients know they need{" "}
            <Link to="/services/assignment-writing" className="text-primary underline underline-offset-4 font-medium">
              assignment writing service
            </Link>
            , while others are choosing between{" "}
            <Link to="/services/essay-writing" className="text-primary underline underline-offset-4 font-medium">
              essay writing
            </Link>
            ,{" "}
            <Link to="/services/research-paper" className="text-primary underline underline-offset-4 font-medium">
              research paper writing
            </Link>
            , dissertation help, editing, or business writing. This page groups services by need so you can
            compare options before opening the most relevant service page.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="space-y-8">
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

            {categories.map((category) => {
              const currentServices = services.filter((service) => service.category === category);
              return (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="mb-6 space-y-2">
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                      {category} Services
                    </h2>
                    <p className="text-muted-foreground max-w-3xl">
                      {categoryDescriptions[category]} {currentServices.length} service options available in this category.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentServices.map((service, index) => (
                      <Card
                        key={service.id}
                        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-gradient-card overflow-hidden h-full flex flex-col"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {service.image && (
                          <Link to={`/services/${service.id}`} className="relative h-48 overflow-hidden block">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Badge className="absolute top-3 right-3 bg-success/90 backdrop-blur-sm text-white border-success/20 text-xs shadow-lg">
                              FREE Turnitin
                            </Badge>
                          </Link>
                        )}

                        <CardHeader>
                          <Link to={`/services/${service.id}`} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                            <h3 className="font-heading font-semibold text-xl text-foreground">{service.title}</h3>
                          </Link>
                        </CardHeader>

                        <CardContent className="space-y-4 flex-1">
                          <p className="text-muted-foreground line-clamp-3">{service.description}</p>

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

                        <CardFooter className="grid grid-cols-2 gap-2 mt-auto">
                          <Button asChild variant="outline" className="w-full"><Link to={`/services/${service.id}`}>Learn More</Link></Button>
                          <Button asChild className="w-full bg-secondary hover:bg-secondary-light">
                            <Link to={`/order/${service.id}`}>Order Now</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Need a custom requirement or a mixed brief?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            If your project combines academic writing, editing, research, presentation support, or career
            documents, contact WritingEra and share the full brief for a tailored quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
              <Link to="/contact">Get a Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/order">Open the Order Form</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
