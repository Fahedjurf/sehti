import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface MedicalProfessionalFieldsProps {
  hospitalAddress: string;
  onHospitalAddressChange: (value: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MedicalProfessionalFields = ({
  hospitalAddress,
  onHospitalAddressChange,
  onFileChange,
}: MedicalProfessionalFieldsProps) => (
  <>
    <div className="space-y-2">
      <Label>Upload Certificate</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <input
          type="file"
          id="certificate"
          className="hidden"
          onChange={onFileChange}
          accept=".pdf,.doc,.docx"
        />
        <label
          htmlFor="certificate"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">
            Click to upload certificate
          </span>
        </label>
      </div>
    </div>

    <div className="space-y-2">
      <Label>Hospital/Clinic Address</Label>
      <Input
        type="text"
        value={hospitalAddress}
        onChange={(e) => onHospitalAddressChange(e.target.value)}
        required
      />
    </div>
  </>
);