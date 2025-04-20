import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, TreePine, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinkClasses = ({ isActive}) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${
      isActive 
        ? 'text-primary-700 dark:text-primary-400' 
        : 'text-gray-700 dark:text-gray-300'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TreePine className="h-8 w-8 text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-heading font-bold text-forest-800 dark:text-forest-300">
                TreeScout
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/results" className={navLinkClasses}>Results</NavLink>
              <NavLink to="/about" className={navLinkClasses}>About</NavLink>
            </div>
            
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="mr-2 p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }>
              Home
            </NavLink>
            <NavLink to="/results" className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }>
              Results
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-gray-800' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }>
              About
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;