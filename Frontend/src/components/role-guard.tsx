import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}) => {
  const userRole = localStorage.getItem('userRole');
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};
