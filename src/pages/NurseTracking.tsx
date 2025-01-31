import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LocationMap } from "@/components/nurses/LocationMap";
import { toast } from "@/components/ui/use-toast";

interface NurseRequest {
  service: {
    id: string;
    name: string;
    description: string;
    estimatedTime: string;
    price: number;
  };
  location: {
    lat: number;
    lng: number;
  };
  requestTime: string;
}

const NurseTracking = () => {
  const navigate = useNavigate();
  const [nurseRequest, setNurseRequest] = useState<NurseRequest | null>(null);
  const [nurseLocation, setNurseLocation] = useState({
    lat: 24.7136,
    lng: 46.6753,
  });
  const [estimatedTime, setEstimatedTime] = useState(30);

  useEffect(() => {
    const requestData = localStorage.getItem("nurseRequest");
    if (requestData) {
      try {
        const parsedData = JSON.parse(requestData);
        setNurseRequest(parsedData);
        // Clean up after retrieving
        localStorage.removeItem("nurseRequest");
      } catch (error) {
        console.error("Error parsing nurse request:", error);
        toast({
          title: "Error",
          description: "Could not load nurse tracking information",
          variant: "destructive",
        });
      }
    }
  }, []);

  // Simulate real-time updates for nurse location
  useEffect(() => {
    const interval = setInterval(() => {
      setNurseLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
      setEstimatedTime((prev) => Math.max(0, prev - 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/domestic-nurses")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Domestic Nurses
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-medical-dark">
            Nurse Service Tracking
          </h1>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Nurse is on the way</span>
              <span className="text-medical-primary">
                Estimated arrival: {estimatedTime} minutes
              </span>
            </div>

            <Progress value={Math.max(0, 100 - (estimatedTime / 30) * 100)} />
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-200 h-[300px]">
            <LocationMap
              onLocationChange={() => {}}
              driverLocation={nurseLocation}
            />
          </div>

          {nurseRequest && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Service Details</h2>
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="font-medium">Service:</div>
                  <div>{nurseRequest.service.name}</div>
                  
                  <div className="font-medium">Description:</div>
                  <div>{nurseRequest.service.description}</div>
                  
                  <div className="font-medium">Price:</div>
                  <div>${nurseRequest.service.price}</div>
                  
                  <div className="font-medium">Request Time:</div>
                  <div>{new Date(nurseRequest.requestTime).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NurseTracking;