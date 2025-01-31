import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatSection } from "@/components/live-call/ChatSection";
import { Message } from "@/components/live-call/types";

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
          text: "I understand. Let me examine your symptoms.",
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
      description: "Your consultation has been completed.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="container mx-auto p-4 max-w-6xl">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-medical-dark mb-8 text-center">
          Live Call
        </h1>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="bg-gray-800 rounded-lg aspect-video relative mb-4">
              <div className="absolute top-4 right-4">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleEndCall}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  End Call
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 text-white text-sm">
                Dr. Smith
              </div>
            </div>

            <ChatSection
              messages={messages}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVideoCall;