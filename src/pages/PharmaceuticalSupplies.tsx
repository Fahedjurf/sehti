import { useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartItem } from "@/components/pharmacy/CartItem";
import { ProductCard } from "@/components/pharmacy/ProductCard";
import { CardDetailsDialog } from "@/components/pharmacy/CardDetailsDialog";
import { CartItem as CartItemType, CardDetails, Product } from "@/components/pharmacy/types";
import { products } from "@/components/pharmacy/products";

const PharmaceuticalSupplies = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    name: "",
    cvv: "",
  });

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentCart.filter((item) => item.id !== productId);
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    // Handle checkout logic here
    console.log("Checking out with payment method:", paymentMethod);
    console.log("Cart items:", cart);
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    if (value === "card") {
      setShowCardDialog(true);
    }
  };

  const handleCardDetailsSubmit = () => {
    setShowCardDialog(false);
    handleCheckout();
  };

  useEffect(() => {
    const prescribedMeds = localStorage.getItem('prescribedMedications');
    if (prescribedMeds) {
      const medications = JSON.parse(prescribedMeds);
      medications.forEach((med: any) => {
        const product = {
          id: med.id,
          name: med.name,
          price: med.price,
          description: `${med.dosage} - ${med.frequency}`,
          image: "/placeholder.svg"
        };
        addToCart(product);
      });
      localStorage.removeItem('prescribedMedications');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-medical-dark mb-8 text-center">
          Pharmaceutical Supplies
        </h1>

        <div className="flex justify-end mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-medical-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onAdd={addToCart}
                    onRemove={removeFromCart}
                  />
                ))}
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <Select
                      value={paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="cash">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      className="w-full"
                      onClick={handleCheckout}
                      disabled={cart.length === 0 || !paymentMethod}
                    >
                      Checkout
                    </Button>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">Your cart is empty</p>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        <CardDetailsDialog
          open={showCardDialog}
          onOpenChange={setShowCardDialog}
          cardDetails={cardDetails}
          onCardDetailsChange={setCardDetails}
          onSubmit={handleCardDetailsSubmit}
        />
      </div>
    </div>
  );
};

export default PharmaceuticalSupplies;
