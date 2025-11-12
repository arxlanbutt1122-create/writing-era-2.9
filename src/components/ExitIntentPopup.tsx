import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Gift, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const hasShown = localStorage.getItem('exitIntentShown');
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen) {
        setIsOpen(true);
        localStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Only on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Discount Claimed!",
      description: "Check your email for the discount code FIRST10",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Wait! Before You Go...
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Get <span className="text-primary font-bold text-xl">10% OFF</span> Your First Order
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="bg-secondary/10 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-1">Use discount code:</p>
            <p className="text-2xl font-bold text-primary">FIRST10</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-success/10 p-3 rounded-lg border border-success/20">
            <ShieldCheck className="h-5 w-5 text-success flex-shrink-0" />
            <span className="text-success font-semibold">Plus FREE Turnitin Report with every order</span>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Claim My Discount
          </Button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            No thanks, I don't want to save money
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
