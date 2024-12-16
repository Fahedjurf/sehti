import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/components/pharmacy/products";
import { Product } from "@/components/pharmacy/types";

interface PrescriptionManagerProps {
  onAddPrescription: (prescription: Product) => void;
}

export const PrescriptionManager = ({ onAddPrescription }: PrescriptionManagerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPrescription = (product: Product) => {
    onAddPrescription(product);
    toast({
      title: "Prescription Added",
      description: `${product.name} has been added to the prescription list.`,
    });
  };

  return (
    <Card className="p-4">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddPrescription(product)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};