import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, Video, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DoctorVideoCall = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleEndCall = () => {
    toast.success("Call ended successfully");
    navigate("/doctor-live-call");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-medical-accent p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-medical-dark">Video Consultation</h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Connected with Patient
            </span>
          </div>
        </div>

        {/* Video Display Area */}
        <div className="relative">
          <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
            {/* Main video stream would go here */}
            <div className="absolute bottom-4 right-4 w-48 h-32 bg-gray-800 rounded-lg">
              {/* Doctor's video preview would go here */}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${isMuted ? 'bg-red-100' : 'bg-white'}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 ${isVideoOff ? 'bg-red-100' : 'bg-white'}`}
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff /> : <Video />}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={handleEndCall}
            >
              <PhoneOff />
            </Button>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-gray-600">Age</p>
              <p className="font-medium">45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorVideoCall;