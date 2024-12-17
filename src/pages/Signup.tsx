import { SignupForm } from "@/components/signup/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/lovable-uploads/999937a5-3a18-4ec2-a762-267d50a875ce.png" 
              alt="Sehti Logo" 
              className="h-20 w-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-center text-medical-dark">
              Create Account
            </h1>
            <p className="text-center text-gray-600 mt-2">
              Join Sehti to access professional medical services
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;