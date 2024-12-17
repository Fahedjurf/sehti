import { Label } from "@/components/ui/label";
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