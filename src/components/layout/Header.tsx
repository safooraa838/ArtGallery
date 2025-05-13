import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, PlusCircle, LogIn, LogOut, User, Palette } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
  ];
  
  return (
    <header className="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-md dark:bg-slate-900 dark:bg-opacity-90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <Palette className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <span className="ml-2 text-xl font-bold text-slate-900 dark:text-white">ArtGallery</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              icon={theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
            
            {isAuthenticated ? (
              <>
                <Link to="/submit">
                  <Button variant="ghost" size="sm" icon={<PlusCircle size={18} />}>
                    Submit Art
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" icon={<User size={18} />}>
                    {user?.username}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" icon={<LogOut size={18} />} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" icon={<LogIn size={18} />}>
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="mr-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg animate-in slide-in-from-top">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/submit"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center">
                    <PlusCircle size={18} className="mr-2" />
                    Submit Art
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center">
                    <User size={18} className="mr-2" />
                    Profile
                  </div>
                </Link>
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                >
                  <div className="flex items-center">
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center">
                  <LogIn size={18} className="mr-2" />
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};