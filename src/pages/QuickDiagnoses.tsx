import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ThreeDotsMenu } from "@/components/ThreeDotsMenu";

const symptoms = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Shortness of breath",
  "Muscle aches",
  "Chills",
  "Sore throat",
  "Loss of taste or smell",
  "Nausea",
  "Diarrhea",
  "Runny or stuffy nose",
];

const QuickDiagnoses = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState<string | null>(null);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0 && !description.trim()) {
      toast.error("Please select symptoms or describe how you feel");
      return;
    }

    const mockDiagnosis = `Based on your symptoms, you may have one of the following conditions:

1. Common Cold
2. Seasonal Allergies
3. Viral Infection

Please consult with a healthcare professional for an accurate diagnosis.`;

    setDiagnosis(mockDiagnosis);
    toast.success("Diagnosis generated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent/30">
      {/* Three Dots Menu */}
      <div className="absolute top-4 right-4 z-50">
        <ThreeDotsMenu />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-medical-light">
          <h1 className="text-3xl font-bold text-center text-medical-dark mb-8">
            Quick Diagnoses
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-medical-dark">
                Select your symptoms:
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/50 p-6 rounded-lg">
                {symptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-3">
                    <Checkbox
                      id={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                      className="border-medical-primary data-[state=checked]:bg-medical-primary data-[state=checked]:border-medical-primary"
                    />
                    <label
                      htmlFor={symptom}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-medical-dark">
                Describe how you feel:
              </h2>
              <Textarea
                placeholder="Please describe your symptoms in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] bg-white/50 border-medical-light focus:border-medical-primary"
              />
            </div>

            <Button
              className="w-full bg-medical-primary hover:bg-medical-dark text-white transition-colors"
              onClick={handleSubmit}
            >
              Get Diagnosis
            </Button>

            {diagnosis && (
              <div className="mt-8 p-6 bg-white/90 rounded-lg border border-medical-primary/30 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-medical-dark">
                  Preliminary Diagnosis:
                </h3>
                <p className="whitespace-pre-line text-gray-700">{diagnosis}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickDiagnoses;
