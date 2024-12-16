import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatSection } from "@/components/live-call/ChatSection";
import { PrescriptionCard } from "@/components/live-call/PrescriptionCard";
import { PrescriptionManager } from "@/components/doctor/PrescriptionManager";
import { Message } from "@/components/live-call/types";
import { Product } from "@/components/pharmacy/types";
import { useToast } from "@/components/ui/use-toast";

const DoctorLiveCall = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [prescriptions, setPrescriptions] = useState<Product[]>([]);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="container mx-auto p-4 max-w-6xl">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/doctor-dashboard")}
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
                Patient Name
              </div>
            </div>

            <ChatSection
              messages={messages}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Prescribed Medications</h2>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <PrescriptionCard
                      key={prescription.id}
                      prescription={{
                        id: prescription.id,
                        name: prescription.name,
                        dosage: "As prescribed",
                        frequency: prescription.usage,
                        price: prescription.price,
                        sideEffects: prescription.sideEffects,
                        description: prescription.fullDescription,
                      }}
                      onRemove={handleRemovePrescription}
                    />
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <PrescriptionManager onAddPrescription={handleAddPrescription} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLiveCall;