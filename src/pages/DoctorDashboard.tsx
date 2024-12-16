import { Calendar, Phone, UserRound, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";

// Mock doctor data - in a real app, this would come from your backend
const doctorProfile = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+1 234 567 8900",
  email: "john.doe@example.com",
  specialization: "Cardiologist",
  hospitalAddress: "123 Medical Center, Health City",
  sehtiId: "123456" // 6-digit ID for doctors
};

const DoctorDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <Avatar 
            className="h-10 w-10 bg-medical-light cursor-pointer hover:ring-2 hover:ring-medical-primary transition-all"
            onClick={() => setIsProfileOpen(true)}
          >
            <AvatarFallback className="text-medical-primary">
              <UserRound className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-medical-light rounded-full transition-colors">
              <MoreVertical className="h-6 w-6 text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <LanguageToggle />
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-medical-primary">Profile Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-semibold text-medical-dark">Name</div>
                <div>{doctorProfile.firstName} {doctorProfile.lastName}</div>
                
                <div className="font-semibold text-medical-dark">Phone</div>
                <div>{doctorProfile.phoneNumber}</div>
                
                <div className="font-semibold text-medical-dark">Email</div>
                <div className="break-all">{doctorProfile.email}</div>
                
                <div className="font-semibold text-medical-dark">Specialization</div>
                <div>{doctorProfile.specialization}</div>
                
                <div className="font-semibold text-medical-dark">Hospital Address</div>
                <div>{doctorProfile.hospitalAddress}</div>
                
                <div className="font-semibold text-medical-dark">Sehti ID</div>
                <div>{doctorProfile.sehtiId}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <h1 className="text-3xl font-bold text-medical-dark mb-6 text-center">
          Welcome Dr. {doctorProfile.lastName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/doctor-live-call")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Phone className="h-12 w-12 text-medical-primary mb-4" />
              <h2 className="text-xl font-semibold">Live Calls</h2>
              <p className="text-gray-500 mt-2">Manage your live consultations</p>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate("/schedule")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Calendar className="h-12 w-12 text-medical-primary mb-4" />
              <h2 className="text-xl font-semibold">Schedule</h2>
              <p className="text-gray-500 mt-2">View and manage appointments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;