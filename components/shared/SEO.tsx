import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordable One-Night Stay for Students & Interview Candidates",
  description:
    "Specially designed accommodation for students and job candidates. Clean, safe, and near major exam centers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Affordable One-Night Stay for Students",
    description:
      "Budget-friendly accommodation with Wi-Fi, RO water, and clean beds.",
    type: "website",
  },
};

const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Shaurya ssb stay",
    description:
      "Affordable one-night stay for students and interview candidates.",
    priceRange: "₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Your City",
      addressRegion: "Your State",
      addressCountry: "IN",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Free Wi-Fi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "RO Water",
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
        name: "Is one-night stay allowed for students and SSB candidates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide affordable and safe one-night stay options specially designed for students and SSB interview candidates.",
        },
      },
      {
        "@type": "Question",
        name: "Is the accommodation safe for students?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the stay is safe, clean, and student-friendly with secure surroundings and basic amenities.",
        },
      },
      {
        "@type": "Question",
        name: "How far is the stay from major exam or SSB centers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our accommodation is located near major exam and SSB interview centers to reduce travel stress for candidates.",
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
