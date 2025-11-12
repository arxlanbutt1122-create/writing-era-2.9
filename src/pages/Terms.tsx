import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms & Conditions - WritingEra</title>
        <meta name="description" content="Terms and conditions for using WritingEra's writing services." />
      </Helmet>
      <Navigation />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading font-bold text-4xl mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: October 28, 2024</p>
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">1. Acceptance of Terms</h2>
              <p>By accessing WritingEra.com and using our services, you agree to comply with these Terms and Conditions. If you disagree with any part, please discontinue use.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">2. Services Provided</h2>
              <p>WritingEra offers academic and professional writing services including essays, research papers, theses, dissertations, business plans, and content writing. All deliverables are for reference and research purposes only.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">3. Payment Terms</h2>
              <ul className="list-disc pl-6">
                <li>Full payment required before work begins</li>
                <li>Accepted methods: PayPal, credit cards, bank transfer (Pakistani clients)</li>
                <li>Prices quoted in USD and PKR</li>
                <li>No refunds after work approval unless specified in Refund Policy</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">4. Delivery & Revisions</h2>
              <ul className="list-disc pl-6">
                <li>Timely delivery guaranteed as per agreed deadline</li>
                <li>Unlimited FREE revisions within 14 days of delivery</li>
                <li>Revisions must align with original requirements</li>
                <li>Late delivery eligible for compensation/refund</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">5. Intellectual Property</h2>
              <p>Upon full payment, you receive full ownership and copyright of delivered work. We do not resell or redistribute your content.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">6. Confidentiality & Privacy</h2>
              <p>All client information, orders, and communications are strictly confidential. We do not share personal data with third parties without consent.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">7. Disclaimer</h2>
              <p>WritingEra provides model papers for research and reference. Clients are responsible for proper use and citation per their institution's guidelines.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">8. Contact Information</h2>
              <p>For questions or disputes: arslan@writingera.com | +92 323-4827157 | WhatsApp available 24/7</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
