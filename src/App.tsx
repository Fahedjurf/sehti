import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import MedicalHistory from "./pages/MedicalHistory";
import DoctorDashboard from "./pages/DoctorDashboard";
import QuickDiagnoses from "./pages/QuickDiagnoses";
import PharmaceuticalSupplies from "./pages/PharmaceuticalSupplies";
import DomesticNurses from "./pages/DomesticNurses";
import LiveCall from "./pages/LiveCall";
import DoctorLiveCall from "./pages/DoctorLiveCall";
import Schedule from "./pages/Schedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
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
            <Route path="/domestic-nurses" element={<DomesticNurses />} />
            <Route path="/live-call" element={<LiveCall />} />
            <Route path="/doctor-live-call" element={<DoctorLiveCall />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;