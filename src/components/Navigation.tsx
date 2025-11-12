import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import CurrencyToggle from "./CurrencyToggle";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if we're on homepage, blog page, services page, or shop page
  const isOnHomepage = currentPath === '/';
  const isOnBlogPage = currentPath.startsWith('/blog');
  const isOnServicesPage = currentPath.startsWith('/services');
  const isOnShopPage = currentPath.startsWith('/shop');

  const homePages = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const servicePages = [
    { name: "All Services", path: "/services" },
    { name: "Essay Writing", path: "/services/essay-writing" },
    { name: "Research Papers", path: "/services/research-paper" },
    { name: "Thesis Writing", path: "/services/thesis-writing" },
    { name: "Dissertation", path: "/services/dissertation-writing" },
    { name: "Business Plans", path: "/services/business-plan" },
  ];

  const shopPages = [
    { name: "Shop", path: "/shop" },
    { name: "All Products", path: "/shop" },
    { name: "Order Now", path: "/contact" },
  ];

  const blogCategories = [
    { name: "Blog Posts", path: "/blog" },
    { name: "Articles", path: "/articles" },
    { name: "Biographies", path: "/biographies" },
    { name: "Stories", path: "/stories" },
    { name: "Novels", path: "/novels" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      {/* Enhanced Top Bar */}
      <div className="bg-primary py-2.5">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-primary-foreground">
          <div className="flex items-center gap-3 md:gap-6">
            <a href="tel:+923234827157" className="flex items-center gap-1.5 md:gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="hidden lg:inline font-medium text-xs md:text-sm">+92 323-4827157</span>
            </a>
            <a href="mailto:arslan@writingera.com" className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="hidden lg:inline font-medium text-xs md:text-sm">arslan@writingera.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xs font-semibold animate-pulse-slow truncate max-w-[120px] sm:max-w-[150px] md:max-w-none">
              ✨ FREE Turnitin Report
            </span>
            <div className="hidden lg:block h-4 w-px bg-primary-foreground/30"></div>
            <span className="hidden lg:inline text-xs font-medium whitespace-nowrap">24/7 Support</span>
            <div className="hidden md:block ml-2">
              <CurrencyToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="WritingEra Logo" className="h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-105" />
            <div className="font-heading font-bold text-lg sm:text-xl md:text-2xl bg-gradient-primary bg-clip-text text-transparent">
              WritingEra
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {/* Home - Show dropdown only when on homepage */}
                <NavigationMenuItem>
                  {isOnHomepage ? (
                    <>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-foreground font-medium">
                    Home
                  </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[400px] p-6 bg-background z-50">
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Main Pages</h3>
                          </div>
                          <ul className="space-y-2">
                            {homePages.map((page) => (
                              <li key={page.path}>
                                <Link
                                  to={page.path}
                                  className="block px-4 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-foreground font-medium"
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to="/"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Home
                    </Link>
                  )}
                </NavigationMenuItem>

                {/* Services Dropdown - Show dropdown only when on services page */}
                <NavigationMenuItem>
                  {isOnServicesPage ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-foreground font-medium">
                        Services
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[500px] p-6 bg-background z-50">
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Our Services</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {servicePages.map((page) => (
                              <Link
                                key={page.path}
                                to={page.path}
                                className="block px-4 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-foreground font-medium"
                              >
                                {page.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to="/services"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Services
                    </Link>
                  )}
                </NavigationMenuItem>

                {/* Shop - Show dropdown only when on shop page */}
                <NavigationMenuItem>
                  {isOnShopPage ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-foreground font-medium">
                        Shop
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[400px] p-6 bg-background z-50">
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Shop Pages</h3>
                          </div>
                          <ul className="space-y-2">
                            {shopPages.map((page) => (
                              <li key={page.path}>
                                <Link
                                  to={page.path}
                                  className="block px-4 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-foreground font-medium"
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to="/shop"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Shop
                    </Link>
                  )}
                </NavigationMenuItem>

                {/* Blog - Show dropdown only when on blog page */}
                <NavigationMenuItem>
                  {isOnBlogPage ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-foreground font-medium">
                        Blog
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[400px] p-6 bg-background z-50">
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Blog Categories</h3>
                          </div>
                          <ul className="space-y-2">
                            {blogCategories.map((category) => (
                              <li key={category.path}>
                                <Link
                                  to={category.path}
                                  className="block px-4 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-foreground font-medium"
                                >
                                  {category.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to="/blog"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Blog
                    </Link>
                  )}
                </NavigationMenuItem>

                {/* Tools Link */}
                <NavigationMenuItem>
                  <Link
                    to="/tools"
                    className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Tools
                  </Link>
                </NavigationMenuItem>

                {/* About Us Link */}
                <NavigationMenuItem>
                  <Link
                    to="/about"
                    className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <Link
                    to="/contact"
                    className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 ml-6">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-foreground" />
              </button>
              <div className="hidden lg:block">
                <CurrencyToggle />
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary-light shadow-md">
                <Link to="/contact">Let's Talk →</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="p-2 rounded-lg hover:bg-muted flex-shrink-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-4 animate-fade-in border-t border-border">
            <div className="flex justify-center pb-3 border-b border-border">
              <CurrencyToggle />
            </div>
            <div className="space-y-2">
              <Link
                to="/"
                className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/shop"
                className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/blog"
                className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/tools"
                className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Tools
              </Link>
              <Link
                to="/about"
                className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary-light">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Let's Talk →
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
