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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Certificate {
  id: number;
  name: string;
  type: string;
  specialization: string;
  certificateUrl: string;
  status: string;
  email: string;
}

interface CertificateManagementProps {
  pendingCertificates: Certificate[];
  onApprove: (certificate: Certificate) => void;
}

export const CertificateManagement = ({ 
  pendingCertificates: initialCertificates,
  onApprove 
}: CertificateManagementProps) => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [certificates, setCertificates] = useState(initialCertificates);

  const handleApprove = (certificate: Certificate) => {
    onApprove(certificate);
    setCertificates((currentCertificates) => 
      currentCertificates.filter((cert) => cert.id !== certificate.id)
    );
    toast.success("Certificate approved successfully");
  };

  const handleReject = (id: number) => {
    setCertificates((currentCertificates) => 
      currentCertificates.filter((cert) => cert.id !== id)
    );
    toast.error("Certificate rejected");
  };

  const viewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-medical-dark mb-4">Pending Certificates</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Certificate</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell>{cert.name}</TableCell>
              <TableCell className="capitalize">{cert.type}</TableCell>
              <TableCell>{cert.specialization}</TableCell>
              <TableCell>
                <Button
                  variant="link"
                  onClick={() => viewCertificate(cert)}
                  className="text-medical-primary hover:text-medical-dark"
                >
                  View Certificate
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => handleApprove(cert)}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleReject(cert.id)}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="mt-4">
              <iframe
                src={selectedCertificate.certificateUrl}
                className="w-full h-[600px] border rounded-lg"
                title="Certificate Preview"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};