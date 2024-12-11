import React from 'react';
import { AddressCard } from './AddressCard';

export const SavedAddresses = ({
  addresses,
  onDelete,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};