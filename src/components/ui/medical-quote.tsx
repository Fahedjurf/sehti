import { Quote } from "lucide-react";

const quotes = [
  {
    text: "The good physician treats the disease; the great physician treats the patient who has the disease.",
    author: "William Osler"
  },
  {
    text: "Wherever the art of medicine is loved, there is also a love of humanity.",
    author: "Hippocrates"
  },
  {
    text: "The best way to predict your health is to create it.",
    author: "Unknown"
  }
];

export const MedicalQuote = () => {
  // Randomly select a quote
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg border border-medical-accent/20">
      <Quote className="absolute -top-4 -left-4 h-8 w-8 text-medical-primary opacity-20" />
      <blockquote className="text-lg text-medical-dark italic">
        "{quote.text}"
      </blockquote>
      <cite className="block mt-4 text-sm text-medical-primary font-medium">
        — {quote.author}
      </cite>
    </div>
  );
};