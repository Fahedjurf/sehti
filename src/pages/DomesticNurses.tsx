import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const nurseServices = [
  {
    id: "general",
    title: "General Care",
    description: "Basic medical care and assistance with daily activities",
    estimatedTime: "30 minutes"
  },
  {
    id: "specialized",
    title: "Specialized Care",
    description: "Advanced medical procedures and monitoring",
    estimatedTime: "45 minutes"
  },
  {
    id: "elderly",
    title: "Elderly Care",
    description: "Specialized care for elderly patients",
    estimatedTime: "40 minutes"
  }
];

const DomesticNurses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState({
    lat: 24.7136,
    lng: 46.6753
  });

  // Get user's current location when component mounts
  useState(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Please enable location services.",
            variant: "destructive"
          });
        }
      );
    }
  });

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
    
    toast({
      title: "Service Requested",
      description: `A nurse will arrive in approximately ${selectedNurseService?.estimatedTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-medical-dark mb-6 text-center">
          Request a Domestic Nurse
        </h1>

        <Card className="p-6 mb-6">
          <div className="h-[300px] w-full mb-6">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={location}
                zoom={15}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Service Type</h2>
            <RadioGroup
              value={selectedService}
              onValueChange={setSelectedService}
              className="space-y-4"
            >
              {nurseServices.map((service) => (
                <div key={service.id} className="flex items-start space-x-3">
                  <RadioGroupItem value={service.id} id={service.id} />
                  <Label htmlFor={service.id} className="font-medium cursor-pointer">
                    <div>{service.title}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button 
            className="w-full"
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
