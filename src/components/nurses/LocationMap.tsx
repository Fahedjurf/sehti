import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface LocationMapProps {
  onLocationChange: (lat: number, lng: number) => void;
  driverLocation?: {
    lat: number;
    lng: number;
  };
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 24.7136,
  lng: 46.6753,
};

export const LocationMap = ({ onLocationChange, driverLocation }: LocationMapProps) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(newPosition);
          onLocationChange(newPosition.lat, newPosition.lng);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [onLocationChange]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={15}
      >
        <Marker
          position={currentPosition}
          icon={{
            url: "/placeholder.svg",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
        {driverLocation && (
          <Marker
            position={driverLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/deliverytruck.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};