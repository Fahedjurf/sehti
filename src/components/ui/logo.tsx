interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-12",
    md: "h-16",
    lg: "h-24",
  };

  return (
    <img
      src="/lovable-uploads/999937a5-3a18-4ec2-a762-267d50a875ce.png"
      alt="Sehti Logo"
      className={`w-auto ${sizeClasses[size]} ${className}`}
    />
  );
};