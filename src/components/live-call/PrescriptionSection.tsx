import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PrescriptionCard } from "@/components/live-call/PrescriptionCard";
import { PrescriptionManager } from "@/components/doctor/PrescriptionManager";
import { Product } from "@/components/pharmacy/types";

interface PrescriptionSectionProps {
  prescriptions: Product[];
  onAddPrescription: (product: Product) => void;
  onRemovePrescription: (id: number) => void;
}

export const PrescriptionSection = ({
  prescriptions,
  onAddPrescription,
  onRemovePrescription,
}: PrescriptionSectionProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Prescribed Medications</h2>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                prescription={{
                  id: prescription.id,
                  name: prescription.name,
                  dosage: "As prescribed",
                  frequency: prescription.usage,
                  price: prescription.price,
                  sideEffects: prescription.sideEffects,
                  description: prescription.fullDescription,
                }}
                onRemove={onRemovePrescription}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>

      <PrescriptionManager onAddPrescription={onAddPrescription} />
    </div>
  );
};