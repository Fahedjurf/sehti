import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { X, ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatSection } from "@/components/live-call/ChatSection";
import { PrescriptionCard } from "@/components/live-call/PrescriptionCard";
import { Message, Prescription } from "@/components/live-call/types";
import { samplePrescriptions } from "@/components/live-call/samplePrescriptions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LiveCall = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [prescriptions] = useState<Prescription[]>(samplePrescriptions);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1 234 567 8900",
    email: "john.doe@example.com",
    emergencyContact: "+1 234 567 8901",
    address: "123 Medical Street, Health City",
    sehtiId: "1234567890"
  });

  const handleSendMessage = () => {
    // Function to handle sending messages
  };

  const handleEndCall = () => {
    // Function to handle ending the call
  };

  const handleAddToPharmacy = () => {
    localStorage.setItem('prescribedMedications', JSON.stringify(prescriptions));
    toast({
      title: "Prescriptions Added",
      description: "Your prescriptions have been added to your pharmacy cart. You can view them later in the pharmacy section.",
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleInputChange = (field: keyof typeof editedProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
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

          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Prescribed Medications</h2>
              </div>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <PrescriptionCard
                      key={prescription.id}
                      prescription={prescription}
                    />
                  ))}
                  {prescriptions.length > 0 && (
                    <Button
                      className="w-full mt-4 flex items-center gap-2"
                      onClick={handleAddToPharmacy}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Order Prescribed Medications
                    </Button>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-medical-primary">Profile Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        value={editedProfile.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        value={editedProfile.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={editedProfile.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Emergency Contact</Label>
                    <Input
                      value={editedProfile.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={editedProfile.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sehti ID</Label>
                    <Input
                      value={editedProfile.sehtiId}
                      readOnly
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 items-center gap-4">
                  <div className="font-semibold text-medical-dark">Name</div>
                  <div>{editedProfile.firstName} {editedProfile.lastName}</div>
                  
                  <div className="font-semibold text-medical-dark">Phone</div>
                  <div>{editedProfile.phoneNumber}</div>
                  
                  <div className="font-semibold text-medical-dark">Email</div>
                  <div className="break-all">{editedProfile.email}</div>
                  
                  <div className="font-semibold text-medical-dark">Emergency Contact</div>
                  <div>{editedProfile.emergencyContact}</div>
                  
                  <div className="font-semibold text-medical-dark">Address</div>
                  <div>{editedProfile.address}</div>
                  
                  <div className="font-semibold text-medical-dark">Sehti ID</div>
                  <div>{editedProfile.sehtiId}</div>
                </div>
              )}
              <Button
                className="w-full mt-4"
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LiveCall;
