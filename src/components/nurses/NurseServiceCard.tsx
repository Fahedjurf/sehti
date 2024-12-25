import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface NurseServiceProps {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
}

export const NurseServiceCard = ({ id, title, description }: NurseServiceProps) => (
  <div className="flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 hover:bg-medical-light/50">
    <RadioGroupItem value={id} id={id} />
    <Label htmlFor={id} className="font-medium cursor-pointer">
      <div className="text-medical-dark">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </Label>
  </div>
);