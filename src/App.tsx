import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import MedicalHistory from "./pages/MedicalHistory";
import DoctorDashboard from "./pages/DoctorDashboard";
import QuickDiagnoses from "./pages/QuickDiagnoses";
import PharmaceuticalSupplies from "./pages/PharmaceuticalSupplies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/quick-diagnoses" element={<QuickDiagnoses />} />
          <Route path="/pharmacy" element={<PharmaceuticalSupplies />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;