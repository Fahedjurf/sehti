import { CertificateManagement } from "@/components/admin/CertificateManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { useState } from "react";

interface Certificate {
  id: number;
  name: string;
  type: string;
  specialization: string;
  certificateUrl: string;
  status: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  type: string;
  email: string;
  status: string;
}

// Mock data with properly formatted URLs
const pendingCertificates = [
  {
    id: 1,
    name: "Dr. John Smith",
    type: "doctor",
    specialization: "Cardiology",
    certificateUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "pending",
    email: "john.smith@example.com",
  },
  {
    id: 2,
    name: "Nurse Sarah Johnson",
    type: "nurse",
    specialization: "Emergency Care",
    certificateUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "pending",
    email: "sarah.johnson@example.com",
  },
];

const initialUsers = [
  {
    id: 1,
    name: "Michael Brown",
    type: "doctor",
    email: "michael.brown@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "Emily Davis",
    type: "nurse",
    email: "emily.davis@example.com",
    status: "active",
  },
  {
    id: 3,
    name: "John Doe",
    type: "patient",
    email: "john.doe@example.com",
    status: "active",
  },
  {
    id: 4,
    name: "Jane Smith",
    type: "patient",
    email: "jane.smith@example.com",
    status: "active",
  },
];

const Admin = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleApprovedProfessional = (certificate: Certificate) => {
    const newUser: User = {
      id: users.length + 1,
      name: certificate.name,
      type: certificate.type,
      email: certificate.email,
      status: "active",
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-medical-accent/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-medical-primary/10 blur-3xl animate-pulse delay-700" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-grid-medical-primary/[0.03] -z-10" />

      <div className="max-w-6xl mx-auto p-6 relative">
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
            <CertificateManagement 
              pendingCertificates={pendingCertificates} 
              onApprove={handleApprovedProfessional}
            />
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