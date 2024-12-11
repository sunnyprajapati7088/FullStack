import React, { useState } from 'react';
import { Home, Building2, Users } from 'lucide-react';
import { Address, AddressType } from '../../types/address';
import { AddressTypeButton } from './AddressTypeButton';
import { AddressInput } from './AddressInput';

interface AddressFormProps {
  initialLocation?: { lat: number; lng: number };
  onSave: (address: Omit<Address, 'id'>) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ initialLocation, onSave }) => {
  const [formData, setFormData] = useState({
    type: 'home' as AddressType,
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

  const addressTypes = [
    { type: 'home' as const, icon: Home, label: 'Home' },
    { type: 'office' as const, icon: Building2, label: 'Office' },
    { type: 'other' as const, icon: Users, label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <AddressInput
        label="House/Flat/Block No."
        value={formData.houseNumber}
        onChange={(value) => setFormData(prev => ({ ...prev, houseNumber: value }))}
      />

      <AddressInput
        label="Apartment/Road/Area"
        value={formData.streetAddress}
        onChange={(value) => setFormData(prev => ({ ...prev, streetAddress: value }))}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Save as
        </label>
        <div className="flex gap-4">
          {addressTypes.map(({ type, icon, label }) => (
            <AddressTypeButton
              key={type}
              type={type}
              selected={formData.type === type}
              icon={icon}
              label={label}
              onClick={() => setFormData(prev => ({ ...prev, type }))}
            />
          ))}
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
};