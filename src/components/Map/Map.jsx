import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapMarker } from './MapMarker';
import './MapConfig';
import 'leaflet/dist/leaflet.css';

const Map = ({ center, onLocationChange }) => {
  const [position, setPosition] = useState(center);

  const handlePositionChange = (lat, lng) => {
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