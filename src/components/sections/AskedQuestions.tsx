"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Netflix Clone?",
    answer:
      "Netflix Clone is a web application built to explore movies and TV shows with a Netflix-like interface.",
  },
  {
    question: "How can I watch movies?",
    answer:
      "You can browse trending, popular, top-rated, and upcoming movies, then click on any movie to view details.",
  },
  {
    question: "Are the TV shows included?",
    answer:
      "Yes, you can explore trending and popular TV shows, view seasons, episodes, cast, and more.",
  },
  {
    question: "Is there a trailer for each movie?",
    answer:
      "Whenever available, trailers are embedded directly on the movie or TV show details page.",
  },
  {
    question: "Can I view production details?",
    answer:
      "Yes, production companies, networks, and countries are displayed along with reviews and metadata.",
  },
  {
    question: "Is this project fully responsive?",
    answer:
      "Yes, the layout adapts to all screen sizes, including desktop, tablet, and mobile devices.",
  },
];

export default function AskedQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-10 py-16">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          Have a different question and can't find the answer you're looking
          for? Reach out to our support team by sending us an email and we'll
          get back to you as soon as we can.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-sm border border-zinc-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-base md:text-lg font-semibold text-white hover:bg-zinc-800 py-4 px-4 flex items-center justify-between transition-colors"
              >
                <span className="text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="text-gray-300 text-sm md:text-base leading-relaxed pb-4 px-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          Ready to start exploring?
        </h3>
        <p className="text-base text-gray-400 mb-6">
          Sign up or log in to discover thousands of movies and TV shows.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-semibold transition-colors text-sm md:text-base">
          Get Started
        </button>
      </div>
    </section>
  );
}
