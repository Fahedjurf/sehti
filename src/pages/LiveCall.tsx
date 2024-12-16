import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { X, Send, Pill } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "patient" | "doctor";
  timestamp: Date;
}

interface Prescription {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

const LiveCall = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
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
    // Navigate back to dashboard or handle call ending logic
  };

  // Simulated prescriptions (in a real app, these would come from the doctor)
  const samplePrescriptions: Prescription[] = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed for pain",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Call Section */}
        <div className="lg:col-span-2">
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

          {/* Chat Section */}
          <Card className="p-4">
            <ScrollArea className="h-[300px] mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "patient" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === "patient"
                          ? "bg-medical-primary text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Describe what you're feeling..."
                className="resize-none"
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Prescriptions Section */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="h-5 w-5 text-medical-primary" />
              <h2 className="text-lg font-semibold">Prescribed Medications</h2>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {samplePrescriptions.map((prescription) => (
                  <Card key={prescription.id} className="p-4">
                    <h3 className="font-semibold">{prescription.name}</h3>
                    <p className="text-sm text-gray-600">
                      Dosage: {prescription.dosage}
                    </p>
                    <p className="text-sm text-gray-600">
                      Frequency: {prescription.frequency}
                    </p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveCall;