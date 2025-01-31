import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Languages } from "lucide-react";
import { toast } from "sonner";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    toggleLanguage();
    toast.success(language === "en" ? "تم تغيير اللغة إلى العربية" : "Language changed to English");
  };

  return (
    <DropdownMenuItem onClick={handleLanguageToggle} className="gap-2">
      <Languages className="h-4 w-4" />
      {language === "en" ? "العربية" : "English"}
    </DropdownMenuItem>
  );
};