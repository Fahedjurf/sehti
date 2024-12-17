import { UserRound, MoreVertical, PhoneCall, Calendar } from "lucide-react";
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
import { MedicalQuote } from "@/components/ui/medical-quote";
import { DashboardStats } from "@/components/doctor/DashboardStats";

const doctorProfile = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+1 234 567 8900",
  email: "john.doe@example.com",
  specialization: "Cardiologist",
  hospitalAddress: "123 Medical Center, Health City",
  sehtiId: "123456"
};

const DoctorDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleLiveCall = () => {
    navigate("/doctor-live-call");
  };

  const handleSchedule = () => {
    navigate("/schedule");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-medical-dark">
            Welcome Dr. {doctorProfile.lastName}
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
                <LanguageToggle />
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

        {/* Medical Quote and Schedule Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MedicalQuote />
          </div>
          
          {/* Schedule Overview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-medical-dark">Today's Schedule</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleLiveCall}
                  className="p-2 hover:bg-medical-light rounded-full transition-colors"
                  title="Live Call"
                >
                  <PhoneCall className="h-6 w-6 text-medical-primary" />
                </button>
                <button 
                  onClick={handleSchedule}
                  className="p-2 hover:bg-medical-light rounded-full transition-colors"
                  title="View Schedule"
                >
                  <Calendar className="h-6 w-6 text-medical-primary" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-medical-light rounded-lg">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Follow-up Consultation</p>
                </div>
                <p className="text-medical-primary">10:00 AM</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-medical-light rounded-lg">
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-600">Initial Consultation</p>
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
      </div>
    </div>
  );
};

export default DoctorDashboard;