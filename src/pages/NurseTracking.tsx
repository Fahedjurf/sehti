
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LocationMap } from "@/components/nurses/LocationMap";
import { toast } from "@/components/ui/use-toast";
import { ThreeDotsMenu } from "@/components/ThreeDotsMenu";
import { useResponsive } from "@/hooks/use-mobile";

interface NurseRequest {
  service: {
    id: string;
    title: string;
    description: string;
    estimatedTime: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  requestTime: string;
}

const NurseTracking = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
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
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-4 md:p-6">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute top-0 right-0 z-50">
          <ThreeDotsMenu />
        </div>

        <Button
          variant="outline"
          className="mb-4 md:mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/domestic-nurses")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Domestic Nurses
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-4 md:space-y-6">
          <h1 className="text-xl md:text-2xl font-bold text-medical-dark">
            Nurse Service Tracking
          </h1>

          <div className="space-y-3 md:space-y-4">
            <div className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center justify-between'}`}>
              <span className="text-base md:text-lg font-medium">Nurse is on the way</span>
              <span className="text-medical-primary">
                Estimated arrival: {estimatedTime} minutes
              </span>
            </div>

            <Progress value={Math.max(0, 100 - (estimatedTime / 30) * 100)} />
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-200 h-[250px] md:h-[300px]">
            <LocationMap
              onLocationChange={() => {}}
              driverLocation={nurseLocation}
            />
          </div>

          {nurseRequest && (
            <div className="mt-6 md:mt-8">
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Service Type</h2>
              <div className="p-3 md:p-4 border rounded-lg bg-gray-50">
                <div className="text-base md:text-lg text-medical-dark">
                  {nurseRequest.service.title}
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
