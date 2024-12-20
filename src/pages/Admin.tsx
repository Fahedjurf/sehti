import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { CheckCircle, XCircle, UserPlus, UserMinus, ArrowLeft } from "lucide-react";

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
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApprove = (id: number) => {
    // In a real app, this would make an API call
    toast.success("Certificate approved successfully");
  };

  const handleReject = (id: number) => {
    // In a real app, this would make an API call
    toast.error("Certificate rejected");
  };

  const handleRemoveUser = (id: number) => {
    // In a real app, this would make an API call
    toast.success("User removed successfully");
  };

  const handleAddUser = () => {
    navigate("/signup");
  };

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
          <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative">
            <h2 className="text-xl font-semibold text-medical-dark mb-4">Pending Certificates</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingCertificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell className="capitalize">{cert.type}</TableCell>
                    <TableCell>{cert.specialization}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleApprove(cert.id)}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleReject(cert.id)}
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-medical-dark">User Management</h2>
              <Button
                className="bg-medical-primary hover:bg-medical-dark text-white"
                onClick={handleAddUser}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="capitalize">{user.type}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <UserMinus className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Certificate</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="mt-4">
              <iframe
                src={selectedCertificate.certificateUrl}
                className="w-full h-[500px]"
                title="Certificate Preview"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;