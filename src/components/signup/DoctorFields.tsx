import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface DoctorFieldsProps {
  specialization: string;
  hospitalAddress: string;
  onSpecializationChange: (value: string) => void;
  onHospitalAddressChange: (value: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DoctorFields = ({
  specialization,
  hospitalAddress,
  onSpecializationChange,
  onHospitalAddressChange,
  onFileChange,
}: DoctorFieldsProps) => (
  <>
    <div className="space-y-2">
      <Label>Specialization</Label>
      <Select value={specialization} onValueChange={onSpecializationChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select specialization" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cardiology">Cardiology</SelectItem>
          <SelectItem value="dermatology">Dermatology</SelectItem>
          <SelectItem value="neurology">Neurology</SelectItem>
          <SelectItem value="orthopedics">Orthopedics</SelectItem>
          <SelectItem value="pediatrics">Pediatrics</SelectItem>
          <SelectItem value="psychiatry">Psychiatry</SelectItem>
          <SelectItem value="surgery">Surgery</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>

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