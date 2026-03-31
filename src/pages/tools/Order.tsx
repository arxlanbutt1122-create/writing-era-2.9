import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { services } from "@/data/servicesData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, Upload, CreditCard, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const Order = () => {
  const { serviceId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const service = serviceId ? services.find(s => s.id === serviceId) : null;
  const preselectedVariation = searchParams.get("variation");

  const [formData, setFormData] = useState({
    service: serviceId || "",
    variation: preselectedVariation || "",
    academicLevel: "",
    pages: "",
    deadline: "",
    instructions: "",
    name: "",
    email: "",
    phone: "",
    paymentMethod: "paypal",
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to proceed",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send to a backend
    toast({
      title: "Order Submitted!",
      description: "We'll contact you shortly with payment details and confirmation.",
    });

    // Redirect to WhatsApp as an alternative
    const whatsappMessage = `Hi, I'd like to order: ${service?.title || "a service"}%0A%0ADetails:%0A- Academic Level: ${formData.academicLevel}%0A- Pages: ${formData.pages}%0A- Deadline: ${formData.deadline}%0A- Email: ${formData.email}`;
    window.open(`https://wa.me/923234827157?text=${whatsappMessage}`, '_blank');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">      <SEO
        title={service ? `Order ${service.title} | WritingEra` : "Place an Order | WritingEra"}
        description={service ? `Start your ${service.title.toLowerCase()} order with WritingEra. Share your deadline, instructions, and requirements to get started.` : "Place your writing order with WritingEra and share your project requirements, deadline, and instructions."}
        path={service ? `/order/${service.id}` : "/order"}
      />
      
      <Navigation />
      
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="font-heading font-bold text-4xl mb-2 text-center">
            {service ? `Order ${service.title}` : "Place Your Order"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Fill in the details below and we'll get started on your project
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Service Details */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                    <CardDescription>Tell us what you need</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!serviceId && (
                      <div>
                        <Label htmlFor="service">Select Service *</Label>
                        <Select 
                          value={formData.service} 
                          onValueChange={(value) => handleInputChange("service", value)}
                          required
                        >
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {service?.variations && (
                      <div>
                        <Label htmlFor="variation">Service Variation</Label>
                        <Select 
                          value={formData.variation}
                          onValueChange={(value) => handleInputChange("variation", value)}
                        >
                          <SelectTrigger id="variation">
                            <SelectValue placeholder="Select variation" />
                          </SelectTrigger>
                          <SelectContent>
                            {service.variations.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="academicLevel">Academic Level *</Label>
                      <Select 
                        value={formData.academicLevel}
                        onValueChange={(value) => handleInputChange("academicLevel", value)}
                        required
                      >
                        <SelectTrigger id="academicLevel">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="undergraduate">Undergraduate</SelectItem>
                          <SelectItem value="masters">Master's</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="pages">Number of Pages *</Label>
                      <Input 
                        id="pages"
                        type="number" 
                        placeholder="e.g., 5"
                        value={formData.pages}
                        onChange={(e) => handleInputChange("pages", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="deadline">Deadline *</Label>
                      <Input 
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => handleInputChange("deadline", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="instructions">Special Instructions</Label>
                      <Textarea 
                        id="instructions"
                        placeholder="Provide any specific requirements, formatting preferences, or additional details..."
                        value={formData.instructions}
                        onChange={(e) => handleInputChange("instructions", e.target.value)}
                        className="min-h-[150px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="files" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Files (Optional)
                      </Label>
                      <Input id="files" type="file" multiple className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can upload related materials, instructions, or source files
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>How can we reach you?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        placeholder="+92 3XX XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Choose your preferred payment option</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          PayPal / Credit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          Bank Transfer (Pakistan)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer">
                          WhatsApp Payment Coordination
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Terms */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        I agree to the{" "}
                        <a href="/terms" className="text-primary hover:underline" target="_blank">
                          Terms & Conditions
                        </a>
                        {" "}and{" "}
                        <a href="/refund-policy" className="text-primary hover:underline" target="_blank">
                          Refund Policy
                        </a>
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90">
                  Place Order Now
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-semibold">{service.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price Range</p>
                        <p className="text-lg font-bold text-primary">{service.priceRange}</p>
                      </div>
                    </>
                  )}

                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 text-success">
                      <ShieldCheck className="h-5 w-5" />
                      <span className="font-semibold text-sm">FREE Turnitin Report</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>100% Original Content</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>On-Time Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Unlimited Revisions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Money-Back Guarantee</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Need help?</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('https://wa.me/923234827157', '_blank')}
                    >
                      Chat on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Order;
