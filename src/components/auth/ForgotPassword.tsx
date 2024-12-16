import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PhoneVerification } from "@/components/signup/PhoneVerification";

interface ForgotPasswordProps {
  onClose: () => void;
}

export const ForgotPassword = ({ onClose }: ForgotPasswordProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    toast.success("OTP sent to your phone number");
    setOtpSent(true);
  };

  const handleVerifyOTP = (otp: string) => {
    if (otp.length === 6) {
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    }
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    // Here you would typically make an API call to reset the password
    toast.success("Password reset successfully");
    onClose();
  };

  return (
    <div className="space-y-4">
      {!otpVerified ? (
        <PhoneVerification
          phoneNumber={phoneNumber}
          onPhoneChange={setPhoneNumber}
          onSendOTP={handleSendOTP}
          otpSent={otpSent}
          otpVerified={otpVerified}
          onVerifyOTP={handleVerifyOTP}
        />
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <Button
            className="w-full bg-medical-primary hover:bg-medical-dark"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </div>
      )}
    </div>
  );
};