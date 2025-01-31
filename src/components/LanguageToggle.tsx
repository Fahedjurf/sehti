import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <DropdownMenuItem onClick={toggleLanguage} className="gap-2">
      <Languages className="h-4 w-4" />
      {language === "en" ? "العربية" : "English"}
    </DropdownMenuItem>
  );
};