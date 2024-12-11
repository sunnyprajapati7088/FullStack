import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center: [number, number];
  onLocationChange: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapProps> = ({ center, onLocationChange }) => {
  const [position, setPosition] = React.useState<[number, number]>(center);

  const DraggableMarker = () => {
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
            const position = marker.getLatLng();
            setPosition([position.lat, position.lng]);
            onLocationChange(position.lat, position.lng);
          },
        }}
      />
    );
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DraggableMarker />
    </MapContainer>
  );
};

export default MapComponent;