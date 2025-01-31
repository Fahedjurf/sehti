import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDetails } from "./types";

interface CardDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardDetails: CardDetails;
  onCardDetailsChange: (details: CardDetails) => void;
  onSubmit: () => void;
}

export const CardDetailsDialog = ({
  open,
  onOpenChange,
  cardDetails,
  onCardDetailsChange,
  onSubmit,
}: CardDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Card Details</DialogTitle>
          <DialogDescription>
            Please enter your payment information to complete the purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              value={cardDetails.name}
              onChange={(e) =>
                onCardDetailsChange({ ...cardDetails, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                onCardDetailsChange({ ...cardDetails, cardNumber: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  onCardDetailsChange({
                    ...cardDetails,
                    expiryDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={cardDetails.cvv}
                onChange={(e) =>
                  onCardDetailsChange({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Confirm Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};