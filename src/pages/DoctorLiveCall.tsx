import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/components/live-call/types";
import { Product } from "@/components/pharmacy/types";
import { ReceivingCall } from "@/components/live-call/ReceivingCall";
import { ConsultationView } from "@/components/live-call/ConsultationView";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
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

  const handleAcceptCall = () => {
    setIsCallAccepted(true);
    toast({
      title: "Call Connected",
      description: "You are now connected with the patient.",
    });
  };

  const handleDeclineCall = () => {
    toast({
      title: "Call Declined",
      description: "You have declined the call.",
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
      {!isCallAccepted ? (
        <ReceivingCall
          patientName="John Doe"
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
        />
      ) : (
        <ConsultationView
          onBack={() => navigate("/doctor-dashboard")}
          onEndCall={handleEndCall}
          onViewHistory={() => setShowMedicalHistory(true)}
          messages={messages}
          newMessage={newMessage}
          onMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
          prescriptions={prescriptions}
          onAddPrescription={handleAddPrescription}
          onRemovePrescription={handleRemovePrescription}
        />
      )}

      <Dialog open={showMedicalHistory} onOpenChange={setShowMedicalHistory}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Patient Medical History</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Doctor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMedicalHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>{record.treatment}</TableCell>
                    <TableCell>{record.doctor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorLiveCall;
