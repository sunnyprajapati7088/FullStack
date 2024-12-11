import React, { useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';

export const MapMarker = ({ position, onPositionChange }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          onPositionChange(pos.lat, pos.lng);
        },
      }}
    />
  );
};