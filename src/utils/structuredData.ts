export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "WritingEra",
  "description": "Professional Academic and Business Writing Services - Essays, Dissertations, Research Papers, and More",
  "url": "https://writingera.com",
  "telephone": "+92-323-4827157",
  "email": "arslan@writingera.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sant Nagar",
    "addressLocality": "Lahore",
    "addressCountry": "PK"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "5000"
  },
  "sameAs": [
    "https://facebook.com/writingera",
    "https://twitter.com/writingera",
    "https://linkedin.com/company/writingera",
    "https://instagram.com/writingera"
  ]
};

export const serviceSchema = (service: {
  title: string;
  metaDescription: string;
  price: string;
  priceRange: string;
  id: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.metaDescription,
  "provider": {
    "@type": "Organization",
    "name": "WritingEra"
  },
  "areaServed": ["US", "UK", "UAE", "PK", "EU"],
  "offers": {
    "@type": "Offer",
    "price": service.price.replace(/[^0-9]/g, ''),
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
