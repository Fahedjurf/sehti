import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LocationMap } from "@/components/nurses/LocationMap";
import { ServiceSelection, nurseServices } from "@/components/nurses/ServiceSelection";
import { ThreeDotsMenu } from "@/components/ThreeDotsMenu";

const DomesticNurses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState({
    lat: 24.7136,
    lng: 46.6753
  });

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleSubmit = () => {
    if (!selectedService) {
      toast({
        title: "Selection Required",
        description: "Please select a nursing service",
        variant: "destructive"
      });
      return;
    }

    const selectedNurseService = nurseServices.find(service => service.id === selectedService);
    
    localStorage.setItem('nurseRequest', JSON.stringify({
      service: selectedNurseService,
      location: location,
      requestTime: new Date().toISOString()
    }));
    
    toast({
      title: "Service Requested",
      description: `A nurse will arrive in approximately ${selectedNurseService?.estimatedTime}`,
    });

    navigate("/nurse-tracking");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent relative overflow-hidden">
      {/* Three Dots Menu */}
      <div className="absolute top-4 right-4 z-50">
        <ThreeDotsMenu />
      </div>

      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-medical-accent/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-medical-primary/10 blur-3xl animate-pulse delay-700" />
      <div className="absolute inset-0 bg-grid-medical-primary/[0.03] -z-10" />

      <div className="max-w-4xl mx-auto p-6 relative">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold text-medical-dark mb-2 animate-fade-in">
            Request a Domestic Nurse
          </h1>
          <p className="text-gray-600 animate-fade-in delay-100">
            Professional healthcare in the comfort of your home
          </p>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-medical-primary/0 via-medical-primary to-medical-primary/0" />
        </div>

        <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative mb-6">
          <div className="h-[300px] w-full mb-6 rounded-lg overflow-hidden border border-medical-light/50">
            <LocationMap onLocationChange={handleLocationChange} />
          </div>

          <ServiceSelection 
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />

          <Button 
            className="w-full bg-medical-primary hover:bg-medical-dark text-white transition-all duration-300"
            onClick={handleSubmit}
          >
            Request Nurse
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DomesticNurses;