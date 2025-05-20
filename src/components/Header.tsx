import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Award } from 'lucide-react';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    if (isDashboard) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isDashboard]);

  const isAuthenticated = !!localStorage.getItem('user');

  const handleSignOut = () => {
    localStorage.removeItem('user');
    // Dispatch custom event to notify App component about auth change
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/';
  };

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow-sm fixed w-full z-10 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Award className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">VolunTrack</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative ${
                    isCurrentPath('/dashboard') ? 'after:absolute after:bottom-[-1rem] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/about" 
                  className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative ${
                    isCurrentPath('/about') ? 'after:absolute after:bottom-[-1rem] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400' : ''
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/profile" 
                  className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative ${
                    isCurrentPath('/profile') ? 'after:absolute after:bottom-[-1rem] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400' : ''
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Sign Out
                </button>
                <a
                  href="https://voluntrackbeta.framer.ai/"
                  className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Get Updates
                </a>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative ${
                    isCurrentPath('/about') ? 'after:absolute after:bottom-[-1rem] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400' : ''
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/signin" 
                  className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative ${
                    isCurrentPath('/signin') ? 'after:absolute after:bottom-[-1rem] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400' : ''
                  }`}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;