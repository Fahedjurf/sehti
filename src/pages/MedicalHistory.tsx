import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
        <div className="space-y-4">
          {mockReports.map((report) => (
            <Card 
              key={report.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer hover:bg-medical-light/20"
              onClick={() => handleCardClick(report)}
            >
              <CardHeader>
                <div className="text-center mb-2">
                  <span className="text-lg font-semibold text-medical-primary">
                    {report.serviceType}
                  </span>
                </div>
                <CardTitle className="flex justify-between items-center text-center">
                  <span className="text-lg text-medical-primary">
                    {new Date(report.date).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600">
                    {report.doctorName}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2 text-center">
                  <strong>Location:</strong> {report.hospitalAddress}
                </p>
                <p className="text-gray-800 text-center">
                  <strong>Details:</strong> {report.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-medical-primary mb-4">
                Medical Report Details
              </DialogTitle>
              <DialogDescription>
                <div className="grid gap-4">
                  <div className="bg-medical-light/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-medical-dark mb-2">
                      {selectedReport?.serviceType}
                    </h3>
                    <p className="text-gray-600">
                      <strong>Date:</strong> {selectedReport?.date}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <strong className="text-medical-dark">Doctor:</strong>
                      <p className="text-gray-700">{selectedReport?.doctorName}</p>
                    </div>
                    
                    <div>
                      <strong className="text-medical-dark">Location:</strong>
                      <p className="text-gray-700">{selectedReport?.hospitalAddress}</p>
                    </div>
                    
                    <div>
                      <strong className="text-medical-dark">Details:</strong>
                      <p className="text-gray-700 whitespace-pre-wrap">
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