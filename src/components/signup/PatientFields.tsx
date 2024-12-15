import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PatientFieldsProps {
  bloodType: string;
  emergencyContact: string;
  address: string;
  onBloodTypeChange: (value: string) => void;
  onEmergencyContactChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export const PatientFields = ({
  bloodType,
  emergencyContact,
  address,
  onBloodTypeChange,
  onEmergencyContactChange,
  onAddressChange,
}: PatientFieldsProps) => (
  <>
    <div className="space-y-2">
      <Label>Blood Type</Label>
      <Select value={bloodType} onValueChange={onBloodTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select blood type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="A+">A+</SelectItem>
          <SelectItem value="A-">A-</SelectItem>
          <SelectItem value="B+">B+</SelectItem>
          <SelectItem value="B-">B-</SelectItem>
          <SelectItem value="AB+">AB+</SelectItem>
          <SelectItem value="AB-">AB-</SelectItem>
          <SelectItem value="O+">O+</SelectItem>
          <SelectItem value="O-">O-</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label>Emergency Contact (Optional)</Label>
      <Input
        type="tel"
        value={emergencyContact}
        onChange={(e) => onEmergencyContactChange(e.target.value)}
      />
    </div>

    <div className="space-y-2">
      <Label>Address</Label>
      <Input
        type="text"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        required
      />
    </div>
  </>
);