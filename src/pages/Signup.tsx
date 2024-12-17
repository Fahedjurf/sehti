import { SignupForm } from "@/components/signup/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-medical-dark">
              Create Account
            </h1>
            <p className="text-gray-600 mt-2">
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