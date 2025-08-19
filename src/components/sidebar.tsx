import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('userRole');
    localStorage.removeItem('userDetails');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <aside
      className={cn(
        'flex-shrink-0 bg-background/50 border-r border-border flex flex-col overflow-hidden transition-all duration-300 ease-in-out',
        isOpen ? 'w-48 p-4' : 'w-0 p-0 border-none'
      )}
    >
      <div className={cn('transition-opacity duration-200', isOpen ? 'opacity-100' : 'opacity-0')}>
        <nav className="flex flex-col">
          <Link to="/profile">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
