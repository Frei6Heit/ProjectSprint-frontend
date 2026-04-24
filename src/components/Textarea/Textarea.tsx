import React from 'react';
import './Textarea.scss';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}) => {
  return (
    <div className="textarea">
      <label className="textarea__label">{label}</label>
      <textarea
        className={`textarea__field ${error ? 'textarea__field--error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
      {error && <div className="textarea__error">{error}</div>}
    </div>
  );
};