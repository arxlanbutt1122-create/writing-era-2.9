import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import { ArrowRight } from "lucide-react";
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
    <section className="bg-background py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
            Popular services
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Start from the pages clients open most often
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            These service cards point directly to high-intent pages so visitors can move from the homepage to the exact
            service they need without extra clicks.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.link} className="group overflow-hidden border-primary/10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Link to={service.link} className="block overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </Link>

              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">FREE Turnitin</Badge>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Direct service page</span>
                </div>

                <Link to={service.link} className="group/title inline-flex items-center gap-2 text-2xl font-semibold leading-tight text-foreground transition hover:text-primary">
                  <span>{service.title}</span>
                  <ArrowRight className="h-5 w-5 transition group-hover/title:translate-x-1" />
                </Link>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
                <div className="rounded-2xl bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {convertPrice(service.basePkr)} <span className="text-base font-medium text-muted-foreground">{service.suffix}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">or {convertPerWordPrice()}</p>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button asChild className="flex-1">
                  <Link to={service.link}>Learn More</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/order/${service.link.replace("/services/", "")}`}>Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
