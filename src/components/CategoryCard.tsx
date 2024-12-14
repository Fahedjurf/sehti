import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const CategoryCard = ({ title, icon: Icon, description }: CategoryCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group-hover:animate-card-hover border border-medical-light/50">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-medical-light rounded-full">
            <Icon className="w-8 h-8 text-medical-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};