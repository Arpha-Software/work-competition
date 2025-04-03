import { ChangeEvent } from 'react';
import cn from '@/tools/cn';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
};

export const Select = ({ value, onChange, options, className }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        'w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-secondary',
        className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}; 