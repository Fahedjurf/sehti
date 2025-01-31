import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LocationMap } from "@/components/nurses/LocationMap";

interface DeliveryStatus {
  status: "preparing" | "on_the_way" | "delivered";
  estimatedTime: number; // in minutes
  driverLocation: {
    lat: number;
    lng: number;
  };
}

const DeliveryTracking = () => {
  const navigate = useNavigate();
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>({
    status: "preparing",
    estimatedTime: 30,
    driverLocation: {
      lat: 24.7136,
      lng: 46.6753,
    },
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryStatus((prev) => {
        // Simulate driver movement
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/pharmaceutical-supplies")}
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

          <div className="rounded-lg overflow-hidden border border-gray-200">
            <LocationMap
              onLocationChange={() => {}}
              driverLocation={deliveryStatus.driverLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;