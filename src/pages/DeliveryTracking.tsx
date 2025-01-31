import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LocationMap } from "@/components/nurses/LocationMap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartItem } from "@/components/pharmacy/types";

interface DeliveryStatus {
  status: "preparing" | "on_the_way" | "delivered";
  estimatedTime: number;
  driverLocation: {
    lat: number;
    lng: number;
  };
}

const DeliveryTracking = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>({
    status: "preparing",
    estimatedTime: 30,
    driverLocation: {
      lat: 24.7136,
      lng: 46.6753,
    },
  });

  useEffect(() => {
    const items = localStorage.getItem("orderItems");
    if (items) {
      try {
        const parsedItems = JSON.parse(items);
        setOrderItems(parsedItems);
        // Clean up after retrieving
        localStorage.removeItem("orderItems");
      } catch (error) {
        console.error("Error parsing order items:", error);
      }
    }
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryStatus((prev) => {
        const newLat = prev.driverLocation.lat + (Math.random() - 0.5) * 0.001;
        const newLng = prev.driverLocation.lng + (Math.random() - 0.5) * 0.001;

        return {
          ...prev,
          driverLocation: {
            lat: newLat,
            lng: newLng,
          },
          estimatedTime: Math.max(0, prev.estimatedTime - 1),
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch (deliveryStatus.status) {
      case "preparing":
        return "Preparing your order";
      case "on_the_way":
        return "Driver is on the way";
      case "delivered":
        return "Order delivered";
      default:
        return "Processing order";
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/pharmacy")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pharmacy
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-medical-dark">
            Order Tracking
          </h1>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{getStatusText()}</span>
              <span className="text-medical-primary">
                Estimated delivery: {deliveryStatus.estimatedTime} minutes
              </span>
            </div>

            <Progress value={Math.max(0, 100 - (deliveryStatus.estimatedTime / 30) * 100)} />
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-200 h-[300px]">
            <LocationMap
              onLocationChange={() => {}}
              driverLocation={deliveryStatus.driverLocation}
            />
          </div>

          {orderItems && orderItems.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">
                        Total Amount:
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${calculateTotal().toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;