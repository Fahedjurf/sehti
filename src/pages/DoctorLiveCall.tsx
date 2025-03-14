import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/components/live-call/types";
import { Product } from "@/components/pharmacy/types";
import { ConsultationView } from "@/components/live-call/ConsultationView";
import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft } from "lucide-react";

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

  const handleBackToDashboard = () => {
    navigate("/doctor-dashboard");
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

  const handleViewHistory = () => {
    toast({
      title: "Medical History",
      description: "Viewing patient's medical history.",
    });
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
      <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
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
      </div>
    );
  }

  return (
    <ConsultationView
      onBack={handleBackToDashboard}
      onEndCall={handleEndCall}
      onViewHistory={handleViewHistory}
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