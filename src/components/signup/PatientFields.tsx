import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PatientFieldsProps {
  emergencyContact: string;
  address: string;
  onEmergencyContactChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export const PatientFields = ({
  emergencyContact,
  address,
  onEmergencyContactChange,
  onAddressChange,
}: PatientFieldsProps) => (
  <>
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