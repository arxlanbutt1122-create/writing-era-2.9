import { CheckCircle, FileText, Clock, Headphones, DollarSign, Shield } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { icon: FileText, text: "100% Original Content" },
    { icon: CheckCircle, text: "Free Turnitin Report" },
    { icon: Clock, text: "On-Time Delivery" },
    { icon: Headphones, text: "24/7 Support" },
    { icon: DollarSign, text: "Affordable Pricing" },
    { icon: Shield, text: "Money-Back Guarantee" },
  ];

  return (
    <section className="py-8 bg-muted border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 bg-success/10 rounded-full">
                <badge.icon className="h-6 w-6 text-success" />
              </div>
              <p className="text-sm font-medium text-foreground">{badge.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
