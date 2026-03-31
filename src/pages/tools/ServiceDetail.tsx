import { useParams, useNavigate, Link } from "react-router-dom";
import { services } from "@/data/servicesData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, ShieldCheck, Target, Gift, DollarSign } from "lucide-react";
import SEO from "@/components/SEO";
import { useCurrency } from "@/contexts/CurrencyContext";
import { serviceSchema, breadcrumbSchema, faqSchema, webpageSchema } from "@/utils/structuredData";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { convertPrice, convertPerWordPrice } = useCurrency();
  
  const service = services.find(s => s.id === serviceId);

  const serviceFAQs = [
    {
      question: `What is included in the ${service?.title}?`,
      answer: service?.attributes?.join(', ') || 'All essential features are included.'
    },
    {
      question: "How long does it take to complete?",
      answer: "Delivery time varies based on complexity and urgency. Standard delivery is 5-7 days, with rush options available."
    },
    {
      question: "Do you provide revisions?",
      answer: "Yes! We offer unlimited FREE revisions until you're completely satisfied with the work."
    },
    {
      question: "Is the work plagiarism-free?",
      answer: "Absolutely! All work is 100% original and comes with a FREE Turnitin report for verification."
    }
  ];
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
            <Button onClick={() => navigate("/services")}>Back to Services</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const relatedServices = services
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">      <SEO
        title={`${service.title} | WritingEra`}
        description={service.metaDescription}
        path={`/services/${service.id}`}
        keywords={service.seoTags || []}
        schema={[
          webpageSchema({ title: `${service.title} | WritingEra`, description: service.metaDescription, url: `https://www.writingera.com/services/${service.id}` }),
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", url: "https://www.writingera.com" },
            { name: "Services", url: "https://www.writingera.com/services" },
            { name: service.title, url: `https://www.writingera.com/services/${service.id}` }
          ]),
          faqSchema(serviceFAQs)
        ]}
      />
      
      <Navigation />
      
      <main className="py-16 md:py-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-12">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/services")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-accent">{service.category}</Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {service.metaDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-primary/10 px-6 py-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-2xl font-bold text-primary">
                    {service.pricing?.basePkr ? convertPrice(service.pricing.basePkr) : service.price}
                  </p>
                </div>
                <div className="bg-accent/10 px-6 py-3 rounded-lg border border-accent/20">
                  <p className="text-sm text-muted-foreground">Per Word</p>
                  <p className="text-2xl font-bold text-accent">
                    {convertPerWordPrice()}
                  </p>
                </div>
                {service.pricing?.notes && (
                  <div className="bg-secondary/10 px-6 py-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Note</p>
                    <p className="text-sm font-semibold text-secondary">{service.pricing.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-success" />
                <span className="font-semibold text-success">FREE Turnitin Report Included</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => navigate(`/order/${service.id}`)}
                >
                  Order Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/contact")}
                >
                  Get Custom Quote
                </Button>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              {service.image ? (
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gradient-primary p-12 h-full flex items-center justify-center">
                  <Icon className="h-48 w-48 text-white" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="container mx-auto px-4 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Service Overview</CardTitle>
              <CardDescription>Complete details about this service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {service.explainedDescription && (
                <div>
                  <h3 className="font-semibold text-xl mb-4">Detailed Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.explainedDescription}</p>
                </div>
              )}

              {service.uses && service.uses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-xl">Perfect For:</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.uses.map((use, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="h-6 w-6 text-secondary" />
                    <h3 className="font-semibold text-xl">Why Choose This Service:</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {service.attributes && service.attributes.length > 0 && (
                <div>
                  <h3 className="font-semibold text-xl mb-4">What's Included:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.attributes.map((attr, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.pricing && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-xl">Pricing Details:</h3>
                  </div>
                  <div className="bg-gradient-card p-6 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">PKR Price:</span>
                      <span className="font-semibold text-lg">{service.pricing.pkr}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">USD Price:</span>
                      <span className="font-semibold text-lg">{service.pricing.usd}</span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Per Word Pricing:</span>
                        <span className="font-semibold text-lg text-accent">{convertPerWordPrice()}</span>
                      </div>
                    </div>
                    {service.pricing.notes && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground">{service.pricing.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Variations */}
        {service.variations && service.variations.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2 className="font-heading font-bold text-3xl mb-6">Available Options</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.variations.map((variation, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{variation}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/order/${service.id}?variation=${encodeURIComponent(variation)}`)}
                    >
                      Select This Option
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="font-heading font-bold text-3xl mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceFAQs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Order */}
        <section className="container mx-auto px-4 mb-16">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-2xl">How to Order This Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Fill Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    Tell us your specific needs and upload any materials
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Make payment through secure payment gateway
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Receive Quality Work</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your completed work with FREE Turnitin report
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <h2 className="font-heading font-bold text-3xl mb-6">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = relatedService.icon;
                return (
                  <Card key={relatedService.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <RelatedIcon className="h-10 w-10 text-primary mb-3" />
                      <CardTitle>{relatedService.title}</CardTitle>
                      <CardDescription>{relatedService.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold text-primary mb-3">
                        {relatedService.priceRange}
                      </p>
                      <Link to={`/services/${relatedService.id}`}>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="py-12 text-center">
              <h2 className="font-heading font-bold text-3xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Order now and receive your FREE Turnitin report with every order
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate(`/order/${service.id}`)}
                >
                  Order This Service
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => {
                    window.open(`https://wa.me/923234827157?text=I'm interested in ${service.title}`, '_blank');
                  }}
                >
                  WhatsApp Us
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

export default ServiceDetail;
