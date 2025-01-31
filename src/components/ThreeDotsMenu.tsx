import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useNavigate } from "react-router-dom";

export const ThreeDotsMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 hover:bg-medical-light rounded-full transition-colors">
        <MoreVertical className="h-6 w-6 text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <LanguageToggle />
        <DropdownMenuItem onClick={() => navigate("/help")}>Help</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};