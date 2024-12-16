import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "./types";

interface CartItemProps {
  item: CartItemType;
  onAdd: (item: CartItemType) => void;
  onRemove: (id: number) => void;
}

export const CartItem = ({ item, onAdd, onRemove }: CartItemProps) => {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <div>
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">
          ${item.price.toFixed(2)} x {item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onRemove(item.id)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span>{item.quantity}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={() => onAdd(item)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};