import { SignupForm } from "@/components/signup/SignupForm";
import { ThreeDotsMenu } from "@/components/ThreeDotsMenu";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent relative overflow-hidden">
      {/* Three Dots Menu */}
      <div className="absolute top-4 right-4 z-50">
        <ThreeDotsMenu />
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-medical-accent/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-medical-primary/10 blur-3xl animate-pulse delay-700" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-grid-medical-primary/[0.03] -z-10" />
      
      <div className="container px-4 py-12 relative">
        <div className="max-w-lg mx-auto">
          {/* Card with glass effect */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-accent/20 relative">
            {/* Decorative corner accent */}
            <div className="absolute -top-2 -right-2 w-20 h-20">
              <div className="absolute inset-0 bg-medical-primary/20 rounded-br-3xl animate-fade-in" />
            </div>
            
            <div className="text-center mb-8 relative">
              <h1 className="text-4xl font-bold text-medical-dark animate-fade-in">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2 animate-fade-in delay-100">
                Join Sehti to access professional medical services
              </p>
              
              {/* Decorative underline */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-medical-primary/0 via-medical-primary to-medical-primary/0" />
            </div>
            
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;