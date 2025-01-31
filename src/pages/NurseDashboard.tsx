import { UserRound, MoreVertical, Calendar } from "lucide-react";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "@/components/doctor/DashboardStats";
import { MedicalQuote } from "@/components/ui/medical-quote";

const nurseProfile = {
  firstName: "Jane",
  lastName: "Smith",
  phoneNumber: "+1 234 567 8900",
  email: "jane.smith@example.com",
  specialization: "General Care",
  hospitalAddress: "123 Medical Center, Health City",
  sehtiId: "N123456",
  userType: "nurse"
};

const NurseDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSchedule = () => {
    navigate("/schedule");
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-medical-dark">
            Welcome Nurse {nurseProfile.lastName}
          </h1>
          
          <div className="flex items-center gap-4">
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
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Statistics Section */}
        <DashboardStats />

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button
            onClick={toggleAvailability}
            variant={isAvailable ? "default" : "secondary"}
            className={`h-full min-h-[200px] text-xl font-semibold ${
              isAvailable ? 'bg-medical-primary hover:bg-medical-primary/90' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </Button>

          <div 
            onClick={handleSchedule}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-medical-light/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-medical-light rounded-full">
                <Calendar className="h-8 w-8 text-medical-primary" />
              </div>
              <h3 className="text-xl font-semibold text-medical-dark">View Schedule</h3>
            </div>
          </div>
        </div>

        {/* Medical Quote and Schedule Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MedicalQuote />
          </div>
          
          {/* Schedule Overview */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-medical-dark mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-medical-light rounded-lg">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Home Care Visit</p>
                </div>
                <p className="text-medical-primary">10:00 AM</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-medical-light rounded-lg">
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-600">Post-Surgery Care</p>
                </div>
                <p className="text-medical-primary">2:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Dialog */}
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-medical-primary">Profile Details</DialogTitle>
              <DialogDescription>
                Your professional information and contact details
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-semibold text-medical-dark">Name</div>
                <div>{nurseProfile.firstName} {nurseProfile.lastName}</div>
                
                <div className="font-semibold text-medical-dark">Phone</div>
                <div>{nurseProfile.phoneNumber}</div>
                
                <div className="font-semibold text-medical-dark">Email</div>
                <div className="break-all">{nurseProfile.email}</div>
                
                <div className="font-semibold text-medical-dark">Specialization</div>
                <div>{nurseProfile.specialization}</div>
                
                <div className="font-semibold text-medical-dark">Hospital Address</div>
                <div>{nurseProfile.hospitalAddress}</div>
                
                <div className="font-semibold text-medical-dark">Sehti ID</div>
                <div>{nurseProfile.sehtiId}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NurseDashboard;