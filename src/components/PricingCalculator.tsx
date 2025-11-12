import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Calculator } from "lucide-react";

const PricingCalculator = () => {
  const { currency, convertPrice, USD_TO_PKR } = useCurrency();
  const [wordCount, setWordCount] = useState<number>(1000);
  const [academicLevel, setAcademicLevel] = useState<string>("undergraduate");
  const [urgency, setUrgency] = useState<string>("7-days");

  // Base rates per word in PKR
  const baseRatePerWord = 4;

  // Multipliers
  const levelMultipliers: Record<string, number> = {
    "high-school": 0.8,
    "undergraduate": 1.0,
    "masters": 1.3,
    "phd": 1.5,
  };

  const urgencyMultipliers: Record<string, number> = {
    "24-hours": 2.0,
    "48-hours": 1.7,
    "3-days": 1.4,
    "5-days": 1.2,
    "7-days": 1.0,
    "14-days": 0.9,
  };

  const calculatePrice = () => {
    const levelMultiplier = levelMultipliers[academicLevel] || 1.0;
    const urgencyMultiplier = urgencyMultipliers[urgency] || 1.0;
    const totalPkr = wordCount * baseRatePerWord * levelMultiplier * urgencyMultiplier;
    return Math.round(totalPkr);
  };

  const totalPriceInPkr = calculatePrice();
  const displayPrice = convertPrice(totalPriceInPkr);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="h-6 w-6 text-primary" />
          <CardTitle className="font-heading text-2xl">Pricing Calculator</CardTitle>
        </div>
        <CardDescription>
          Get an instant estimate for your writing project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Word Count */}
        <div className="space-y-2">
          <Label htmlFor="wordCount">Number of Words</Label>
          <Input
            id="wordCount"
            type="number"
            min="100"
            step="100"
            value={wordCount}
            onChange={(e) => setWordCount(parseInt(e.target.value) || 0)}
            placeholder="Enter word count"
          />
          <p className="text-xs text-muted-foreground">
            Typical page = 250-300 words
          </p>
        </div>

        {/* Academic Level */}
        <div className="space-y-2">
          <Label htmlFor="academicLevel">Academic Level</Label>
          <Select value={academicLevel} onValueChange={setAcademicLevel}>
            <SelectTrigger id="academicLevel">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="masters">Master's</SelectItem>
              <SelectItem value="phd">PhD/Doctoral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <Label htmlFor="urgency">Deadline</Label>
          <Select value={urgency} onValueChange={setUrgency}>
            <SelectTrigger id="urgency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24-hours">24 Hours (Express)</SelectItem>
              <SelectItem value="48-hours">48 Hours</SelectItem>
              <SelectItem value="3-days">3 Days</SelectItem>
              <SelectItem value="5-days">5 Days</SelectItem>
              <SelectItem value="7-days">7 Days</SelectItem>
              <SelectItem value="14-days">14+ Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Display */}
        <div className="mt-6 p-6 bg-gradient-primary rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Estimated Price</p>
              <p className="font-heading font-bold text-4xl">{displayPrice}</p>
              <p className="text-xs opacity-80 mt-2">
                Base rate: {currency === 'PKR' ? `PKR ${baseRatePerWord}/word` : `$${(baseRatePerWord / USD_TO_PKR).toFixed(3)}/word`}
              </p>
            </div>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <a href="/contact">Order Now</a>
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>✓ FREE Turnitin Report included</p>
          <p>✓ Unlimited revisions</p>
          <p>✓ 24/7 customer support</p>
          <p>✓ Money-back guarantee</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCalculator;
