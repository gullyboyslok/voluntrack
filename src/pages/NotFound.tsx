import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Home, ArrowLeft } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { motion } from 'framer-motion';
import Header from '../components/Header';

function NotFound() {
  const { buttonEffects } = useSettings();
  const ButtonComponent = buttonEffects ? motion.button : 'button';
  
  const buttonProps = buttonEffects ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  } : {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="flex flex-col items-center justify-center text-center">
          <Award className="h-24 w-24 text-indigo-600 dark:text-indigo-400 mb-8" />
          
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white sm:text-7xl">
            404
          </h1>
          
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Oops! Looks like this page has volunteered to go missing.
          </p>
          
          <div className="mt-12 flex space-x-4">
            <Link to="/">
              <ButtonComponent
                {...buttonProps}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </ButtonComponent>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;