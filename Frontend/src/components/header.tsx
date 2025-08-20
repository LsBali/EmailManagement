import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarOpen }) => {
  let userDisplayName = 'User';
  try {
    const stored = localStorage.getItem('userDetails');
    if (stored) {
      const details = JSON.parse(stored);
      if (details && details.firstName) {
        const { firstName, middleName, lastName } = details;
        userDisplayName = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
      }
    }
  } catch {}
  const userRole = localStorage.getItem('userRole') || 'User';
  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <header className="flex items-center justify-between p-4 bg-background/50 border-b border-border">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className={`h-6 w-6 transform transition-transform duration-300 ${isSidebarOpen ? 'rotate-90' : 'rotate-0'}`} />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">
          {capitalizedRole} {userDisplayName}'s Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
