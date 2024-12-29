import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Phone } from "lucide-react";

const DoctorLiveCall = () => {
  const [isReceiving, setIsReceiving] = useState(false);
  const navigate = useNavigate();

  const handleReceiveRequests = () => {
    setIsReceiving(true);
    toast.success("You are now receiving call requests");
    // In a real app, this would connect to a backend service
    // to handle incoming call requests
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate("/doctor-dashboard")}
          className="mb-8"
        >
          Back to Dashboard
        </Button>

        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-3xl font-bold text-medical-dark text-center">
            Live Call Center
          </h1>
          
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <Button
              size="lg"
              className={`w-full h-32 text-xl transition-all duration-300 ${
                isReceiving 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-medical-primary hover:bg-medical-primary/90"
              }`}
              onClick={handleReceiveRequests}
              disabled={isReceiving}
            >
              <Phone className="mr-2 h-8 w-8" />
              {isReceiving ? "Receiving Requests..." : "Start Receiving Requests"}
            </Button>

            {isReceiving && (
              <p className="mt-4 text-center text-gray-600">
                Waiting for incoming patient calls...
              </p>
            )}
          </div>

          <div className="text-center text-gray-600">
            <p>When you start receiving requests, patients will be able to connect with you.</p>
            <p>Make sure you have a stable internet connection and your audio is working properly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLiveCall;