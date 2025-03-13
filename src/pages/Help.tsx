
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ThreeDotsMenu } from "@/components/ThreeDotsMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useResponsive } from "@/hooks/use-mobile";

const Help = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isMobile } = useResponsive();
  const [helpRequest, setHelpRequest] = useState("");
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (!helpRequest.trim()) {
      toast({
        title: "Error",
        description: "Please enter your help request",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be stored in a database
    const helpData = {
      id: Date.now(),
      message: helpRequest,
      status: "pending",
      timestamp: new Date().toISOString(),
      userEmail: "john.doe@example.com", // This would come from auth context
    };

    // Store in localStorage for demo purposes
    const existingRequests = JSON.parse(localStorage.getItem("helpRequests") || "[]");
    localStorage.setItem("helpRequests", JSON.stringify([...existingRequests, helpData]));

    toast({
      title: "Success",
      description: "Your help request has been submitted",
    });
    setHelpRequest("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-4 md:p-6">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute top-0 right-0 z-50">
          <ThreeDotsMenu />
        </div>

        <Button
          variant="outline"
          className="mb-4 md:mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Button>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-8 shadow-lg border border-medical-light">
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-medical-dark mb-6 md:mb-8`}>
            {t("helpTitle")}
          </h1>

          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-medical-dark mb-2`}>
                {t("howCanWeHelp")}
              </h2>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                Please describe your issue or question in detail below, and our admin team will assist you as soon as possible.
              </p>
            </div>

            <Textarea
              placeholder="Type your message here..."
              value={helpRequest}
              onChange={(e) => setHelpRequest(e.target.value)}
              className="min-h-[150px] md:min-h-[200px] bg-white/50"
            />

            <Button
              onClick={handleSubmit}
              className="w-full bg-medical-primary hover:bg-medical-dark text-white transition-colors"
            >
              {t("submitRequest")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
