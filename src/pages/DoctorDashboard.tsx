import { Calendar, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-medical-dark mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Phone className="h-12 w-12 text-medical-primary mb-4" />
              <h2 className="text-xl font-semibold">Live Calls</h2>
              <p className="text-gray-500 mt-2">Manage your live consultations</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Calendar className="h-12 w-12 text-medical-primary mb-4" />
              <h2 className="text-xl font-semibold">Schedule</h2>
              <p className="text-gray-500 mt-2">View and manage appointments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;