import React from 'react';
import { Home, Building2, Users, MapPin, Trash2 } from 'lucide-react';
import { Address } from '../types/address';

interface SavedAddressesProps {
  addresses: Address[];
  onDelete: (id: string) => void;
  onSelect: (address: Address) => void;
}

const getIcon = (type: Address['type']) => {
  switch (type) {
    case 'home':
      return <Home className="w-5 h-5" />;
    case 'office':
      return <Building2 className="w-5 h-5" />;
    case 'other':
      return <Users className="w-5 h-5" />;
  }
};

export const SavedAddresses: React.FC<SavedAddressesProps> = ({
  addresses,
  onDelete,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border border-gray-200 rounded-lg p-4 hover:border-red-500 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="mt-1">{getIcon(address.type)}</div>
              <div>
                <h3 className="font-medium capitalize">{address.type}</h3>
                <p className="text-sm text-gray-600">{address.fullAddress}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onSelect(address)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MapPin className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(address.id)}
                className="p-2 hover:bg-gray-100 rounded-full text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}