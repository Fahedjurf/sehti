import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { MedicalQuote } from "@/components/ui/medical-quote";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    navigate("/dashboard");
  };

  const handleSendOTP = () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to your phone number");
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    toast.success("Password reset successfully");
    setIsResetOpen(false);
    setOtpSent(false);
    setOtpVerified(false);
    setPhoneNumber("");
    setOtp("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent/30 flex items-center justify-center">
      <div className="container px-4 py-12 grid md:grid-cols-2 gap-8 items-center max-w-6xl">
        <div className="space-y-8 hidden md:block">
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/lovable-uploads/999937a5-3a18-4ec2-a762-267d50a875ce.png" 
              alt="Sehti Logo" 
              className="h-24 w-auto mb-4"
            />
            <div className="text-4xl font-bold text-medical-dark">
              Welcome to <span className="text-medical-primary">Sehti</span>
            </div>
          </div>
          <p className="text-medical-dark/80 text-lg mb-8 text-center">
            Your trusted healthcare companion. Access professional medical services from the comfort of your home.
          </p>
          <MedicalQuote />
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-light/50">
            <div className="md:hidden flex flex-col items-center mb-8">
              <img 
                src="/lovable-uploads/999937a5-3a18-4ec2-a762-267d50a875ce.png" 
                alt="Sehti Logo" 
                className="h-16 w-auto mb-4"
              />
              <div className="text-3xl font-bold text-medical-dark">
                Welcome to <span className="text-medical-primary">Sehti</span>
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-medical-dark">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-medical-accent/20 focus:border-medical-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-medical-dark">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-medical-accent/20 focus:border-medical-primary"
                  required
                />
              </div>

              <Button
                type="button"
                variant="link"
                className="text-medical-primary hover:text-medical-dark w-full"
                onClick={() => setIsResetOpen(true)}
              >
                Forgot Password?
              </Button>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-medical-primary hover:bg-medical-dark"
                >
                  Log in
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!otpVerified ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                {otpSent && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter OTP</label>
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  className="w-full"
                  onClick={otpSent ? handleVerifyOTP : handleSendOTP}
                >
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;