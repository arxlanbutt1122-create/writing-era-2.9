export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.writingera.com/#organization",
  name: "WritingEra",
  description:
    "Professional academic and business writing services including assignments, essays, research papers, dissertations, editing, SEO content, resumes, and business documents.",
  url: "https://www.writingera.com",
  telephone: "+92-323-4827157",
  email: "windwalker125official@gmail.com",
  image: "https://www.writingera.com/og.jpg",
  priceRange: "$$",
  areaServed: ["PK", "UK", "US", "AE", "EU"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sant Nagar",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.writingera.com/#website",
  url: "https://www.writingera.com",
  name: "WritingEra",
  publisher: {
    "@id": "https://www.writingera.com/#organization",
  },
};

export const founderPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.writingera.com/about#person",
  name: "M. Arslan Asif",
  alternateName: ["Arslan", "CEO Arslan", "Founder Arslan"],
  jobTitle: "Founder & CEO of WritingEra",
  worksFor: {
    "@id": "https://www.writingera.com/#organization",
  },
  url: "https://www.writingera.com/about",
  image: "https://www.writingera.com/founder-arslan.jpg",
};

export const webpageSchema = (data: { title: string; description: string; url: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: data.title,
  description: data.description,
  url: data.url,
  isPartOf: {
    "@id": "https://www.writingera.com/#website",
  },
  about: {
    "@id": "https://www.writingera.com/#organization",
  },
});
