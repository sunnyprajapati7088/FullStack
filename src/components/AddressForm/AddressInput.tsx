import React from 'react';

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const AddressInput: React.FC<AddressInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
        required
      />
    </div>
  );
};