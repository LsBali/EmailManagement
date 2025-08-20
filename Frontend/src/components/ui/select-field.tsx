import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  options: Array<{ value: string; label: string }>;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, label, error, icon, options, ...props }, ref) => {
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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
              {icon}
            </div>
          )}
          
          <select
            className={cn(
              'input-field appearance-none',
              icon && 'pl-10',
              'pr-10',
              error && 'input-error',
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
            <ChevronDown size={18} />
          </div>
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

SelectField.displayName = 'SelectField';