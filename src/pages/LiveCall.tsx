import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LiveCall = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [waitingTime, setWaitingTime] = useState(0);

  useEffect(() => {
    // Simulate waiting time counter
    const interval = setInterval(() => {
      setWaitingTime((prev) => prev + 1);
    }, 1000);

    // Simulate doctor connecting after 10 seconds
    const timeout = setTimeout(() => {
      toast({
        title: "Doctor Connected",
        description: "You are being connected to the doctor...",
      });
      navigate("/doctor-live-call");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container mx-auto p-4 max-w-6xl">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col items-center justify-center space-y-8 mt-20">
          <div className="w-32 h-32 rounded-full bg-medical-primary/20 animate-pulse" />
          
          <h1 className="text-3xl font-bold text-medical-dark text-center">
            Waiting for Doctor
          </h1>
          
          <p className="text-gray-600 text-center max-w-md">
            Please wait while we connect you with a doctor. Your estimated waiting time is less than 2 minutes.
          </p>
          
          <div className="text-medical-primary font-semibold">
            Time elapsed: {waitingTime} seconds
          </div>

          <Button
            variant="outline"
            className="mt-8"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveCall;