import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <DropdownMenuItem onClick={toggleLanguage}>
      {language === "en" ? "Switch to Arabic" : "Switch to English"}
    </DropdownMenuItem>
  );
};