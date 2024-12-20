import { CertificateManagement } from "@/components/admin/CertificateManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - in a real app, this would come from your backend
const pendingCertificates = [
  {
    id: 1,
    name: "Dr. John Smith",
    type: "doctor",
    specialization: "Cardiology",
    certificateUrl: "/path/to/certificate.pdf",
    status: "pending",
  },
  {
    id: 2,
    name: "Nurse Sarah Johnson",
    type: "nurse",
    specialization: "Emergency Care",
    certificateUrl: "/path/to/certificate.pdf",
    status: "pending",
  },
];

const users = [
  {
    id: 1,
    name: "Dr. Michael Brown",
    type: "doctor",
    email: "michael.brown@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "Nurse Emily Davis",
    type: "nurse",
    email: "emily.davis@example.com",
    status: "active",
  },
];

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-medical-accent/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-medical-primary/10 blur-3xl animate-pulse delay-700" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-grid-medical-primary/[0.03] -z-10" />

      <div className="max-w-6xl mx-auto p-6 relative">
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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 animate-fade-in delay-100">
            Manage certificates and users
          </p>
          {/* Decorative underline */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-medical-primary/0 via-medical-primary to-medical-primary/0" />
        </div>

        <div className="grid gap-6">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative">
            <CertificateManagement pendingCertificates={pendingCertificates} />
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative">
            <UserManagement users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;