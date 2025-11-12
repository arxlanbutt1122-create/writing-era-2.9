import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - WritingEra</title>
        <meta name="description" content="WritingEra's privacy policy outlining how we collect, use, and protect your personal information." />
      </Helmet>
      
      <Navigation />
      
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">Last Updated: October 2024</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 text-foreground">1. Introduction</h2>
              <p className="text-foreground/80">
                At WritingEra, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and protect your data when you use our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 text-foreground">2. Information We Collect</h2>
              <h3 className="font-semibold text-xl mb-3 text-foreground">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Name and contact details (email, phone number)</li>
                <li>Academic information (institution, level of study)</li>
                <li>Payment information (processed securely through third-party processors)</li>
                <li>Order details and project requirements</li>
              </ul>

              <h3 className="font-semibold text-xl mb-3 mt-4 text-foreground">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>IP address and browser information</li>
                <li>Cookies and usage data</li>
                <li>Device information</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 text-foreground">3. How We Use Your Information</h2>
              <p className="text-foreground/80 mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your projects</li>
                <li>Improve our services and customer experience</li>
                <li>Send important updates and promotional offers (with your consent)</li>
                <li>Ensure quality control and customer satisfaction</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 text-foreground">4. Data Security</h2>
              <p className="text-foreground/80">
                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-3">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers with firewall protection</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access to personal information</li>
                <li>Confidentiality agreements with all staff members</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 text-foreground">5. Your Rights</h2>
              <p className="text-foreground/80 mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 text-foreground">6. Contact Us</h2>
              <p className="text-foreground/80">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-foreground"><strong>WritingEra</strong></p>
                <p className="text-foreground/80">Email: arslan@writingera.com</p>
                <p className="text-foreground/80">Phone: +92 323-4827157</p>
                <p className="text-foreground/80">Address: Sant Nagar, Lahore, Pakistan</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
