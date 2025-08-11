import React from 'react';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export default function FilterSelect({ value, onChange, options, placeholder }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
    >
      {options.map(option => (
        <option key={option} value={option}>
          {placeholder && option === options[0] ? placeholder : option}
        </option>
      ))}
    </select>
  );
}