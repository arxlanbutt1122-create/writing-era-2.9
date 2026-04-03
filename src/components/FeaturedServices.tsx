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
      basePkr: 4200,
      suffix: "/page",
      link: "/services/essay-writing",
    },
    {
      image: researchImage,
      title: "Research Papers",
      description: "In-depth research papers with literature review, methodology, and analysis.",
      basePkr: 5600,
      suffix: "/page",
      link: "/services/research-paper",
    },
    {
      image: thesisImage,
      title: "Thesis Writing",
      description: "Expert thesis support for Masters and PhD with chapter-by-chapter assistance.",
      basePkr: 42000,
      suffix: "/chapter",
      link: "/services/thesis-writing",
    },
    {
      image: businessImage,
      title: "Business Plans",
      description: "Investor-ready business plans with market analysis and financial projections.",
      basePkr: 56000,
      suffix: "",
      link: "/services/business-plan",
    },
    {
      image: contentImage,
      title: "Website Content",
      description: "Website pages and business content written to explain your services clearly and professionally.",
      basePkr: 2800,
      suffix: "/500 words",
      link: "/services/website-content",
    },
    {
      image: editingImage,
      title: "Proofreading & Editing",
      description: "Professional proofreading and academic editing for grammar, clarity, structure, and presentation.",
      basePkr: 2240,
      suffix: "/page",
      link: "/services/proofreading",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">Popular choices</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Popular Services</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            Explore some of the most requested writing and editing services on WritingEra,
            from academic work and research support to business planning and content writing.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="group flex h-full flex-col overflow-hidden border-primary/10 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <Link to={service.link} className="block overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </Link>

              <CardHeader className="pb-3">
                <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/10">FREE Turnitin</Badge>
                <h3 className="mt-3 text-xl font-semibold">{service.title}</h3>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
                <div className="mt-5 space-y-1">
                  <p className="text-sm font-medium">From {convertPrice(service.basePkr)}{service.suffix}</p>
                  <p className="text-sm text-muted-foreground">or {convertPerWordPrice()}</p>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3 pt-0">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={service.link}>Learn More</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/order">Order Now</Link>
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
