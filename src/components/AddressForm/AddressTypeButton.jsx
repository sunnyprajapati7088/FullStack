import React from 'react';

export const AddressTypeButton = ({
  type,
  selected,
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
        selected ? 'bg-red-500 text-white' : 'border border-gray-300'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
};