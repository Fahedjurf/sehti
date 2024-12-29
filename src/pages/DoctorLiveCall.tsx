import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/components/live-call/types";
import { Product } from "@/components/pharmacy/types";
import { ConsultationView } from "@/components/live-call/ConsultationView";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

// Mock medical history data - in a real app, this would come from an API
const mockMedicalHistory = [
  {
    id: 1,
    date: "2024-03-15",
    diagnosis: "Common Cold",
    treatment: "Prescribed antibiotics and rest",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    date: "2024-02-01",
    diagnosis: "Annual Checkup",
    treatment: "No issues found",
    doctor: "Dr. Michael Chen",
  },
  {
    id: 3,
    date: "2023-12-10",
    diagnosis: "Migraine",
    treatment: "Prescribed pain medication",
    doctor: "Dr. Emily Williams",
  },
];

const DoctorLiveCall = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [prescriptions, setPrescriptions] = useState<Product[]>([]);
  const [isReceivingCalls, setIsReceivingCalls] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const { toast } = useToast();

  const handleToggleReceiving = () => {
    setIsReceivingCalls(!isReceivingCalls);
    if (!isReceivingCalls) {
      toast({
        title: "Now Receiving Calls",
        description: "You will be notified when a patient calls.",
      });
      // Simulate receiving a call after 3 seconds when turned on
      setTimeout(() => {
        if (isReceivingCalls) {
          setIsCallAccepted(true);
          toast({
            title: "Call Connected",
            description: "You are now connected with John Doe.",
          });
        }
      }, 3000);
    } else {
      toast({
        title: "Call Receiving Turned Off",
        description: "You will not receive any calls.",
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "doctor",
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate patient's response after 1 second
      setTimeout(() => {
        const patientResponse: Message = {
          id: Date.now() + 1,
          text: "Thank you, doctor. I understand.",
          sender: "patient",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, patientResponse]);
      }, 1000);
    }
  };

  const handleEndCall = () => {
    setIsCallAccepted(false);
    setIsReceivingCalls(false);
    toast({
      title: "Call Ended",
      description: "The consultation has been completed.",
    });
    navigate("/doctor-dashboard");
  };

  const handleAddPrescription = (product: Product) => {
    setPrescriptions(prev => [...prev, product]);
    toast({
      title: "Prescription Added",
      description: `${product.name} has been added to the prescription list.`,
    });
  };

  const handleRemovePrescription = (id: number) => {
    setPrescriptions(prev => prev.filter(prescription => prescription.id !== id));
    toast({
      title: "Prescription Removed",
      description: "The medication has been removed from the prescription list.",
    });
  };

  if (!isCallAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6 flex items-center justify-center">
        <div className="text-center space-y-8">
          <Button
            onClick={handleToggleReceiving}
            className={`w-48 h-48 rounded-full text-xl font-semibold transition-all duration-300 ${
              isReceivingCalls 
                ? 'bg-medical-primary hover:bg-medical-primary/90 animate-pulse'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <Phone className="w-12 h-12" />
              <span>{isReceivingCalls ? 'Receiving Calls...' : 'Start Receiving'}</span>
            </div>
          </Button>
          {isReceivingCalls && (
            <p className="text-medical-primary animate-pulse">
              Waiting for patient calls...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <ConsultationView
      onBack={() => navigate("/doctor-dashboard")}
      onEndCall={handleEndCall}
      messages={messages}
      newMessage={newMessage}
      onMessageChange={setNewMessage}
      onSendMessage={handleSendMessage}
      prescriptions={prescriptions}
      onAddPrescription={handleAddPrescription}
      onRemovePrescription={handleRemovePrescription}
    />
  );
};

export default DoctorLiveCall;
