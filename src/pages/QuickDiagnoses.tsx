import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

    // This is a mock diagnosis - in a real app, you would call an AI service
    const mockDiagnosis = `Based on your symptoms (${selectedSymptoms.join(
      ", "
    )}), you may have one of the following conditions:\n
    1. Common Cold
    2. Seasonal Allergies
    3. Viral Infection\n
    Please consult with a healthcare professional for an accurate diagnosis.`;

    setDiagnosis(mockDiagnosis);
    toast.success("Diagnosis generated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-medical-primary text-medical-primary hover:bg-medical-light hover:text-medical-dark transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-center text-medical-dark mb-6">
            Quick Diagnoses
          </h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Select your symptoms:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {symptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
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
              <label className="text-lg font-semibold">
                Describe what do you feel?
              </label>
              <Textarea
                placeholder="Please describe your symptoms in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              className="w-full bg-medical-primary hover:bg-medical-dark"
              onClick={handleSubmit}
            >
              Get Diagnosis
            </Button>

            {diagnosis && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-medical-primary">
                <h3 className="text-lg font-semibold mb-2">Preliminary Diagnosis:</h3>
                <p className="whitespace-pre-line">{diagnosis}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickDiagnoses;