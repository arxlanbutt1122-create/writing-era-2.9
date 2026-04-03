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
      description:
        "Structured help for university assignments, coursework, reports, and urgent academic tasks.",
      basePkr: 2800,
      suffix: "/task",
      link: "/services/assignment-writing",
    },
    {
      image: essayImage,
      title: "Essay Writing Service",
      description:
        "Plagiarism-free essays for reflective, argumentative, analytical, and comparative briefs.",
      basePkr: 4200,
      suffix: "/page",
      link: "/services/essay-writing",
    },
    {
      image: researchImage,
      title: "Research Paper Writing",
      description:
        "Evidence-based papers with source evaluation, structure, citations, and academic formatting.",
      basePkr: 5600,
      suffix: "/page",
      link: "/services/research-paper",
    },
    {
      image: dissertationImage,
      title: "Dissertation Writing",
      description:
        "Chapter-level dissertation support for proposals, reviews, methodology, analysis, and discussion.",
      basePkr: 56000,
      suffix: "/chapter",
      link: "/services/dissertation-writing",
    },
    {
      image: websiteContentImage,
      title: "Website Content",
      description:
        "Commercial web copy for service pages, landing pages, and trust-building business websites.",
      basePkr: 28000,
      suffix: "/page",
      link: "/services/website-content",
    },
    {
      image: editingImage,
      title: "Academic Editing",
      description:
        "Editing and polishing for essays, reports, dissertations, and research drafts before submission.",
      basePkr: 4200,
      suffix: "/page",
      link: "/services/academic-editing",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <Badge className="mb-4">Top categories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Popular Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            These featured cards now point to real service URLs that exist in your service data. That matters
            for internal linking, crawling, and user flow. The strongest homepage links should usually point to
            money pages such as assignment writing, essays, research papers, dissertation support, business
            writing, and editing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.link} className="overflow-hidden h-full flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge className="absolute top-3 left-3">FREE Turnitin</Badge>
              </div>

              <CardHeader>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </CardHeader>

              <CardContent className="space-y-3 flex-1">
                <p className="text-muted-foreground">{service.description}</p>
                <div className="text-sm text-muted-foreground">
                  From <span className="font-semibold text-foreground">{convertPrice(service.basePkr)}</span>
                  {service.suffix}
                </div>
                <div className="text-sm text-muted-foreground">or {convertPerWordPrice()}</div>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={service.link}>Learn More</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to={service.link}>Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link to="/services">View All Services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
