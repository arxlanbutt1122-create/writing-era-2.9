import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import assignmentImage from "@/assets/services/assignment-writing-service-featured.webp";
import essayImage from "@/assets/services/essay-writing-service-featured.webp";
import researchImage from "@/assets/services/research-paper-writing-service-featured.webp";
import dissertationImage from "@/assets/services/dissertation-writing-service-featured.webp";
import websiteContentImage from "@/assets/services/website-content-writing-service-featured.webp";
import editingImage from "@/assets/services/academic-editing-service-featured.webp";

const FeaturedServices = () => {
  const { convertPrice, convertPerWordPrice } = useCurrency();

  const services = [
    {
      image: assignmentImage,
      title: "Assignment Writing Service",
      description:
        "Structured help for university assignments, coursework, reports, and urgent academic tasks.",
      basePkr: 2800,
      suffix: "/task",
      link: "/services/assignment-writing",
      orderLink: "/order/assignment-writing",
    },
    {
      image: essayImage,
      title: "Essay Writing Service",
      description:
        "Plagiarism-free essays for reflective, argumentative, analytical, and comparative briefs.",
      basePkr: 4200,
      suffix: "/page",
      link: "/services/essay-writing",
      orderLink: "/order/essay-writing",
    },
    {
      image: researchImage,
      title: "Research Paper Writing",
      description:
        "Evidence-based papers with source evaluation, structure, citations, and academic formatting.",
      basePkr: 5600,
      suffix: "/page",
      link: "/services/research-paper",
      orderLink: "/order/research-paper",
    },
    {
      image: dissertationImage,
      title: "Dissertation Writing",
      description:
        "Chapter-level dissertation support for proposals, reviews, methodology, analysis, and discussion.",
      basePkr: 56000,
      suffix: "/chapter",
      link: "/services/dissertation-writing",
      orderLink: "/order/dissertation-writing",
    },
    {
      image: websiteContentImage,
      title: "Website Content Writing",
      description:
        "Commercial web copy for service pages, landing pages, and trust-building business websites.",
      basePkr: 28000,
      suffix: "/page",
      link: "/services/website-content",
      orderLink: "/order/website-content",
    },
    {
      image: editingImage,
      title: "Academic Editing",
      description:
        "Editing and polishing for essays, reports, dissertations, and research drafts before submission.",
      basePkr: 4200,
      suffix: "/page",
      link: "/services/academic-editing",
      orderLink: "/order/academic-editing",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <Badge className="mb-4">Popular Starting Points</Badge>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Services clients request most often
          </h2>
          <p className="text-lg text-muted-foreground">
            Start from the service page that best matches your deadline, document type, and academic or
            business requirement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.link}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col"
            >
              <Link to={service.link} className="block overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>

              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <Badge className="bg-success/10 text-success border-success/20">FREE Turnitin</Badge>
                </div>
                <Link to={service.link} className="group-hover:text-primary transition-colors">
                  <h3 className="font-heading font-semibold text-xl text-foreground underline-offset-4 group-hover:underline">
                    {service.title}
                  </h3>
                </Link>
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                <p className="text-muted-foreground">{service.description}</p>
                <div className="pt-2 border-t border-border space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                    <p className="font-heading font-bold text-2xl text-primary">
                      {convertPrice(service.basePkr)}
                    </p>
                    <p className="text-xs text-muted-foreground">{service.suffix}</p>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-sm font-semibold text-accent">{convertPerWordPrice()}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="grid grid-cols-2 gap-3 mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link to={service.link}>Learn More</Link>
                </Button>
                <Button asChild className="w-full bg-secondary hover:bg-secondary-light">
                  <Link to={service.orderLink}>Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
