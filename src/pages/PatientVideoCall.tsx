import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/components/live-call/types";
import { ConsultationView } from "@/components/live-call/ConsultationView";

const PatientVideoCall = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "patient",
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate doctor's response after 1 second
      setTimeout(() => {
        const doctorResponse: Message = {
          id: Date.now() + 1,
          text: "I understand. Let me help you with that.",
          sender: "doctor",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 1000);
    }
  };

  const handleEndCall = () => {
    toast({
      title: "Call Ended",
      description: "The consultation has been completed.",
    });
    navigate("/dashboard");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleViewHistory = () => {
    toast({
      title: "Medical History",
      description: "Viewing your medical history.",
    });
  };

  return (
    <ConsultationView
      onBack={handleBackToDashboard}
      onEndCall={handleEndCall}
      onViewHistory={handleViewHistory}
      messages={messages}
      newMessage={newMessage}
      onMessageChange={setNewMessage}
      onSendMessage={handleSendMessage}
      prescriptions={[]} // Patients can only view prescriptions
      onAddPrescription={() => {}} // Patients cannot add prescriptions
      onRemovePrescription={() => {}} // Patients cannot remove prescriptions
    />
  );
};

export default PatientVideoCall;