import { SignupForm } from "@/components/signup/SignupForm";
import { MedicalQuote } from "@/components/ui/medical-quote";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-center text-medical-dark mb-4">
                Create Account
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Join Sehti to access professional medical services
              </p>
            </div>
            
            <SignupForm />
          </div>

          <div className="space-y-8 hidden md:block">
            <div className="sticky top-8 space-y-8">
              <MedicalQuote />
              
              <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg border border-medical-accent/20">
                <h3 className="text-xl font-semibold text-medical-dark mb-4">
                  Why Choose Sehti?
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-medical-primary">•</span>
                    24/7 Access to Medical Professionals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medical-primary">•</span>
                    Secure and Private Healthcare Platform
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medical-primary">•</span>
                    Quick Medical Consultations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-medical-primary">•</span>
                    Medication Delivery Services
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;