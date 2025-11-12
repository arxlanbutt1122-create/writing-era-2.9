import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, categories } from "@/data/servicesData";
import servicesHeroImage from "@/assets/services-hero-new.jpg";
import { useCurrency } from "@/contexts/CurrencyContext";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("Academic Writing");
  const { convertPrice, convertPriceRange, convertPerWordPrice } = useCurrency();

  const filteredServices = services.filter(
    (service) => service.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background">
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
            Choose from 45+ professional writing services across 8 categories. All backed by our quality guarantee and FREE Turnitin report.
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
                    {filteredServices.length} professional services available
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
