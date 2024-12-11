import React from 'react';
import { Marker, useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface MapMarkerProps {
  position: [number, number];
  onPositionChange: (lat: number, lng: number) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ position, onPositionChange }) => {
  const map = useMap();

  React.useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos: LatLng = marker.getLatLng();
          onPositionChange(pos.lat, pos.lng);
        },
      }}
    />
  );
};