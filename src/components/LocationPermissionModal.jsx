import React from 'react';
import { MapPin, Search } from 'lucide-react';

export const LocationPermissionModal = ({
  onEnableLocation,
  onManualSearch,
}) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">Location permission is off</h2>
        <p className="text-gray-600 text-center mb-6">
          We need your location to find the nearest store & provide you a seamless delivery experience
        </p>
        <div className="space-y-3">
          <button
            onClick={onEnableLocation}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Enable Location
          </button>
          <button
            onClick={onManualSearch}
            className="w-full border border-gray-300 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" />
            Search your Location Manually
          </button>
        </div>
      </div>
    </div>
  );
};