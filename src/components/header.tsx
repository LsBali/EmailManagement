import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  let userFirstName = 'User';
  try {
    const stored = localStorage.getItem('userDetails');
    if (stored) {
      const details = JSON.parse(stored);
      if (details && details.firstName) {
        userFirstName = details.firstName;
      }
    }
  } catch {}
  const userRole = localStorage.getItem('userRole') || 'User';
  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <header className="flex items-center justify-between p-4 bg-background/50 border-b border-border">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold gradient-text">
          {capitalizedRole} {userFirstName}'s Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
