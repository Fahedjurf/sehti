import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: number;
  name: string;
  type: string;
  email: string;
  status: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  specialization?: string;
  experience?: string;
}

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUserUpdate: (updatedUser: User) => void;
}

export const UserDetailsDialog = ({ 
  open, 
  onOpenChange, 
  user, 
  onUserUpdate 
}: UserDetailsDialogProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
    setError(null);
  };

  const handleSave = (field: string) => {
    if (!user) return;

    if (field === "password" && (!tempValue || tempValue.trim() === "")) {
      setError("Password cannot be empty");
      return;
    }

    const updatedUser = { ...user, [field]: tempValue };
    onUserUpdate(updatedUser);
    setEditingField(null);
    setTempValue("");
    setError(null);
    toast.success(`${field} updated successfully`);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
    setError(null);
  };

  const renderField = (label: string, value: string | undefined, field: string) => {
    const isEditing = editingField === field;
    return (
      <div className="flex items-center justify-between py-3 border-b">
        <span className="font-medium text-gray-700 min-w-[120px]">{label}:</span>
        <div className="flex items-center gap-2 flex-1 ml-4">
          {isEditing ? (
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <Input
                  value={tempValue}
                  onChange={(e) => {
                    setTempValue(e.target.value);
                    setError(null);
                  }}
                  className="flex-1"
                  type={field === "password" ? "text" : "text"}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSave(field)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {error && field === "password" && (
                <span className="text-red-500 text-sm mt-1">{error}</span>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-900">
                {field === "password" && !value ? "Change password" : value}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(field, value || "")}
                className="ml-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          {renderField("Name", user.name, "name")}
          {renderField("Email", user.email, "email")}
          {renderField("Password", user.password, "password")}
          {renderField("Phone Number", user.phoneNumber, "phoneNumber")}
          {renderField("Address", user.address, "address")}
          {user.type === "doctor" && (
            <>
              {renderField("Specialization", user.specialization, "specialization")}
              {renderField("Experience", user.experience, "experience")}
              {renderField("Status", user.status, "status")}
            </>
          )}
          {user.type === "nurse" && (
            <>
              {renderField("Specialization", user.specialization, "specialization")}
              {renderField("Experience", user.experience, "experience")}
              {renderField("Status", user.status, "status")}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};