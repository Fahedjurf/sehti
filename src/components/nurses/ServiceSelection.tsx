import { RadioGroup } from "@/components/ui/radio-group";
import { NurseServiceCard } from "./NurseServiceCard";

export const nurseServices = [
  {
    id: "general",
    title: "General Care",
    description: "Basic medical care and assistance with daily activities",
    estimatedTime: "30 minutes"
  },
  {
    id: "specialized",
    title: "Specialized Care",
    description: "Advanced medical procedures and monitoring",
    estimatedTime: "45 minutes"
  },
  {
    id: "elderly",
    title: "Elderly Care",
    description: "Specialized care for elderly patients",
    estimatedTime: "40 minutes"
  }
];

interface ServiceSelectionProps {
  selectedService: string;
  onServiceChange: (value: string) => void;
}

export const ServiceSelection = ({ selectedService, onServiceChange }: ServiceSelectionProps) => (
  <div className="mb-6 relative">
    <h2 className="text-xl font-semibold mb-4 text-medical-dark">Select Service Type</h2>
    <RadioGroup value={selectedService} onValueChange={onServiceChange} className="space-y-4">
      {nurseServices.map((service) => (
        <NurseServiceCard key={service.id} {...service} />
      ))}
    </RadioGroup>
  </div>
);