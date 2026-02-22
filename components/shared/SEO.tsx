import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Shaurya SSB Stay | One-Night Dormitory Stay for SSB, Defence & Army Aspirants in Lalghati Bhopal at ₹349",
  description:
    "Shaurya SSB Stay offers clean, safe, and budget-friendly dormitory and one-night accommodation for SSB students, defence and army aspirants starting at just ₹349. Located in Lalghati, Bhopal near SSB centers and Gufa Mandir, ideal as a low-cost hostel and affordable hotel alternative for SSB interview candidates.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Shaurya SSB Stay",
    "SSB stay in Bhopal",
    "SSB accommodation Lalghati",
    "SSB dormitory stay",
    "one night stay for SSB students",
    "SSB interview stay near SSB center",
    "defence aspirant accommodation",
    "army aspirant stay near SSB",
    "low cost hostel for SSB students",
    "budget hostel in Lalghati Bhopal",
    "cheap hotel near SSB center",
    "SSB stay near Gufa Mandir",
    "SSB stay at 349",
    "budget stay for defence and army aspirants",
  ],
  openGraph: {
    title:
      "Shaurya SSB Stay | Affordable SSB Dormitory & One-Night Stay in Bhopal at ₹349",
    description:
      "Low-cost dormitory and one-night stay for SSB students, defence and army aspirants in Lalghati, Bhopal near SSB center and Gufa Mandir.",
    type: "website",
  },
};

const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Shaurya SSB Stay",
    description:
      "Affordable one-night dormitory and hostel-style accommodation for SSB students, defence and army aspirants near SSB center and Gufa Mandir in Lalghati, Bhopal.",
    priceRange: "₹349",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lalghati",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Bhopal",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Low-cost Dormitory",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free Wi-Fi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "RO Drinking Water",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Clean Bedding",
        value: true,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FaqJsonLd = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is one-night stay available for SSB students and defence aspirants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Shaurya SSB Stay provides affordable one-night dormitory accommodation specially designed for SSB students, defence and army aspirants.",
        },
      },
      {
        "@type": "Question",
        name: "What is the price for one-night stay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The one-night dormitory stay starts at just ₹349, making it a low-cost hostel and budget hotel alternative for SSB interview candidates.",
        },
      },
      {
        "@type": "Question",
        name: "Is Shaurya SSB Stay located near SSB center and Gufa Mandir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the stay is located in Lalghati, Bhopal, close to SSB centers and Gufa Mandir, helping candidates reduce travel stress during interviews.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};

export default JsonLd;
