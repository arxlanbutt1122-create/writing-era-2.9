import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import essayImage from "@/assets/services/featured-essay.jpg";
import researchImage from "@/assets/services/featured-research.jpg";
import thesisImage from "@/assets/services/featured-thesis.jpg";
import businessImage from "@/assets/services/featured-business.jpg";
import contentImage from "@/assets/services/featured-content.jpg";
import editingImage from "@/assets/services/featured-editing.jpg";

const FeaturedServices = () => {
  const { convertPrice, convertPerWordPrice } = useCurrency();

  const services = [
    {
      image: essayImage,
      title: "Essay Writing",
      description: "A+ quality, plagiarism-free essays for all academic levels with proper citations.",
      basePkr: 4200, // $15 * 280
      suffix: "/page",
      link: "/services/essay-writing",
    },
    {
      image: researchImage,
      title: "Research Papers",
      description: "In-depth research papers with literature review, methodology, and analysis.",
      basePkr: 5600, // $20 * 280
      suffix: "/page",
      link: "/services/research-paper",
    },
    {
      image: thesisImage,
      title: "Thesis Writing",
      description: "Expert thesis support for Masters and PhD with chapter-by-chapter assistance.",
      basePkr: 42000, // $150 * 280
      suffix: "/chapter",
      link: "/services/thesis-writing",
    },
    {
      image: businessImage,
      title: "Business Plans",
      description: "Investor-ready business plans with market analysis and financial projections.",
      basePkr: 56000, // $200 * 280
      suffix: "",
      link: "/services/business-plan",
    },
    {
      image: contentImage,
      title: "Content Writing",
      description: "SEO-optimized blog posts, articles, and website content that ranks.",
      basePkr: 2800, // $10 * 280
      suffix: "/500 words",
      link: "/services/content-writing",
    },
    {
      image: editingImage,
      title: "Editing & Proofreading",
      description: "Professional editing for grammar, structure, and academic style.",
      basePkr: 2240, // $8 * 280
      suffix: "/page",
      link: "/services/editing",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Our Popular Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of professional writing services, all backed by our quality guarantee
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="block">
              <Card 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border overflow-hidden animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-success/90 text-white border-none text-xs">
                    FREE Turnitin
                  </Badge>
                </div>
              <CardHeader>
                <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="space-y-1">
                  <p className="font-semibold text-primary text-lg">
                    From {convertPrice(service.basePkr)}{service.suffix}
                  </p>
                  <p className="text-sm text-accent font-medium">
                    or {convertPerWordPrice()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1 hover:bg-primary hover:text-primary-foreground">
                  Learn More
                </Button>
                <Button asChild className="flex-1 bg-secondary hover:bg-secondary-light">
                  <Link to="/contact" onClick={(e) => e.stopPropagation()}>Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="font-semibold">
            <Link to="/services">
              View All 45+ Services →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
