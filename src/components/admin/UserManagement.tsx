import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMinus, UserPlus, Search, Star } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface User {
  id: number;
  name: string;
  type: string;
  email: string;
  status: string;
  feedback?: {
    rating: number;
    comment: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    date: string;
  }[];
}

export const UserManagement = ({ users: initialUsers }: { users: User[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveUser = (id: number) => {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
    toast.success("User removed successfully");
  };

  const handleAddUser = () => {
    toast.info("Redirecting to add user...");
  };

  const handleShowFeedback = (user: User) => {
    setSelectedUser(user);
    setShowFeedbackDialog(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-medical-dark">User Management</h2>
        <Button
          className="bg-medical-primary hover:bg-medical-dark text-white"
          onClick={handleAddUser}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="relative w-full max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell className="capitalize">{user.type}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.feedback && user.feedback.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShowFeedback(user)}
                    className="text-medical-primary hover:text-medical-dark"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    {user.feedback.length} Reviews
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  <UserMinus className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feedback for {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              <div className="space-y-4 mt-4">
                {selectedUser?.feedback?.map((feedback, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(feedback.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{feedback.patientName}</p>
                        <p className="text-sm text-gray-600">{feedback.patientEmail}</p>
                        <p className="text-sm text-gray-600">{feedback.patientPhone}</p>
                      </div>
                    </div>
                    {feedback.comment && (
                      <p className="text-gray-700 mt-2">{feedback.comment}</p>
                    )}
                  </div>
                ))}
                {(!selectedUser?.feedback || selectedUser.feedback.length === 0) && (
                  <p className="text-center text-gray-500">No feedback yet</p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};