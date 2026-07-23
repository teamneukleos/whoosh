'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const inputClassName =
  'w-full rounded border border-[#D0D5DD] px-4 py-2.5 pr-11 text-sm text-[#191C1D] placeholder-[#98A2B3] outline-none focus:border-[#091B68] transition-colors';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  labelRight?: React.ReactNode;
}

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  labelRight,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className={`mb-1.5 flex items-center ${labelRight ? 'justify-between' : ''}`}>
        <label className="block text-sm text-[#191C1D]">{label}</label>
        {labelRight}
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClassName}
        />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] transition hover:text-[#091B68]"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
