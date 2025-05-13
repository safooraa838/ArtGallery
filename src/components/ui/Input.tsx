import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const inputClasses = `
      block rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
      placeholder:text-slate-400 focus:outline-none focus:ring-2 
      focus:ring-blue-500 focus:border-blue-500 
      disabled:cursor-not-allowed disabled:opacity-50
      dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100
      dark:placeholder-slate-400 dark:focus:ring-blue-400
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';