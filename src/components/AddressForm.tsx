import React, { useState } from 'react';
import { Home, Building2, Users, MapPin } from 'lucide-react';
import { Address } from '../types/address';

interface AddressFormProps {
  initialLocation?: { lat: number; lng: number };
  onSave: (address: Omit<Address, 'id'>) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ initialLocation, onSave }) => {
  const [formData, setFormData] = useState({
    type: 'home' as const,
    houseNumber: '',
    streetAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialLocation) {
      onSave({
        ...formData,
        latitude: initialLocation.lat,
        longitude: initialLocation.lng,
        fullAddress: `${formData.houseNumber}, ${formData.streetAddress}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          House/Flat/Block No.
        </label>
        <input
          type="text"
          value={formData.houseNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, houseNumber: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Apartment/Road/Area
        </label>
        <input
          type="text"
          value={formData.streetAddress}
          onChange={(e) => setFormData(prev => ({ ...prev, streetAddress: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Save as
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'home' }))}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
              formData.type === 'home' ? 'bg-red-500 text-white' : 'border border-gray-300'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'office' }))}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
              formData.type === 'office' ? 'bg-red-500 text-white' : 'border border-gray-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Office
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'other' }))}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
              formData.type === 'other' ? 'bg-red-500 text-white' : 'border border-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Other
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
      >
        Save Address
      </button>
    </form>
  );
}