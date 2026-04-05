const SITE_URL = "https://www.writingera.com";
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/about#founder`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "WritingEra",
  description:
    "Academic and business writing services for assignments, essays, research papers, dissertations, editing, business documents, and career materials.",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}/og.jpg`,
  telephone: "+92-323-4827157",
  email: "windwalker125official@gmail.com",
  priceRange: "$$",
  areaServed: [
    "United Kingdom",
    "United States",
    "United Arab Emirates",
    "Europe",
    "Global",
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61579849341845",
  ],
  founder: {
    "@id": FOUNDER_ID,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: "WritingEra",
  publisher: {
    "@id": ORG_ID,
  },
};

export const founderPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: "M. Arslan Asif",
  alternateName: "CEO Arslan",
  jobTitle: "Founder & CEO",
  image: `${SITE_URL}/founder-ceo-m-arslan-asif.webp`,
  url: `${SITE_URL}/about`,
  worksFor: {
    "@id": ORG_ID,
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61579849341845",
  ],
};

export const webpageSchema = (data: {
  title: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: data.title,
  description: data.description,
  url: data.url,
  isPartOf: {
    "@id": SITE_ID,
  },
  about: {
    "@id": ORG_ID,
  },
});

export const collectionPageSchema = (data: {
  title: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: data.title,
  description: data.description,
  url: data.url,
  isPartOf: {
    "@id": SITE_ID,
  },
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
  name: service.title,
  description: service.metaDescription,
  url: `${SITE_URL}/services/${service.id}`,
  provider: {
    "@id": ORG_ID,
  },
  areaServed: ["United Kingdom", "United States", "United Arab Emirates", "Europe", "Global"],
  offers: {
    "@type": "Offer",
    price: service.price.replace(/[^0-9.]/g, "") || undefined,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/order/${service.id}`,
  },
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const articleSchema = (data: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string;
  authorName?: string | null;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: data.title,
  description: data.description,
  mainEntityOfPage: data.url,
  image: data.image || `${SITE_URL}/og.jpg`,
  datePublished: data.datePublished,
  dateModified: data.dateModified || data.datePublished,
  author: {
    "@type": "Person",
    name: data.authorName || "WritingEra Editorial Team",
  },
  publisher: {
    "@id": ORG_ID,
  },
});
