import { Stethoscope, Users, Truck, Phone, UserRound, MoreVertical } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

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
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "ar" : "en");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-light to-white">
      <div className="container px-4 py-12">
        {/* Header with Profile and Settings */}
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <Avatar className="h-10 w-10 bg-purple-100">
            <AvatarFallback className="text-purple-700">
              <UserRound className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="h-6 w-6 text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleLanguage}>
                {language === "en" ? "Switch to Arabic" : "Switch to English"}
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
          Healthcare Services
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Access professional medical services from the comfort of your home
        </p>
        
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
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