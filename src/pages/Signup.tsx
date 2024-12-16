import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { UserTypeSelect } from "@/components/signup/UserTypeSelect";
import { PhoneVerification } from "@/components/signup/PhoneVerification";
import { DoctorFields } from "@/components/signup/DoctorFields";
import { MedicalProfessionalFields } from "@/components/signup/MedicalProfessionalFields";
import { PatientFields } from "@/components/signup/PatientFields";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    emergencyContact: "",
    address: "",
    hospitalAddress: "",
    specialization: "",
    certificate: null as File | null,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const generateId = (type: string) => {
    const random = Math.floor(Math.random() * 1000000000);
    switch (type) {
      case "doctor":
        return random.toString().padStart(6, "0").slice(0, 6);
      case "nurse":
        return random.toString().padStart(8, "0").slice(0, 8);
      case "patient":
        return random.toString().padStart(10, "0").slice(0, 10);
      default:
        return "";
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify your phone number first");
      return;
    }

    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    if (formData.userType === "doctor" && !formData.certificate) {
      toast.error("Please upload your certificate");
      return;
    }

    const userId = generateId(formData.userType);
    toast.success(`Sehti-ID has been sent to ${formData.email}`);

    if (formData.userType === "doctor") {
      toast.success("Your registration is under review. Your Doctor ID is: " + userId);
      navigate("/doctor-dashboard");
    } else if (formData.userType === "nurse") {
      toast.success("Your registration is under review. Your Nurse ID is: " + userId);
      navigate("/doctor-dashboard");
    } else {
      toast.success("Registration successful! Your Patient ID is: " + userId);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-center text-medical-dark mb-8">
            Create Account
          </h1>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-light/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <UserTypeSelect
                value={formData.userType}
                onChange={(value) => handleChange("userType", value)}
              />

              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <PhoneVerification
                phoneNumber={formData.phoneNumber}
                onPhoneChange={(value) => handleChange("phoneNumber", value)}
                onSendOTP={() => setOtpSent(true)}
                otpSent={otpSent}
                otpVerified={otpVerified}
                onVerifyOTP={() => setOtpVerified(true)}
              />

              {formData.userType === "doctor" && (
                <DoctorFields
                  specialization={formData.specialization}
                  hospitalAddress={formData.hospitalAddress}
                  onSpecializationChange={(value) => handleChange("specialization", value)}
                  onHospitalAddressChange={(value) => handleChange("hospitalAddress", value)}
                  onFileChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.files?.[0] || null }))}
                />
              )}

              {formData.userType === "nurse" && (
                <MedicalProfessionalFields
                  hospitalAddress={formData.hospitalAddress}
                  onHospitalAddressChange={(value) => handleChange("hospitalAddress", value)}
                  onFileChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.files?.[0] || null }))}
                />
              )}

              {formData.userType === "patient" && (
                <PatientFields
                  emergencyContact={formData.emergencyContact}
                  address={formData.address}
                  onEmergencyContactChange={(value) => handleChange("emergencyContact", value)}
                  onAddressChange={(value) => handleChange("address", value)}
                />
              )}

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-medical-primary hover:bg-medical-dark"
              >
                Create Account
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Back to Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;