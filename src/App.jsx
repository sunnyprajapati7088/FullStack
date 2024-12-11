import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { LocationPermissionModal } from './components/LocationPermissionModal';
import { AddressForm } from './components/AddressForm/AddressForm';
import Map from './components/Map/Map';
import { SavedAddresses } from './components/SavedAddresses/SavedAddresses';

const MUMBAI_COORDINATES = [19.0760, 72.8777];

function App() {
  const [locationState, setLocationState] = useState({
    permissionGranted: false,
    currentLocation: null,
  });
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('savedAddresses');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedLocation, setSelectedLocation] = useState(MUMBAI_COORDINATES);
  const [view, setView] = useState('map');

  useEffect(() => {
    localStorage.setItem('savedAddresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleEnableLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationState({
            permissionGranted: true,
            currentLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          setSelectedLocation([position.coords.latitude, position.coords.longitude]);
          setShowPermissionModal(false);
        },
        () => {
          setShowPermissionModal(false);
        }
      );
    }
  };

  const handleManualSearch = () => {
    setShowPermissionModal(false);
  };

  const handleLocationChange = (lat, lng) => {
    setSelectedLocation([lat, lng]);
  };

  const handleSaveAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now().toString(),
    };
    setAddresses((prev) => [...prev, newAddress]);
    setView('list');
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSelectAddress = (address) => {
    setSelectedLocation([address.latitude, address.longitude]);
    setView('map');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showPermissionModal && (
        <LocationPermissionModal
          onEnableLocation={handleEnableLocation}
          onManualSearch={handleManualSearch}
        />
      )}

      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-500" />
            <h1 className="text-xl font-semibold">Location Manager</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b relative z-10">
            <button
              onClick={() => setView('map')}
              className={`flex-1 py-4 text-center font-medium ${
                view === 'map' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setView('form')}
              className={`flex-1 py-4 text-center font-medium ${
                view === 'form' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
              }`}
            >
              Add Address
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex-1 py-4 text-center font-medium ${
                view === 'list' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
              }`}
            >
              Saved Addresses
            </button>
          </div>

          <div className="p-4">
            {view === 'map' && (
              <div>
                <Map
                  center={selectedLocation}
                  onLocationChange={handleLocationChange}
                />
                <button
                  onClick={() => setView('form')}
                  className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Confirm Location
                </button>
              </div>
            )}

            {view === 'form' && (
              <AddressForm
                initialLocation={{ lat: selectedLocation[0], lng: selectedLocation[1] }}
                onSave={handleSaveAddress}
              />
            )}

            {view === 'list' && (
              <SavedAddresses
                addresses={addresses}
                onDelete={handleDeleteAddress}
                onSelect={handleSelectAddress}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;