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
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-medical-dark">
            {t("welcome")} {nurseProfile.firstName}
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
                <DropdownMenuItem>{t("helpCenter")}</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
            isAvailable 
              ? 'bg-gradient-to-br from-medical-primary to-medical-dark border-2 border-medical-primary/20' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200'
          }`}>
            <div className="absolute inset-0 bg-grid-medical-primary opacity-10"></div>
            <Button
              onClick={toggleAvailability}
              variant={isAvailable ? "default" : "secondary"}
              className={`relative w-full h-full min-h-[200px] text-xl font-semibold transition-all duration-300 ${
                isAvailable 
                  ? 'text-white hover:bg-medical-dark/10' 
                  : 'text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full ${
                  isAvailable 
                    ? 'bg-white/20' 
                    : 'bg-gray-200'
                }`}>
                  <UserRound className={`h-8 w-8 ${
                    isAvailable 
                      ? 'text-white' 
                      : 'text-gray-600'
                  }`} />
                </div>
                {isAvailable ? t("available") : t("notAvailable")}
              </div>
            </Button>
          </div>

          <div 
            onClick={handleSchedule}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-medical-light/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-medical-light rounded-full">
                <Calendar className="h-8 w-8 text-medical-primary" />
              </div>
              <h3 className="text-xl font-semibold text-medical-dark">{t("viewSchedule")}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MedicalQuote />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-medical-dark mb-4">{t("todaySchedule")}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-medical-light rounded-lg">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">{t("homeCareVisit")}</p>
                </div>
                <p className="text-medical-primary">10:00 AM</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-medical-light rounded-lg">
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-600">{t("postSurgeryCare")}</p>
                </div>
                <p className="text-medical-primary">2:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-medical-primary">{t("profileDetails")}</DialogTitle>
              <DialogDescription>
                {t("accessServices")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-semibold text-medical-dark">{t("name")}</div>
                <div>{nurseProfile.firstName} {nurseProfile.lastName}</div>
                
                <div className="font-semibold text-medical-dark">{t("phone")}</div>
                <div>{nurseProfile.phoneNumber}</div>
                
                <div className="font-semibold text-medical-dark">{t("email")}</div>
                <div className="break-all">{nurseProfile.email}</div>
                
                <div className="font-semibold text-medical-dark">{t("specialization")}</div>
                <div>{nurseProfile.specialization}</div>
                
                <div className="font-semibold text-medical-dark">{t("hospitalAddress")}</div>
                <div>{nurseProfile.hospitalAddress}</div>
                
                <div className="font-semibold text-medical-dark">{t("sehtiId")}</div>
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