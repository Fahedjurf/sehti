import { SignupForm } from "@/components/signup/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container px-4 py-12">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-center text-medical-dark mb-4">
            Create Account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Join Sehti to access professional medical services
          </p>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;