import { Users, Clock, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const statistics = [
  {
    label: "Total Patients",
    value: "124",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    label: "Today's Appointments",
    value: "8",
    icon: Clock,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    label: "Completed Sessions",
    value: "96",
    icon: CalendarCheck,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statistics.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className={`${stat.bgColor} p-4 rounded-full mr-4`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-medical-dark">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};