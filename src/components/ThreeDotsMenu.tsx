
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useNavigate, useLocation } from "react-router-dom";
import { useResponsive } from "@/hooks/use-mobile";

export const ThreeDotsMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useResponsive();
  const isHelpPage = location.pathname === "/help";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 hover:bg-medical-light rounded-full transition-colors">
        <MoreVertical className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-gray-600`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <LanguageToggle />
        {!isHelpPage && (
          <DropdownMenuItem onClick={() => navigate("/help")}>Help</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
