import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Clipboard, Heart, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

interface MedicalReport {
  id: string;
  date: string;
  hospitalAddress: string;
  details: string;
  doctorName: string;
  serviceType: string;
}

// Mock data - in a real app, this would come from an API
const mockReports: MedicalReport[] = [
  {
    id: "1",
    date: "2024-03-15 14:30",
    hospitalAddress: "123 Medical Center, Health City",
    details: "Regular checkup - Blood pressure normal, heart rate stable",
    doctorName: "Dr. Sarah Johnson",
    serviceType: "Quick Diagnosis"
  },
  {
    id: "2",
    date: "2024-02-28 09:15",
    hospitalAddress: "456 City Hospital, Downtown",
    details: "Flu symptoms treatment - Prescribed antibiotics and rest",
    doctorName: "Dr. Michael Chen",
    serviceType: "Live Call Consultation"
  },
  {
    id: "3",
    date: "2024-01-10 11:45",
    hospitalAddress: "789 Family Clinic, Westside",
    details: "Annual physical examination - All tests within normal range",
    doctorName: "Dr. Emily Williams",
    serviceType: "In-Person Visit"
  }
];

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleCardClick = (report: MedicalReport) => {
    setSelectedReport(report);
  };

  // Map service types to icons
  const getIconForServiceType = (serviceType: string) => {
    switch (serviceType) {
      case "Quick Diagnosis":
        return <Stethoscope className="w-16 h-16 text-medical-primary" />;
      case "Live Call Consultation":
        return <Heart className="w-16 h-16 text-medical-primary" />;
      case "In-Person Visit":
        return <User className="w-16 h-16 text-medical-primary" />;
      default:
        return <Clipboard className="w-16 h-16 text-medical-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6 justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300 shadow-sm absolute left-6" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-medical-dark">Medical History</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockReports.map((report) => (
            <Card 
              key={report.id} 
              className="transform hover:scale-105 transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border-medical-accent/20 hover:border-medical-primary/40 hover:shadow-lg flex flex-col items-center justify-center p-6"
              onClick={() => handleCardClick(report)}
            >
              <div className="mb-4">
                {getIconForServiceType(report.serviceType)}
              </div>
              <CardHeader className="pb-2 text-center w-full">
                <CardTitle className="text-center text-sm font-medium text-medical-dark">
                  {new Date(report.date).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-medical-primary font-medium mb-1">
                  {report.serviceType}
                </p>
                <p className="text-xs text-gray-500">
                  {report.doctorName}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-2xl text-medical-primary mb-4">
                Medical Report Details
              </DialogTitle>
              <DialogDescription>
                <div className="space-y-6">
                  <div className="bg-medical-light/30 p-6 rounded-lg">
                    <h3 className="font-semibold text-xl text-medical-dark mb-3">
                      {selectedReport?.serviceType}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <strong>Date:</strong> 
                      {selectedReport && new Date(selectedReport.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid gap-4 bg-white/80 p-6 rounded-lg">
                    <div>
                      <strong className="text-medical-dark block mb-1">Doctor</strong>
                      <p className="text-gray-700 pl-4 border-l-2 border-medical-primary">
                        {selectedReport?.doctorName}
                      </p>
                    </div>
                    
                    <div>
                      <strong className="text-medical-dark block mb-1">Location</strong>
                      <p className="text-gray-700 pl-4 border-l-2 border-medical-primary">
                        {selectedReport?.hospitalAddress}
                      </p>
                    </div>
                    
                    <div>
                      <strong className="text-medical-dark block mb-1">Details</strong>
                      <p className="text-gray-700 pl-4 border-l-2 border-medical-primary whitespace-pre-wrap">
                        {selectedReport?.details}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MedicalHistory;