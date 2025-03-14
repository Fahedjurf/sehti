import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Clock, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ThreeDotsMenu } from "@/components/ThreeDotsMenu";

const appointments = [
  {
    id: 1,
    date: new Date(2024, 11, 18, 10, 30), // December 18th, 2024 at 10:30 AM
    patientName: "Sarah Johnson",
    reason: "Regular Checkup",
    duration: "30 minutes",
    status: "Confirmed",
    notes: "Patient has reported mild fever symptoms",
    contactNumber: "+1 234 567 8901",
    location: "Main Hospital - Room 302"
  },
  {
    id: 2,
    date: new Date(2024, 11, 22, 14, 0), // December 22nd, 2024 at 2:00 PM
    patientName: "Robert Smith",
    reason: "Dental Cleaning",
    duration: "45 minutes",
    status: "Confirmed",
    notes: "Regular dental cleaning and checkup",
    contactNumber: "+1 234 567 8902",
    location: ""
  },
  {
    id: 3,
    date: new Date(2024, 11, 28, 11, 0), // December 28th, 2024 at 11:00 AM
    patientName: "Emily Brown",
    reason: "Annual Physical",
    duration: "60 minutes",
    status: "Confirmed",
    notes: "Complete annual physical examination",
    contactNumber: "+1 234 567 8903",
    location: "Medical Center - Wing B"
  }
];

const Schedule = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();

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

  // Get today's appointments
  const todayAppointments = appointments.filter(
    (apt) => apt.date.toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container mx-auto p-6">
        {/* Three Dots Menu */}
        <div className="absolute top-4 right-4 z-50">
          <ThreeDotsMenu />
        </div>

        <Button
          onClick={() => navigate("/doctor-dashboard")}
          className="mb-8 bg-medical-primary hover:bg-medical-dark text-white flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold text-medical-dark mb-8 text-center">
          Appointments Schedule
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medical-dark">
                Total Appointments
              </CardTitle>
              <Users className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-dark">{appointments.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medical-dark">
                Today's Appointments
              </CardTitle>
              <Clock className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-dark">{todayAppointments.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-medical-dark">
                Next Appointment
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium text-medical-dark">
                {appointments[0]?.date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl">
            <Calendar
              mode="single"
              selected={selectedAppointment?.date}
              onSelect={handleDateSelect}
              modifiers={{
                hasAppointment: (date) => hasAppointments(date),
              }}
              modifiersStyles={{
                hasAppointment: {
                  textDecoration: "underline",
                  textDecorationColor: "#16a34a",
                  textDecorationThickness: "4px",
                  textUnderlineOffset: "8px",
                },
              }}
              className="rounded-lg border-2 border-medical-light p-4 mx-auto w-full"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center text-lg font-semibold",
                caption_label: "text-medical-dark",
                nav: "space-x-1 flex items-center",
                nav_button: "h-9 w-9 bg-medical-light text-medical-primary hover:bg-medical-accent rounded-lg transition-colors",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-medical-dark rounded-md w-10 sm:w-14 font-normal text-base",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-medical-light rounded-lg",
                day: "h-10 w-10 sm:h-14 sm:w-14 p-0 font-normal hover:bg-medical-light rounded-lg transition-colors",
                day_today: "bg-medical-accent text-medical-dark",
                day_selected: "bg-medical-primary text-white hover:bg-medical-dark",
              }}
            />
          </Card>

          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-medical-dark mb-4">
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {appointments.map((appointment) => (
                    <CarouselItem key={appointment.id}>
                      <Card className="p-4 border-2 border-medical-light hover:border-medical-primary transition-colors">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-medical-dark">
                            {appointment.patientName}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            {appointment.date.toLocaleDateString()} at{" "}
                            {appointment.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-sm text-gray-600">{appointment.reason}</p>
                          <p className="text-sm text-gray-600">
                            Location: {appointment.location || "Sehti application"}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </div>

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

                  <div className="font-semibold text-medical-dark">Location</div>
                  <div>{selectedAppointment.location || "Sehti application"}</div>

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
