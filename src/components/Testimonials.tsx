import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import sarahImage from "@/assets/testimonials/sarah-johnson.jpg";
import ahmedImage from "@/assets/testimonials/ahmed-al-mansoori.jpg";
import emilyImage from "@/assets/testimonials/emily-chen.jpg";
import hassanImage from "@/assets/testimonials/hassan-khan.jpg";
import jenniferImage from "@/assets/testimonials/jennifer-williams.jpg";
import fatimaImage from "@/assets/testimonials/fatima-abbas.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      title: "Co-Founder",
      rating: 5,
      text: "WritingEra saved my final semester! The thesis writing service was exceptional. My advisor praised the quality and depth of research. Highly recommend!",
      image: sarahImage,
    },
    {
      name: "Ahmed Al-Mansoori",
      location: "Dubai, UAE",
      title: "Co-Founder",
      rating: 5,
      text: "I needed a business plan for investors. The team delivered a professional, comprehensive plan that helped me secure funding. Worth every penny!",
      image: ahmedImage,
    },
    {
      name: "Emily Chen",
      location: "California, USA",
      title: "Co-Founder",
      rating: 5,
      text: "The research paper was delivered ahead of schedule with excellent quality. The FREE Turnitin report showed 0% plagiarism. Very impressed!",
      image: emilyImage,
    },
    {
      name: "Hassan Khan",
      location: "Lahore, Pakistan",
      title: "Co-Founder",
      rating: 5,
      text: "Used their essay writing service multiple times. Always on time, always original, always helpful. The customer support is fantastic!",
      image: hassanImage,
    },
    {
      name: "Jennifer Williams",
      location: "Manchester, UK",
      title: "Co-Founder",
      rating: 5,
      text: "Brilliant dissertation help! The writer understood my topic perfectly and provided excellent guidance. Got an A grade!",
      image: jenniferImage,
    },
    {
      name: "Fatima Abbas",
      location: "Karachi, Pakistan",
      title: "Co-Founder",
      rating: 5,
      text: "Professional, reliable, and affordable. WritingEra helped me with my coursework when I was overwhelmed. Thank you!",
      image: fatimaImage,
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--dark-bg))" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary"></div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">CLIENTS FEEDBACK</span>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
            Our Clients Share Their
            <br />
            <span className="relative inline-block">
              Success Stories.
              <span className="absolute bottom-0 left-0 w-full h-3 bg-primary/20 -z-10"></span>
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Don't just take our word for it - hear from satisfied students and professionals worldwide
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Card 
                      className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                      style={{ backgroundColor: "hsl(var(--dark-card))" }}
                    >
                      <CardContent className="p-8 flex flex-col h-full">
                        {/* Quote Icon */}
                        <Quote className="h-10 w-10 text-primary mb-6" />

                        {/* Rating */}
                        <div className="flex gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-white/90 mb-8 leading-relaxed flex-grow">
                          "{testimonial.text}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                          />
                          <div>
                            <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                            <p className="text-sm text-primary font-medium">{testimonial.title}</p>
                            <p className="text-sm text-white/60">{testimonial.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="static translate-y-0 bg-primary/10 hover:bg-primary text-white border-primary/30 hover:border-primary h-12 w-12">
                <ChevronLeft className="h-6 w-6" />
              </CarouselPrevious>
              <CarouselNext className="static translate-y-0 bg-primary/10 hover:bg-primary text-white border-primary/30 hover:border-primary h-12 w-12">
                <ChevronRight className="h-6 w-6" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
