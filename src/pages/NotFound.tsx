import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="404 Page Not Found | WritingEra"
        description="The page you requested could not be found. Return to the homepage, services, blog, or contact page."
        path={location.pathname}
        noindex
      />
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center">
          <p className="text-primary font-semibold mb-3">404</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">This page could not be found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The link may be outdated, moved, or typed incorrectly. Use the options below to get back to the most useful pages on WritingEra.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button asChild><Link to="/">Home</Link></Button>
            <Button asChild variant="outline"><Link to="/services">Services</Link></Button>
            <Button asChild variant="outline"><Link to="/blog">Blog</Link></Button>
            <Button asChild variant="outline"><Link to="/contact">Contact</Link></Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <Link to="/services/assignment-writing" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h2 className="font-semibold mb-2">Assignment Writing Service</h2>
              <p className="text-sm text-muted-foreground">Open a core service page for coursework, reports, and deadline-driven academic work.</p>
            </Link>
            <Link to="/services/research-paper" className="rounded-lg border border-border p-5 hover:border-primary hover:shadow-md transition-all">
              <h2 className="font-semibold mb-2">Research Paper Writing</h2>
              <p className="text-sm text-muted-foreground">Move to research support, source-based writing, and structured academic work.</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
