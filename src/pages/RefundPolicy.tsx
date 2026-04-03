import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Refund Policy - WritingEra</title>
        <meta name="description" content="WritingEra's refund policy and money-back guarantee." />
      </Helmet>
      <Navigation />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading font-bold text-4xl mb-6">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: October 28, 2024</p>
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">100% Money-Back Guarantee</h2>
              <p>WritingEra is committed to delivering exceptional quality. If we fail to meet your expectations, we offer full or partial refunds under qualifying conditions.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Full Refund Eligibility</h2>
              <ul className="list-disc pl-6">
                <li><strong>Late Delivery:</strong> 100% refund if work delivered after agreed deadline without prior notice</li>
                <li><strong>Plagiarism:</strong> Full refund if plagiarism detected in original delivery (before revisions)</li>
                <li><strong>Wrong Service:</strong> 100% refund if delivered work doesn't match ordered service</li>
                <li><strong>Non-Delivery:</strong> Full refund if work not delivered and no communication from our end</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Partial Refund Conditions</h2>
              <ul className="list-disc pl-6">
                <li>Work quality doesn't meet specified requirements (50-70% refund after review)</li>
                <li>Minor errors not fixed within revision period (30-50% refund)</li>
                <li>Formatting issues not corrected (20-40% refund)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Non-Refundable Situations</h2>
              <ul className="list-disc pl-6">
                <li>After client approves and accepts final delivery</li>
                <li>Change of mind after work has started</li>
                <li>After 14 days from delivery date</li>
                <li>If original requirements were unclear or changed mid-project</li>
                <li>Grading dissatisfaction (we cannot control academic evaluation)</li>
              </ul>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Refund Process</h2>
              <p>To request a refund, email windwalker125official@gmail.com with order details and reason. Refunds processed within 5-7 business days to original payment method.</p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-2xl mb-3">Contact for Refunds</h2>
              <p>Email: windwalker125official@gmail.com | Phone: +92 323-4827157 | Response within 24 hours</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
