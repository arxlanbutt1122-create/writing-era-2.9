import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!agreed) {
      toast.error("Please agree to our terms and conditions");
      return;
    }

    // Here you would typically send the email to your backend
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
    setAgreed(false);
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "hsl(var(--dark-bg))" }}>
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-semibold text-2xl mb-6 text-white">
              WritingEra
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Professional academic and business writing services trusted globally. Your success is our mission.
            </p>
            <a 
              href="mailto:windwalker125official@gmail.com" 
              className="text-white hover:text-primary transition-colors text-lg font-medium"
            >
              windwalker125official@gmail.com
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-white/70 hover:text-primary transition-colors">
                  Order Now
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-primary transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-white/70 hover:text-primary transition-colors">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Popular Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/essay-writing" className="text-white/70 hover:text-primary transition-colors">
                  Essay Writing
                </Link>
              </li>
              <li>
                <Link to="/services/research-paper" className="text-white/70 hover:text-primary transition-colors">
                  Research Paper
                </Link>
              </li>
              <li>
                <Link to="/services/thesis-writing" className="text-white/70 hover:text-primary transition-colors">
                  Thesis Writing
                </Link>
              </li>
              <li>
                <Link to="/services/dissertation-writing" className="text-white/70 hover:text-primary transition-colors">
                  Dissertation Writing
                </Link>
              </li>
              <li>
                <Link to="/services/assignment-writing" className="text-white/70 hover:text-primary transition-colors">
                  Assignment Help
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-primary transition-colors font-medium">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Office */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Our Office</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-white/70">Sant Nagar, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+923234827157" className="text-white/70 hover:text-primary transition-colors">
                  +92 323-4827157
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:windwalker125official@gmail.com" className="text-white/70 hover:text-primary transition-colors">
                  windwalker125official@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/70">24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-2xl p-8 mb-12" style={{ backgroundColor: "hsl(var(--dark-card))" }}>
          <div className="max-w-3xl mx-auto">
            <h3 className="font-heading font-semibold text-2xl mb-6 text-white text-center">
              Subscribe to Our Newsletter.
            </h3>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12"
              />
              <Button 
                type="submit"
                size="lg" 
                className="bg-primary hover:bg-primary-light text-white h-12 px-8"
              >
                Subscribe →
              </Button>
            </form>
            <div className="flex items-center gap-2 mt-4">
              <Checkbox 
                id="terms" 
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
              <label htmlFor="terms" className="text-sm text-white/70 cursor-pointer">
                Agree to our <Link to="/terms" className="text-primary hover:underline">Terms & Condition?</Link>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white/60 text-sm">
              © {currentYear} WritingEra. All rights reserved.
            </p>
            <p className="text-white/50 text-xs mt-1">
              Designed and Developed by CEO M. Arslan Asif
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://wa.me/923234827157" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center transition-colors border border-white/10 hover:border-primary"
            >
              <MessageCircle className="h-5 w-5 text-white" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center transition-colors border border-white/10 hover:border-primary"
            >
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center transition-colors border border-white/10 hover:border-primary"
            >
              <Twitter className="h-5 w-5 text-white" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center transition-colors border border-white/10 hover:border-primary"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/5 hover:bg-primary rounded-full flex items-center justify-center transition-colors border border-white/10 hover:border-primary"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm text-white/60">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
