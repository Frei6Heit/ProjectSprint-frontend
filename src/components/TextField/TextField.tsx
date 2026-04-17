import React from 'react';
import './TextField.scss';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  rows?: number;
  placeholder?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  maxLength,
  rows = 3,
  placeholder,
}) => {
  return (
    <div className="text-field">
      <label className="text-field__label">{label}</label>
      <textarea
        className="text-field__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
      />
      {maxLength && (
        <div className="text-field__counter">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};