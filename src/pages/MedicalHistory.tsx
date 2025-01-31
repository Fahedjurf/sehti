import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Clipboard, Heart, Stethoscope, Star, StarOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface MedicalReport {
  id: string;
  date: string;
  hospitalAddress: string;
  details: string;
  doctorName: string;
  serviceType: string;
}

interface Feedback {
  reportId: string;
  rating: number;
  comment: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorName: string;
  date: string;
}

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Mock patient data - in a real app this would come from auth context
  const patientInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890"
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleCardClick = (report: MedicalReport) => {
    setSelectedReport(report);
  };

  const handleFeedbackSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    const feedback: Feedback = {
      reportId: selectedReport?.id || "",
      rating,
      comment,
      patientName: patientInfo.name,
      patientEmail: patientInfo.email,
      patientPhone: patientInfo.phone,
      doctorName: selectedReport?.doctorName || "",
      date: new Date().toISOString(),
    };

    // In a real app, this would be an API call to save the feedback
    console.log("Feedback submitted:", feedback);
    toast.success("Thank you for your feedback!");
    setShowFeedbackDialog(false);
    setRating(0);
    setComment("");
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

                  <div className="flex justify-center">
                    <Button
                      onClick={() => setShowFeedbackDialog(true)}
                      className="bg-medical-primary hover:bg-medical-dark text-white"
                    >
                      Give Feedback
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>

          <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Rate Your Experience</DialogTitle>
                <DialogDescription>
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          {star <= rating ? (
                            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <StarOff className="w-8 h-8 text-gray-300" />
                          )}
                        </button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Share your experience (optional)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button
                      onClick={handleFeedbackSubmit}
                      className="w-full bg-medical-primary hover:bg-medical-dark"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Dialog>
      </div>
    </div>
  );
};

export default MedicalHistory;
