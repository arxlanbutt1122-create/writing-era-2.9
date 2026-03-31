export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.writingera.com/#organization",
  "name": "WritingEra",
  "description": "Professional academic and business writing services including essays, dissertations, research papers, editing, and business content.",
  "url": "https://www.writingera.com",
  "telephone": "+92-323-4827157",
  "email": "arslan@writingera.com",
  "image": "https://www.writingera.com/og.jpg",
  "priceRange": "$$",
  "areaServed": ["PK", "UK", "US", "AE", "EU"],
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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.writingera.com/#website",
  "url": "https://www.writingera.com",
  "name": "WritingEra",
  "publisher": {
    "@id": "https://www.writingera.com/#organization"
  }
};

export const webpageSchema = (data: { title: string; description: string; url: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": data.title,
  "description": data.description,
  "url": data.url,
  "isPartOf": {
    "@id": "https://www.writingera.com/#website"
  }
});

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
  "url": `https://www.writingera.com/services/${service.id}`,
  "provider": {
    "@id": "https://www.writingera.com/#organization"
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
