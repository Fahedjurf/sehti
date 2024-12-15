import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneVerificationProps {
  phoneNumber: string;
  onPhoneChange: (value: string) => void;
  onSendOTP: () => void;
  otpSent: boolean;
  otpVerified: boolean;
  onVerifyOTP: (otp: string) => void;
}

export const PhoneVerification = ({
  phoneNumber,
  onPhoneChange,
  onSendOTP,
  otpSent,
  otpVerified,
  onVerifyOTP,
}: PhoneVerificationProps) => (
  <div className="space-y-2">
    <Label>Phone Number</Label>
    <div className="flex gap-2">
      <Input
        type="tel"
        value={phoneNumber}
        onChange={(e) => onPhoneChange(e.target.value)}
        required
      />
      <Button 
        type="button" 
        onClick={onSendOTP}
        disabled={!phoneNumber || otpVerified}
        className="bg-medical-primary text-white hover:bg-medical-dark"
      >
        Send OTP
      </Button>
    </div>
    {otpSent && !otpVerified && (
      <div className="space-y-2">
        <Label>Enter OTP</Label>
        <Input
          type="text"
          maxLength={6}
          onChange={(e) => onVerifyOTP(e.target.value)}
          placeholder="Enter 6-digit OTP"
        />
      </div>
    )}
  </div>
);