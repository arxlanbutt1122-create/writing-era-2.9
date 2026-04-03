import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mail, Phone, MapPin, MessageCircle, Clock, 
  Facebook, Twitter, Linkedin, Instagram, Send, Star 
} from "lucide-react";
import SEO from "@/components/SEO";
import { toast } from "@/hooks/use-toast";
import { webpageSchema } from "@/utils/structuredData";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `New Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/923234827157?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "We'll respond to your inquiry shortly!",
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. We appreciate it!",
    });
    setReviewForm({ name: "", email: "", rating: 5, comment: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  // Sample reviews
  const reviews = [
    {
      name: "Sarah Johnson",
      avatar: "/src/assets/testimonials/sarah-johnson.jpg",
      rating: 5,
      comment: "Excellent service! My essay was delivered on time and exceeded my expectations.",
      date: "2 days ago"
    },
    {
      name: "Ahmed Al-Mansoori",
      avatar: "/src/assets/testimonials/ahmed-al-mansoori.jpg",
      rating: 5,
      comment: "Professional writers and great customer support. Highly recommended!",
      date: "1 week ago"
    },
    {
      name: "Emily Chen",
      avatar: "/src/assets/testimonials/emily-chen.jpg",
      rating: 5,
      comment: "Got an A+ on my research paper. Will definitely use again!",
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">      <SEO
        title="Contact WritingEra"
        description="Contact WritingEra for custom quotes, order questions, deadlines, and support for academic and business writing projects."
        path="/contact"
        keywords={["contact writing service", "assignment help contact", "essay writing support", "research paper help", "dissertation help", "custom quote writing service"]}
        schema={webpageSchema({ title: "Contact WritingEra", description: "Contact WritingEra for custom quotes, order questions, deadlines, and support for academic and business writing projects.", url: "https://www.writingera.com/contact" })}
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/contact-hero-new.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Get in Touch
            </h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Have questions? Need a quote? We're here to help 24/7
            </p>
          </div>
        </div>
      </section>
      
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">

          {/* Split Layout: Form & Contact Info */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-12">
            {/* Left Column - Contact Form (60%) */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">Fill out the form and we'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="+92 300 1234567" 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service Needed</Label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select a service...</option>
                        <option value="Essay Writing">Essay Writing</option>
                        <option value="Research Paper">Research Paper</option>
                        <option value="Thesis Writing">Thesis Writing</option>
                        <option value="Dissertation">Dissertation</option>
                        <option value="Business Writing">Business Writing</option>
                        <option value="Content Writing">Content Writing</option>
                        <option value="Editing & Proofreading">Editing & Proofreading</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea 
                        id="message" 
                        rows={5} 
                        placeholder="Tell us about your project requirements..." 
                        value={formData.message}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary-light" size="lg">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                    
                    {/* WhatsApp Quick Action */}
                    <div className="text-center pt-4">
                      <p className="text-sm text-muted-foreground mb-3">Or reach us instantly on WhatsApp</p>
                      <Button 
                        type="button"
                        asChild 
                        size="lg" 
                        className="w-full bg-success hover:bg-success/90"
                      >
                        <a href="https://wa.me/923234827157?text=Hi! I need help with writing services" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-5 w-5" />
                          Chat on WhatsApp
                        </a>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Information (40%) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information Card */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-sm text-muted-foreground">Sant Nagar, Lahore, Pakistan</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a 
                        href="tel:+923234827157" 
                        className="text-sm text-primary hover:underline"
                      >
                        +92 323-4827157
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">Click to call</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a 
                        href="mailto:windwalker125official@gmail.com" 
                        className="text-sm text-primary hover:underline"
                      >
                        windwalker125official@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-success/10 rounded-lg flex-shrink-0">
                      <Clock className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">24/7 Support Available</p>
                      <p className="text-xs text-muted-foreground mt-1">We're always here for you</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-success/10 rounded-lg flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">WhatsApp</h3>
                      <Button asChild size="sm" className="bg-success hover:bg-success/90 w-full">
                        <a href="https://wa.me/923234827157" target="_blank" rel="noopener noreferrer">
                          Chat Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="text-xl">Follow Us</CardTitle>
                  <p className="text-sm text-muted-foreground">Stay connected on social media</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-3">
                    <a
                      href="https://facebook.com/writingera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6 text-primary" />
                    </a>
                    <a
                      href="https://twitter.com/writingera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-6 w-6 text-primary" />
                    </a>
                    <a
                      href="https://linkedin.com/company/writingera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-6 w-6 text-primary" />
                    </a>
                    <a
                      href="https://instagram.com/writingera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6 text-primary" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl mb-8 text-center">What Our Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {reviews.map((review, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leave a Review Form */}
            <Card>
              <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
                <p className="text-sm text-muted-foreground">Share your experience with WritingEra</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="review-name">Name *</Label>
                      <Input 
                        id="review-name" 
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="review-email">Email *</Label>
                      <Input 
                        id="review-email" 
                        type="email"
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, email: e.target.value }))}
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Rating *</Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`h-8 w-8 cursor-pointer transition-colors ${
                              star <= reviewForm.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="review-comment">Your Review *</Label>
                    <Textarea 
                      id="review-comment" 
                      rows={4}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Tell us about your experience..."
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps */}
          <div className="max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.534415833887!2d74.32444631512476!3d31.469619281385826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904fdf0000001%3A0x0!2sSant%20Nagar%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WritingEra Location"
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-4">
              Need immediate assistance? We're just a message away!
            </p>
            <Button 
              size="lg" 
              asChild
              className="bg-success hover:bg-success/90"
            >
              <a href="https://wa.me/923234827157?text=Hi! I need urgent help with writing services" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us Instantly
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
