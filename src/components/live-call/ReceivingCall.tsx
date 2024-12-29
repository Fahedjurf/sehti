import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReceivingCallProps {
  patientName: string;
  onAccept: () => void;
  onDecline: () => void;
}

export const ReceivingCall = ({ patientName, onAccept, onDecline }: ReceivingCallProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white/80 backdrop-blur-sm rounded-lg p-8 space-y-8">
      <div className="animate-pulse">
        <div className="w-24 h-24 bg-medical-primary/20 rounded-full flex items-center justify-center">
          <Phone className="w-12 h-12 text-medical-primary" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-medical-dark">Incoming Call</h2>
        <p className="text-gray-600">{patientName} is calling...</p>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
          onClick={onDecline}
        >
          Decline
        </Button>
        <Button
          className="bg-medical-primary hover:bg-medical-primary/90"
          onClick={onAccept}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};