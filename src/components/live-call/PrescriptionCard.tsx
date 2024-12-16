import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Prescription } from "./types";

interface PrescriptionCardProps {
  prescription: Prescription;
  onRemove?: (id: number) => void;
}

export const PrescriptionCard = ({ prescription, onRemove }: PrescriptionCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{prescription.name}</h3>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(prescription.id)}
            className="h-8 w-8 text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger>Medication Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="font-semibold mb-1">Dosage</h4>
                <p className="text-sm text-gray-600">{prescription.dosage}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Usage Instructions</h4>
                <p className="text-sm text-gray-600">{prescription.frequency}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Side Effects</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{prescription.sideEffects}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Additional Information</h4>
                <p className="text-sm text-gray-600">{prescription.description}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="text-sm font-medium text-medical-primary mt-2">
        Price: ${prescription.price.toFixed(2)}
      </p>
    </Card>
  );
};