import { useState } from "react";
import { UserTypeSelect } from "./UserTypeSelect";
import { PhoneVerification } from "./PhoneVerification";
import { DoctorFields } from "./DoctorFields";
import { MedicalProfessionalFields } from "./MedicalProfessionalFields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    hospitalAddress: "",
    certificate: null as File | null,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

    const userId = Math.random().toString(36).substring(7);
    toast.success(`Registration successful! Your ID: ${userId}`);
    
    // Navigate based on user type
    if (formData.userType === "nurse") {
      navigate("/nurse-dashboard");
    } else if (formData.userType === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleVerifyOTP = (otp: string) => {
    if (otp.length === 6) {
      setOtpVerified(true);
      toast.success("Phone number verified successfully!");
    }
  };

  return (
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
        onVerifyOTP={handleVerifyOTP}
      />

      {(formData.userType === "doctor" || formData.userType === "nurse") && (
        <MedicalProfessionalFields
          hospitalAddress={formData.hospitalAddress}
          onHospitalAddressChange={(value) => handleChange("hospitalAddress", value)}
          onFileChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.files?.[0] || null }))}
        />
      )}

      {formData.userType === "doctor" && (
        <DoctorFields
          specialization={formData.specialization}
          hospitalAddress={formData.hospitalAddress}
          onSpecializationChange={(value) => handleChange("specialization", value)}
          onHospitalAddressChange={(value) => handleChange("hospitalAddress", value)}
          onFileChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.files?.[0] || null }))}
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
  );
};