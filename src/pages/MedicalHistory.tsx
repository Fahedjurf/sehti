import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MedicalReport {
  id: string;
  date: string;
  address: string;
  details: string;
  doctorName: string;
}

// Mock data - in a real app, this would come from an API
const mockReports: MedicalReport[] = [
  {
    id: "1",
    date: "2024-03-15 14:30",
    address: "123 Medical Center, Health City",
    details: "Regular checkup - Blood pressure normal, heart rate stable",
    doctorName: "Dr. Sarah Johnson"
  },
  {
    id: "2",
    date: "2024-02-28 09:15",
    address: "456 City Hospital, Downtown",
    details: "Flu symptoms treatment - Prescribed antibiotics and rest",
    doctorName: "Dr. Michael Chen"
  },
  {
    id: "3",
    date: "2024-01-10 11:45",
    address: "789 Family Clinic, Westside",
    details: "Annual physical examination - All tests within normal range",
    doctorName: "Dr. Emily Williams"
  }
];

const MedicalHistory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-medical-dark mb-6">Medical History</h1>
        <div className="space-y-4">
          {mockReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg text-medical-primary">
                    {new Date(report.date).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600">
                    Dr. {report.doctorName}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  <strong>Location:</strong> {report.address}
                </p>
                <p className="text-gray-800">
                  <strong>Details:</strong> {report.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;