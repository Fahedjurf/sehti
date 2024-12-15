import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    bloodType: "",
    emergencyContact: "",
    address: "",
    hospitalAddress: "",
    certificate: null as File | null,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const generateId = (type: string) => {
    const random = Math.floor(Math.random() * 1000000000);
    switch (type) {
      case "doctor":
        return random.toString().padStart(6, '0').slice(0, 6);
      case "nurse":
        return random.toString().padStart(8, '0').slice(0, 8);
      case "patient":
        return random.toString().padStart(10, '0').slice(0, 10);
      default:
        return "";
    }
  };

  const handleSendOTP = () => {
    if (!formData.phoneNumber || !formData.fullName) {
      toast.error("Please enter your full name and phone number first");
      return;
    }
    // Simulate OTP sending
    toast.success("OTP sent to your phone number");
    setOtpSent(true);
  };

  const handleVerifyOTP = (otp: string) => {
    // Simulate OTP verification
    if (otp.length === 6) {
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, certificate: file }));
      toast.success("Certificate uploaded successfully");
    }
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

    if ((formData.userType === "doctor" || formData.userType === "nurse") && !formData.certificate) {
      toast.error("Please upload your certificate");
      return;
    }

    const userId = generateId(formData.userType);
    
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

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              <div className="space-y-2">
                <Label>User Type</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) => handleChange("userType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                <Label>Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    required
                  />
                  <Button 
                    type="button" 
                    onClick={handleSendOTP}
                    disabled={!formData.phoneNumber || !formData.fullName || otpVerified}
                  >
                    Send OTP
                  </Button>
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="space-y-2">
                  <Label>Enter OTP</Label>
                  <Input
                    type="text"
                    maxLength={6}
                    onChange={(e) => handleVerifyOTP(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                  />
                </div>
              )}

              {(formData.userType === "doctor" || formData.userType === "nurse") && (
                <>
                  <div className="space-y-2">
                    <Label>Upload Certificate</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        id="certificate"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="certificate"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">
                          Click to upload certificate
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hospital/Clinic Address</Label>
                    <Input
                      type="text"
                      value={formData.hospitalAddress}
                      onChange={(e) => handleChange("hospitalAddress", e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {formData.userType === "patient" && (
                <>
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <Select
                      value={formData.bloodType}
                      onValueChange={(value) => handleChange("bloodType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Emergency Contact (Optional)</Label>
                    <Input
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => handleChange("emergencyContact", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      required
                    />
                  </div>
                </>
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

              <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark">
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