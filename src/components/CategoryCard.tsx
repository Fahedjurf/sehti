import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const CategoryCard = ({ title, icon: Icon, description }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (title) {
      case "Quick Diagnoses":
        navigate("/quick-diagnoses");
        break;
      case "Live Call":
        navigate("/live-call");
        break;
      case "Domestic Nurses":
        navigate("/domestic-nurses");
        break;
      case "Pharmaceutical Supplies Delivery":
        navigate("/pharmacy");
        break;
    }
  };

  return (
    <div
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-medical-light/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-medical-light rounded-full">
          <Icon className="h-8 w-8 text-medical-primary" />
        </div>
        <h3 className="text-xl font-semibold text-medical-dark">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};