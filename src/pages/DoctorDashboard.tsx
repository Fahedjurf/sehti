import { Calendar, Phone, UserRound, MoreVertical, Users, Clock, CalendarCheck } from "lucide-react";
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
import { MedicalQuote } from "@/components/ui/medical-quote";

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

// Mock statistics data
const statistics = [
  {
    label: "Total Patients",
    value: "124",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    label: "Today's Appointments",
    value: "8",
    icon: Clock,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    label: "Completed Sessions",
    value: "96",
    icon: CalendarCheck,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const DoctorDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
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

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statistics.map((stat) => (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className={`${stat.bgColor} p-4 rounded-full mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-medical-dark">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="space-y-6">
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

          {/* Medical Quote Section */}
          <div className="space-y-6">
            <MedicalQuote />
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-medical-dark mb-4">
                  Today's Schedule Overview
                </h3>
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
              </CardContent>
            </Card>
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