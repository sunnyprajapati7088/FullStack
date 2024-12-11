import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapMarker } from './MapMarker';
import './MapConfig';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  center: [number, number];
  onLocationChange: (lat: number, lng: number) => void;
}

const Map: React.FC<MapProps> = ({ center, onLocationChange }) => {
  const [position, setPosition] = React.useState<[number, number]>(center);

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationChange(lat, lng);
  };

  return (
    <div className="relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapMarker position={position} onPositionChange={handlePositionChange} />
      </MapContainer>
    </div>
  );
};

export default Map;