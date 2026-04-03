import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import assignmentImage from "@/assets/services/assignment-writing.jpg";
import essayImage from "@/assets/services/featured-essay.jpg";
import researchImage from "@/assets/services/featured-research.jpg";
import dissertationImage from "@/assets/services/dissertation-writing.jpg";
import websiteContentImage from "@/assets/services/website-content.jpg";
import editingImage from "@/assets/services/academic-edit.jpg";

const FeaturedServices = () => {
  const { convertPrice, convertPerWordPrice } = useCurrency();

  const services = [
    {
      image: assignmentImage,
      title: "Assignment Writing Service",
      description: "Structured help for university assignments, coursework, reports, and urgent academic tasks.",
      basePkr: 2800,
      suffix: "/task",
      link: "/services/assignment-writing",
    },
    {
      image: essayImage,
      title: "Essay Writing Service",
      description: "Plagiarism-free essays for reflective, argumentative, analytical, and comparative briefs.",
      basePkr: 4200,
      suffix: "/page",
      link: "/services/essay-writing",
    },
    {
      image: researchImage,
      title: "Research Paper Writing",
      description: "Evidence-based papers with source evaluation, structure, citations, and academic formatting.",
      basePkr: 5600,
      suffix: "/page",
      link: "/services/research-paper",
    },
    {
      image: dissertationImage,
      title: "Dissertation Writing",
      description: "Chapter-level dissertation support for proposals, reviews, methodology, analysis, and discussion.",
      basePkr: 56000,
      suffix: "/chapter",
      link: "/services/dissertation-writing",
    },
    {
      image: websiteContentImage,
      title: "Website Content",
      description: "Commercial web copy for service pages, landing pages, and trust-building business websites.",
      basePkr: 28000,
      suffix: "/page",
      link: "/services/website-content",
    },
    {
      image: editingImage,
      title: "Academic Editing",
      description: "Editing and polishing for essays, reports, dissertations, and research drafts before submission.",
      basePkr: 4200,
      suffix: "/page",
      link: "/services/academic-editing",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            Popular starting points
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Services clients request most often
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Start with the page that fits your brief. These are some of the most requested services for academic work,
            research-led projects, final-draft editing, and commercial writing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
              </div>
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="w-fit border-primary/30 text-primary">
                  FREE Turnitin
                </Badge>
                <h3 className="text-xl font-semibold text-foreground leading-snug">{service.title}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">From {convertPrice(service.basePkr)}</span> {service.suffix}
                  <div>or {convertPerWordPrice()}</div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={service.link}>Learn More</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to={`/order${service.link.replace("/services", "")}`}>Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
