import { CertificateManagement } from "@/components/admin/CertificateManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showOTPConfirm, setShowOTPConfirm] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPhone, setTempPhone] = useState("");

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

  const handleEdit = (field: string, value: string) => {
    if (field === 'email') {
      setTempEmail(value);
      setShowPasswordConfirm(true);
    } else if (field === 'phoneNumber') {
      setTempPhone(value);
      setShowOTPConfirm(true);
      toast.success("OTP sent to your phone number");
    } else {
      setEditingField(field);
      setTempValue(value);
    }
  };

  const handleSave = async (field: string) => {
    if (!selectedUser) return;

    let shouldUpdate = true;
    let newValue = tempValue;

    if (field === 'email') {
      newValue = tempEmail;
      // Here you would typically verify the password with your backend
      if (!confirmPassword) {
        shouldUpdate = false;
      }
      setShowPasswordConfirm(false);
      setConfirmPassword("");
    } else if (field === 'phoneNumber') {
      newValue = tempPhone;
      if (otp !== '123456') { // In real app, verify with backend
        toast.error("Invalid OTP");
        shouldUpdate = false;
      }
      setShowOTPConfirm(false);
      setOtp("");
    }

    if (shouldUpdate) {
      setUsers(users.map(u =>
        u.id === selectedUser.id ? { ...u, [field]: newValue } : u
      ));
      setSelectedUser({ ...selectedUser, [field]: newValue });
      toast.success(`${field} updated successfully`);
    }

    setEditingField(null);
    setTempValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent relative overflow-hidden">
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
                              className="font-medium text-medical-primary hover:text-medical-dark transition-colors"
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

      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label>Name</Label>
                  <div className="flex items-center gap-2">
                    {editingField === 'name' ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="flex-1"
                        />
                        <Button size="sm" onClick={() => handleSave('name')}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-gray-900">{selectedUser.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit('name', selectedUser.name)}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center gap-2">
                    {showPasswordConfirm ? (
                      <div className="space-y-4 w-full">
                        <Input
                          type="email"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          placeholder="New email"
                        />
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Enter password to confirm"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" onClick={() => handleSave('email')}>Confirm</Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setShowPasswordConfirm(false);
                              setConfirmPassword("");
                              setTempEmail("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-gray-900">{selectedUser.email}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit('email', selectedUser.email)}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="flex items-center gap-2">
                    {showOTPConfirm ? (
                      <div className="space-y-4 w-full">
                        <Input
                          type="tel"
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value)}
                          placeholder="New phone number"
                        />
                        <Input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" onClick={() => handleSave('phoneNumber')}>Verify</Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setShowOTPConfirm(false);
                              setOtp("");
                              setTempPhone("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-gray-900">{selectedUser.phoneNumber || "Not set"}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit('phoneNumber', selectedUser.phoneNumber || "")}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Field (only for doctors and nurses) */}
                {selectedUser.type !== "patient" && (
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-gray-900">{selectedUser.status}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newStatus = selectedUser.status === "active" ? "inactive" : "active";
                            setUsers(users.map(u =>
                              u.id === selectedUser.id ? { ...u, status: newStatus } : u
                            ));
                            setSelectedUser({ ...selectedUser, status: newStatus });
                            toast.success("Status updated successfully");
                          }}
                        >
                          Toggle
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional Fields (only for doctors and nurses) */}
                {(selectedUser.type === "doctor" || selectedUser.type === "nurse") && (
                  <>
                    {/* Specialization Field */}
                    <div className="space-y-2">
                      <Label>Specialization</Label>
                      <div className="flex items-center gap-2">
                        {editingField === 'specialization' ? (
                          <div className="flex-1 flex gap-2">
                            <Input
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => handleSave('specialization')}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>Cancel</Button>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-900">{selectedUser.specialization || "Not set"}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit('specialization', selectedUser.specialization || "")}
                            >
                              Edit
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Experience Field */}
                    <div className="space-y-2">
                      <Label>Experience</Label>
                      <div className="flex items-center gap-2">
                        {editingField === 'experience' ? (
                          <div className="flex-1 flex gap-2">
                            <Input
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => handleSave('experience')}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>Cancel</Button>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-gray-900">{selectedUser.experience || "Not set"}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit('experience', selectedUser.experience || "")}
                            >
                              Edit
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
