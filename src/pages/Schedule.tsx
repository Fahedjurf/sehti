import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock appointments data - in a real app, this would come from your backend
const appointments = [
  {
    id: 1,
    date: new Date(2024, 3, 15, 10, 30),
    patientName: "Sarah Johnson",
    reason: "Regular Checkup",
    duration: "30 minutes",
    status: "Confirmed",
    notes: "Patient has reported mild fever symptoms",
    contactNumber: "+1 234 567 8901"
  },
  {
    id: 2,
    date: new Date(2024, 3, 15, 14, 0),
    patientName: "Michael Smith",
    reason: "Follow-up Consultation",
    duration: "45 minutes",
    status: "Confirmed",
    notes: "Post-surgery follow-up",
    contactNumber: "+1 234 567 8902"
  },
  {
    id: 3,
    date: new Date(2024, 3, 17, 11, 0),
    patientName: "Emma Davis",
    reason: "Initial Consultation",
    duration: "60 minutes",
    status: "Pending",
    notes: "New patient consultation",
    contactNumber: "+1 234 567 8903"
  },
  {
    id: 4,
    date: new Date(2024, 3, 20, 9, 0),
    patientName: "James Wilson",
    reason: "Vaccination",
    duration: "15 minutes",
    status: "Confirmed",
    notes: "Annual flu shot",
    contactNumber: "+1 234 567 8904"
  },
  {
    id: 5,
    date: new Date(2024, 3, 22, 13, 30),
    patientName: "Linda Brown",
    reason: "Blood Test Results",
    duration: "30 minutes",
    status: "Confirmed",
    notes: "Review quarterly blood test results",
    contactNumber: "+1 234 567 8905"
  }
];

const Schedule = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();

  // Function to check if a date has appointments
  const hasAppointments = (date: Date) => {
    return appointments.some(
      (apt) => apt.date.toDateString() === date.toDateString()
    );
  };

  // Function to handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const dayAppointments = appointments.filter(
      (apt) => apt.date.toDateString() === date.toDateString()
    );

    if (dayAppointments.length > 0) {
      setSelectedAppointment(dayAppointments[0]);
      setIsDetailsOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="gap-2 text-medical-primary hover:text-medical-primary hover:bg-medical-light"
            onClick={() => navigate("/doctor-dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-medical-dark mb-6 text-center">
          Appointments Schedule
        </h1>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <Calendar
            mode="single"
            selected={selectedAppointment?.date}
            onSelect={handleDateSelect}
            modifiers={{
              hasAppointment: (date) => hasAppointments(date),
            }}
            modifiersStyles={{
              hasAppointment: {
                backgroundColor: "rgb(var(--medical-primary) / 0.15)",
                fontWeight: "bold",
              },
            }}
            className="rounded-md border"
          />
        </Card>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-medical-primary">
                Appointment Details
              </DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <div className="font-semibold text-medical-dark">Patient Name</div>
                  <div>{selectedAppointment.patientName}</div>

                  <div className="font-semibold text-medical-dark">Date & Time</div>
                  <div>
                    {selectedAppointment.date.toLocaleDateString()} at{" "}
                    {selectedAppointment.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <div className="font-semibold text-medical-dark">Duration</div>
                  <div>{selectedAppointment.duration}</div>

                  <div className="font-semibold text-medical-dark">Reason</div>
                  <div>{selectedAppointment.reason}</div>

                  <div className="font-semibold text-medical-dark">Status</div>
                  <div>{selectedAppointment.status}</div>

                  <div className="font-semibold text-medical-dark">Contact Number</div>
                  <div>{selectedAppointment.contactNumber}</div>

                  <div className="font-semibold text-medical-dark">Notes</div>
                  <div>{selectedAppointment.notes}</div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Schedule;