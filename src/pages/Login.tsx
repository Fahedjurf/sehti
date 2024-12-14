import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [sehtiId, setSehtiId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent">
      <div className="container px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-center text-medical-dark mb-8">
            Welcome to Sehti
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-medical-light/50">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="sehtiId" className="text-sm font-medium text-medical-dark">
                  Sehti-ID
                </label>
                <Input
                  id="sehtiId"
                  type="text"
                  value={sehtiId}
                  onChange={(e) => setSehtiId(e.target.value)}
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
                  required
                />
              </div>

              <div className="space-y-4">
                <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark">
                  Log in
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;