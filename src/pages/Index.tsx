import { Stethoscope, Users, Truck, Phone } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";

const categories = [
  {
    title: "Quick Diagnoses",
    icon: Stethoscope,
    description: "Get instant medical assessments from qualified professionals",
  },
  {
    title: "Domestic Nurses",
    icon: Users,
    description: "Find experienced nurses for home healthcare services",
  },
  {
    title: "Pharmaceutical Supplies Delivery",
    icon: Truck,
    description: "Fast delivery of medications and medical supplies",
  },
  {
    title: "Live Call",
    icon: Phone,
    description: "Connect instantly with healthcare professionals",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-light to-white">
      <div className="container px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
          Healthcare Services
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Access professional medical services from the comfort of your home
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;