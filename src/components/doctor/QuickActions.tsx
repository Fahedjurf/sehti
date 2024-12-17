import { FileText, AlertCircle, Stethoscope, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    title: "Write Report",
    icon: FileText,
    description: "Create new patient reports",
    route: "/medical-history",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    title: "Emergency Cases",
    icon: AlertCircle,
    description: "View urgent patient cases",
    route: "/quick-diagnoses",
    bgColor: "bg-red-50",
    iconColor: "text-red-500"
  },
  {
    title: "Start Consultation",
    icon: Stethoscope,
    description: "Begin a new consultation",
    route: "/doctor-live-call",
    bgColor: "bg-green-50",
    iconColor: "text-green-500"
  },
  {
    title: "View Schedule",
    icon: ClipboardList,
    description: "Check your appointments",
    route: "/schedule",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500"
  }
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-medical-dark">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(action.route)}
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className={`${action.bgColor} p-4 rounded-full mb-4`}>
                  <Icon className={`h-6 w-6 ${action.iconColor}`} />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};