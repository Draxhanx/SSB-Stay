"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is one-night stay allowed for students and SSB candidates?",
    answer:
      "Yes, we provide affordable and safe one-night stay options specially designed for students and SSB interview candidates.",
  },
  {
    question: "Is the accommodation safe for students?",
    answer:
      "Yes, the stay is safe, clean, and student-friendly with secure surroundings and basic amenities.",
  },
  {
    question: "How far is the stay from major exam or SSB centers?",
    answer:
      "Our accommodation is located near major exam and SSB interview centers to reduce travel stress for candidates.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 bg-background transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Everything you need to know about your stay.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-card rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                >
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isOpen
                        ? "text-primary dark:text-secondary"
                        : "text-primary-dark dark:text-gray-200"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-secondary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6 shadow-inner"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-6">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium transition-colors duration-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
