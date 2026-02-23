import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

interface NavigationProps {
  isLoggedIn: boolean;
  currentUser?: { name: string; email: string };
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogout: () => void;
  onDashboardClick: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Navigation({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onSignUpClick,
  onLogout,
  onDashboardClick,
  currentView,
  onNavigate,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Services', view: 'home', scrollTo: 'services' },
    { label: 'Pricing', view: 'home', scrollTo: 'pricing' },
    { label: 'Contact', view: 'home', scrollTo: 'contact' },
  ];

  const handleNavClick = (view: string, scrollTo?: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#2F3E46]/95 border-b border-[#354F52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="text-[#CAD2C5] tracking-wider hover:text-[#84A98C] transition-colors text-lg"
            style={{ 
              fontFamily: "'Anton', sans-serif",
              letterSpacing: '0.1em' 
            }}
          >
            MITTS TECHNOLOGY
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.scrollTo)}
                className="text-[#CAD2C5] hover:text-[#84A98C] transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#52796F] transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && currentUser ? (
              <>
                <Button
                  onClick={onDashboardClick}
                  variant="ghost"
                  className="text-[#CAD2C5] hover:bg-[#354F52]"
                >
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-9 w-9 cursor-pointer border-2 border-[#52796F] hover:border-[#84A98C] transition-colors">
                      <AvatarFallback className="bg-[#52796F] text-[#CAD2C5]">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#2F3E46] border-[#354F52]">
                    <DropdownMenuItem
                      onClick={onDashboardClick}
                      className="text-[#CAD2C5] focus:bg-[#354F52] focus:text-[#CAD2C5]"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="text-[#CAD2C5] focus:bg-[#354F52] focus:text-[#CAD2C5]"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  onClick={onLoginClick}
                  variant="ghost"
                  className="text-[#CAD2C5] hover:bg-[#354F52] border border-[#52796F] rounded-full"
                >
                  Login
                </Button>
                <Button
                  onClick={onSignUpClick}
                  className="bg-[#52796F] text-[#CAD2C5] hover:bg-[#354F52] rounded-full transition-all hover:scale-105"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#CAD2C5]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2F3E46] border-t border-[#354F52]">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.scrollTo)}
                className="block w-full text-left px-3 py-2 text-[#CAD2C5] hover:bg-[#354F52] rounded-lg"
              >
                {link.label}
              </button>
            ))}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    onDashboardClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-[#CAD2C5] hover:bg-[#354F52] rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-[#CAD2C5] hover:bg-[#354F52] rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-[#CAD2C5] hover:bg-[#354F52] rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onSignUpClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-[#CAD2C5] hover:bg-[#354F52] rounded-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
