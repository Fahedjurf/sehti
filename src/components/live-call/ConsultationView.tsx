import { Button } from "@/components/ui/button";
import { ArrowLeft, X, FileText } from "lucide-react";
import { ChatSection } from "@/components/live-call/ChatSection";
import { PrescriptionSection } from "@/components/live-call/PrescriptionSection";
import { Message } from "@/components/live-call/types";
import { Product } from "@/components/pharmacy/types";

interface ConsultationViewProps {
  onBack: () => void;
  onEndCall: () => void;
  onViewHistory: () => void;
  messages: Message[];
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  prescriptions: Product[];
  onAddPrescription: (product: Product) => void;
  onRemovePrescription: (id: number) => void;
}

export const ConsultationView = ({
  onBack,
  onEndCall,
  onViewHistory,
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
  prescriptions,
  onAddPrescription,
  onRemovePrescription,
}: ConsultationViewProps) => {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold text-medical-dark mb-8 text-center">
        Live Consultation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg aspect-video relative mb-4">
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewHistory}
                className="flex items-center gap-2 bg-white/90"
              >
                <FileText className="h-4 w-4" />
                View Medical History
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onEndCall}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                End Call
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 text-white text-sm">
              Patient Name
            </div>
          </div>

          <ChatSection
            messages={messages}
            newMessage={newMessage}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
          />
        </div>

        <PrescriptionSection
          prescriptions={prescriptions}
          onAddPrescription={onAddPrescription}
          onRemovePrescription={onRemovePrescription}
        />
      </div>
    </div>
  );
};