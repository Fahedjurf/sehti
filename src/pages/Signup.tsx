import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    bloodType: "",
    emergencyContact: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
    navigate("/dashboard");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                <label className="text-sm font-medium text-medical-dark">
                  User Type
                </label>
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
                <label className="text-sm font-medium text-medical-dark">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-medical-dark">
                  Password
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-medical-dark">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-medical-dark">
                  Blood Type
                </label>
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
                <label className="text-sm font-medium text-medical-dark">
                  Emergency Contact
                </label>
                <Input
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-medical-dark">
                  Address
                </label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
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