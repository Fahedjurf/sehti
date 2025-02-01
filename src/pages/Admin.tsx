import { CertificateManagement } from "@/components/admin/CertificateManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { UserDetailsDialog } from "@/components/admin/UserDetailsDialog";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ThreeDotsMenu } from "@/components/ThreeDotsMenu";

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
  phoneNumber: string;
  address?: string;
  specialization?: string;
  experience?: string;
}

interface HelpRequest {
  id: number;
  message: string;
  status: string;
  timestamp: string;
  userEmail: string;
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
    phoneNumber: "123-456-7890",
  },
  {
    id: 2,
    name: "Emily Davis",
    type: "nurse",
    email: "emily.davis@example.com",
    status: "active",
    phoneNumber: "987-654-3210",
  },
  {
    id: 3,
    name: "John Doe",
    type: "patient",
    email: "john.doe@example.com",
    status: "active",
    phoneNumber: "555-555-5555",
  },
  {
    id: 4,
    name: "Jane Smith",
    type: "patient",
    email: "jane.smith@example.com",
    status: "active",
    phoneNumber: "444-444-4444",
  },
];

const Admin = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);

  useEffect(() => {
    // Load help requests from localStorage
    const storedRequests = localStorage.getItem("helpRequests");
    if (storedRequests) {
      setHelpRequests(JSON.parse(storedRequests));
    }
  }, []);

  const handleApprovedProfessional = (certificate: Certificate) => {
    const newUser: User = {
      id: users.length + 1,
      name: certificate.name,
      type: certificate.type,
      email: certificate.email,
      status: "active",
      phoneNumber: "Not set",
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleResolveHelpRequest = (requestId: number) => {
    const updatedRequests = helpRequests.map(request =>
      request.id === requestId ? { ...request, status: "resolved" } : request
    );
    setHelpRequests(updatedRequests);
    localStorage.setItem("helpRequests", JSON.stringify(updatedRequests));
    toast.success("Help request marked as resolved");
  };

  const getUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
  };

  const handleShowUserDetails = (email: string) => {
    const user = getUserByEmail(email);
    if (user) {
      setSelectedUser(user);
      setShowUserDialog(true);
    }
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent relative overflow-hidden">
      {/* Three Dots Menu */}
      <div className="absolute top-4 right-4 z-50">
        <ThreeDotsMenu />
      </div>

      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-medical-accent/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-medical-primary/10 blur-3xl animate-pulse delay-700" />
      
      <div className="absolute inset-0 bg-grid-medical-primary/[0.03] -z-10" />

      <div className="max-w-6xl mx-auto p-6 relative">
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold text-medical-dark mb-2 animate-fade-in">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 animate-fade-in delay-100">
            Manage certificates, users, and help requests
          </p>
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

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative">
            <h2 className="text-2xl font-semibold text-medical-dark mb-6">Help Requests</h2>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {helpRequests.length === 0 ? (
                  <p className="text-center text-gray-500">No help requests yet</p>
                ) : (
                  helpRequests.map((request) => {
                    const user = getUserByEmail(request.userEmail);
                    return (
                      <div
                        key={request.id}
                        className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <button
                              onClick={() => handleShowUserDetails(request.userEmail)}
                              className="font-medium text-medical-primary hover:text-medical-dark transition-colors hover:underline"
                            >
                              {user?.name || 'Unknown User'}
                            </button>
                            <p className="text-sm text-gray-500">
                              {new Date(request.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            request.status === "pending" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-green-100 text-green-800"
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{request.message}</p>
                        {request.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleResolveHelpRequest(request.id)}
                            className="w-full"
                          >
                            Mark as Resolved
                          </Button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <UserDetailsDialog
        open={showUserDialog}
        onOpenChange={setShowUserDialog}
        user={selectedUser}
        onUserUpdate={handleUserUpdate}
      />
    </div>
  );
};

export default Admin;
