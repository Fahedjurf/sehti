import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface UserTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const UserTypeSelect = ({ value, onChange }: UserTypeSelectProps) => (
  <div className="space-y-2">
    <Label>User Type</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select user type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="doctor">Doctor</SelectItem>
        <SelectItem value="nurse">Nurse</SelectItem>
        <SelectItem value="patient">Patient</SelectItem>
      </SelectContent>
    </Select>
  </div>
);