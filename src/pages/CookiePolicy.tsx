import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cookie Policy - WritingEra</title>
        <meta name="description" content="How WritingEra uses cookies and tracking technologies." />
      </Helmet>
      <Navigation />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading font-bold text-4xl mb-6">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: October 28, 2024</p>
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">What Are Cookies?</h2>
              <p>Cookies are small text files placed on your device when you visit WritingEra.com. They help us improve your experience, remember your preferences, and analyze site usage.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6">
                <li><strong>Essential Cookies:</strong> Required for website functionality (login, navigation, security). Cannot be disabled.</li>
                <li><strong>Performance Cookies:</strong> Track page visits, traffic sources, and errors to improve site performance.</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences like currency selection (USD/PKR) and language settings.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google Analytics).</li>
                <li><strong>Marketing Cookies:</strong> Used for targeted advertising (only with consent).</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Third-Party Cookies</h2>
              <p>We use Google Analytics, PayPal, and social media plugins that may set their own cookies. Refer to their privacy policies for details.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Managing & Disabling Cookies</h2>
              <p>You can control cookies through your browser settings. Note that disabling cookies may affect website functionality. Most browsers allow you to block or delete cookies. Consult your browser's help section for instructions.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Contact Us</h2>
              <p>Questions about our cookie policy? Email: windwalker125official@gmail.com | Phone: +92 323-4827157</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
