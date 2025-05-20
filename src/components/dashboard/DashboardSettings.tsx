import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Moon, Sun, Menu, PanelLeft, Sparkles, Beaker } from 'lucide-react';

function DashboardSettings() {
  const { 
    darkMode, 
    toggleDarkMode, 
    sidebarAlwaysOpen, 
    toggleSidebarMode,
    buttonEffects,
    toggleButtonEffects,
    experimental,
    toggleExperimental
  } = useSettings();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Settings</h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {darkMode ? <Moon className="h-5 w-5 text-gray-400" /> : <Sun className="h-5 w-5 text-gray-400" />}
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              darkMode ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {sidebarAlwaysOpen ? <PanelLeft className="h-5 w-5 text-gray-400" /> : <Menu className="h-5 w-5 text-gray-400" />}
            <span className="text-gray-700 dark:text-gray-300">Always Show Sidebar</span>
          </div>
          <button
            onClick={toggleSidebarMode}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              sidebarAlwaysOpen ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                sidebarAlwaysOpen ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Button Effects</span>
          </div>
          <button
            onClick={toggleButtonEffects}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              buttonEffects ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                buttonEffects ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Beaker className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Experimental Features</span>
            </div>
            <button
              onClick={toggleExperimental}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                experimental ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  experimental ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {experimental && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Active Experimental Features:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                <li>Organization Creation</li>
                <li>Advanced Message Composition</li>
                <li>Custom Organization Branding</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardSettings;