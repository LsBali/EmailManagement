import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface StrengthCriteria {
  label: string;
  test: (password: string) => boolean;
}

const criteria: StrengthCriteria[] = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'Contains uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Contains lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Contains number',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'Contains special character',
    test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  },
];

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ 
  password, 
  className = '' 
}) => {
  const passedCriteria = criteria.filter(criterion => criterion.test(password));
  const strength = passedCriteria.length;
  
  const getStrengthLevel = () => {
    if (strength < 3) return { level: 'weak', color: 'strength-weak', text: 'Weak' };
    if (strength < 5) return { level: 'medium', color: 'strength-medium', text: 'Medium' };
    return { level: 'strong', color: 'strength-strong', text: 'Strong' };
  };

  const strengthInfo = getStrengthLevel();

  if (!password) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">
            Password Strength
          </span>
          <span className={`text-xs font-medium ${
            strengthInfo.level === 'weak' ? 'text-destructive' :
            strengthInfo.level === 'medium' ? 'text-warning' :
            'text-success'
          }`}>
            {strengthInfo.text}
          </span>
        </div>
        
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                level <= strength ? strengthInfo.color : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Criteria List */}
      <div className="space-y-1">
        {criteria.map((criterion, index) => {
          const passed = criterion.test(password);
          return (
            <div
              key={index}
              className="flex items-center space-x-2 text-xs"
            >
              {passed ? (
                <CheckCircle2 size={12} className="text-success" />
              ) : (
                <XCircle size={12} className="text-muted-foreground" />
              )}
              <span className={passed ? 'text-success' : 'text-muted-foreground'}>
                {criterion.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};