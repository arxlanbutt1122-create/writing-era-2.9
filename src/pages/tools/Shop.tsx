import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/servicesData";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";
import ServicePosterCard from "@/components/ServicePosterCard";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = ["all", ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        const priceA = a.pricing?.basePkr || 4200;
        const priceB = b.pricing?.basePkr || 4200;
        return priceA - priceB;
      } else if (sortBy === "price-high") {
        const priceA = a.pricing?.basePkr || 4200;
        const priceB = b.pricing?.basePkr || 4200;
        return priceB - priceA;
      } else if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0; // popular - keep original order
    });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shop All Services - WritingEra</title>
        <meta name="description" content="Browse all 45+ professional writing services. From academic essays to business plans, find the perfect solution for your writing needs." />
      </Helmet>
      
      <Navigation />
      
      <main className="py-16 md:py-24">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center py-20 mb-12" style={{ backgroundImage: "url('/src/assets/shop-hero-new.jpg')" }}>
          <div className="absolute inset-0 bg-black/65" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-white" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>
              Shop All Writing Services
            </h1>
            <p className="text-lg md:text-xl text-white font-medium max-w-2xl mx-auto" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)' }}>
              Browse 45+ professional writing services with FREE Turnitin report on every order
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="container mx-auto px-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 mb-12">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServicePosterCard key={service.id} service={service} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No services found matching your criteria
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Trust Section */}
        <section className="container mx-auto px-4 mb-12">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="py-12 text-center">
              <h2 className="font-heading font-bold text-3xl mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                We offer custom writing solutions for unique requirements
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary">
                  Contact Us for Custom Quote
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials Section */}
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
