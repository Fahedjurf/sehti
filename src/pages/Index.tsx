import { Stethoscope, Users, Truck, Phone, UserRound, MoreVertical, History } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { useNavigate } from "react-router-dom";
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
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const userProfile = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+1 234 567 8900",
  email: "john.doe@example.com",
  emergencyContact: "+1 234 567 8901",
  address: "123 Medical Street, Health City",
  sehtiId: "1234567890"
};

const Index = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    {
      title: t("quickDiagnoses"),
      icon: Stethoscope,
      description: t("quickDiagnosesDesc"),
    },
    {
      title: t("domesticNurses"),
      icon: Users,
      description: t("domesticNursesDesc"),
    },
    {
      title: t("pharmaceuticalSupplies"),
      icon: Truck,
      description: t("pharmaceuticalSuppliesDesc"),
    },
    {
      title: t("liveCall"),
      icon: Phone,
      description: t("liveCallDesc"),
    },
  ];

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container px-4 py-12">
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
              <DropdownMenuItem onClick={() => navigate("/medical-history")}>
                <History className="mr-2 h-4 w-4" />
                {t("medicalHistory")}
              </DropdownMenuItem>
              <LanguageToggle />
              <DropdownMenuItem>{t("help")}</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                {t("signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-medical-primary">{t("profileDetails")}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-semibold text-medical-dark">{t("name")}</div>
                <div>{userProfile.firstName} {userProfile.lastName}</div>
                
                <div className="font-semibold text-medical-dark">{t("phone")}</div>
                <div>{userProfile.phoneNumber}</div>
                
                <div className="font-semibold text-medical-dark">{t("email")}</div>
                <div className="break-all">{userProfile.email}</div>
                
                <div className="font-semibold text-medical-dark">{t("emergencyContact")}</div>
                <div>{userProfile.emergencyContact}</div>
                
                <div className="font-semibold text-medical-dark">{t("address")}</div>
                <div>{userProfile.address}</div>
                
                <div className="font-semibold text-medical-dark">{t("sehtiId")}</div>
                <div>{userProfile.sehtiId}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-medical-dark mb-4">
            {t("welcome")} {userProfile.firstName}
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("accessServices")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;