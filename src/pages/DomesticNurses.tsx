import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [location.lng, location.lat],
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker for current location
    new mapboxgl.Marker()
      .setLngLat([location.lng, location.lat])
      .addTo(map.current);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          
          if (map.current) {
            map.current.setCenter([newLocation.lng, newLocation.lat]);
            new mapboxgl.Marker()
              .setLngLat([newLocation.lng, newLocation.lat])
              .addTo(map.current);
          }
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

    return () => {
      map.current?.remove();
    };
  }, [toast]);

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
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-medical-accent/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-medical-primary/10 blur-3xl animate-pulse delay-700" />
      
      {/* Decorative pattern */}
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
          {/* Decorative underline */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-medical-primary/0 via-medical-primary to-medical-primary/0" />
        </div>

        <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative mb-6">
          {/* Decorative corner accent */}
          <div className="absolute -top-2 -right-2 w-20 h-20">
            <div className="absolute inset-0 bg-medical-primary/20 rounded-br-3xl animate-fade-in" />
          </div>

          <div className="h-[300px] w-full mb-6 rounded-lg overflow-hidden border border-medical-light/50">
            <div ref={mapContainer} className="w-full h-full" />
          </div>

          <div className="mb-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-medical-dark">Select Service Type</h2>
            <RadioGroup
              value={selectedService}
              onValueChange={setSelectedService}
              className="space-y-4"
            >
              {nurseServices.map((service) => (
                <div 
                  key={service.id} 
                  className="flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 hover:bg-medical-light/50"
                >
                  <RadioGroupItem value={service.id} id={service.id} />
                  <Label htmlFor={service.id} className="font-medium cursor-pointer">
                    <div className="text-medical-dark">{service.title}</div>
                    <div className="text-sm text-gray-600">{service.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

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