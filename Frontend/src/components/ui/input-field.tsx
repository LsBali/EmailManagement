import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  success?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    icon, 
    showPasswordToggle = false, 
    success = false,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const inputType = showPasswordToggle 
      ? (showPassword ? 'text' : 'password') 
      : type;

    return (
      <div className="space-y-2">
        <label 
          htmlFor={props.id} 
          className="text-sm font-medium text-foreground"
        >
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              'input-field',
              icon && 'pl-10',
              showPasswordToggle && 'pr-10',
              error && 'input-error',
              success && 'input-success',
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        
        {error && (
          <p 
            id={`${props.id}-error`}
            className="text-sm text-destructive animate-fade-in"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';