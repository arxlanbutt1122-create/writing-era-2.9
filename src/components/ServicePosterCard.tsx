import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service } from "@/data/servicesData";
import { useCurrency } from "@/contexts/CurrencyContext";

interface ServicePosterCardProps {
  service: Service;
}

const ServicePosterCard = ({ service }: ServicePosterCardProps) => {
  const Icon = service.icon;
  const { convertPrice, convertPriceRange, convertPerWordPrice } = useCurrency();

  // Extract base PKR price for conversion
  const basePkrPrice = service.pricing?.basePkr || 4200; // Default: $15 * 280
  const displayPrice = convertPrice(basePkrPrice);
  const priceRange = convertPriceRange(service.priceRange);

  return (
    <Link to={`/services/${service.id}`} className="block h-full">
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-gradient-card overflow-hidden cursor-pointer h-full flex flex-col">
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
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          {!service.image && (
            <Badge className="bg-success/10 text-success border-success/20 text-xs">
              FREE Turnitin
            </Badge>
          )}
        </div>
        <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors mb-4">
          {service.title}
        </h3>
      </div>

      <div className="px-6 pb-6 space-y-4">
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
              {displayPrice}
            </p>
            <p className="text-xs text-muted-foreground">{priceRange}</p>
          </div>
          <div className="pt-2 border-t border-border/50">
            <p className="text-sm font-semibold text-accent">{convertPerWordPrice()}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex gap-2 mt-auto">
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
          <Link to={`/order/${service.id}`}>Order Now</Link>
        </Button>
      </div>
    </Card>
    </Link>
  );
};

export default ServicePosterCard;
