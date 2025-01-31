import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDetails } from "./types";

interface CardDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardDetails: CardDetails;
  onCardDetailsChange: (details: CardDetails) => void;
  onSubmit: () => void;
  orderItems?: any[];
}

export const CardDetailsDialog = ({
  open,
  onOpenChange,
  cardDetails,
  onCardDetailsChange,
  onSubmit,
  orderItems = [],
}: CardDetailsDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length > 0) {
      localStorage.setItem("orderItems", JSON.stringify(orderItems));
    }
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Card Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                onCardDetailsChange({ ...cardDetails, cardNumber: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  onCardDetailsChange({ ...cardDetails, expiryDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) =>
                  onCardDetailsChange({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) =>
                onCardDetailsChange({ ...cardDetails, name: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            Confirm Payment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};