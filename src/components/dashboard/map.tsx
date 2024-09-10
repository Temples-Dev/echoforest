"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const GHANA_CENTER: [number, number] = [7.9465, -1.0232];
const GHANA_ZOOM = 7;

interface MapProps {
  deployments: Array<{
    id: string;
    deviceId: string;
    lat: number;
    lng: number;
    alertNumbers: string[];
  }>;
}

const Map: React.FC<MapProps> = ({ deployments }) => {
  useEffect(() => {
    // Load Leaflet icon images
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/marker-icon-2x.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={GHANA_CENTER}
      zoom={GHANA_ZOOM}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
      className="-z-0 rounded-md shadow">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {deployments.map((deployment) => (
        <Marker
          key={deployment.id}
          position={[deployment.lat, deployment.lng]}>
          <Popup>
            Device ID: {deployment.deviceId}
            <br />
            Alert Numbers: {deployment.alertNumbers.join(", ")}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
