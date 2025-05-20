import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Award, Inbox, Search, Building2, Menu, Compass, Bookmark, Settings as SettingsIcon } from 'lucide-react';
import DashboardInbox from '../components/dashboard/DashboardInbox';
import DashboardDiscover from '../components/dashboard/DashboardDiscover';
import DashboardSearch from '../components/dashboard/DashboardSearch';
import DashboardOrganization from '../components/dashboard/DashboardOrganization';
import DashboardBookmarks from '../components/dashboard/DashboardBookmarks';
import DashboardSettings from '../components/dashboard/DashboardSettings';
import Header from '../components/Header';
import { useSettings } from '../context/SettingsContext';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarAlwaysOpen } = useSettings();
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarAlwaysOpen);

  useEffect(() => {
    setIsSidebarOpen(sidebarAlwaysOpen);
  }, [sidebarAlwaysOpen]);

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      {/* Hamburger Menu - Only show if sidebar is not always open */}
      {!sidebarAlwaysOpen && (
        <div
          className="fixed top-0 left-0 mt-4 ml-4 z-30"
          onMouseEnter={() => setIsSidebarOpen(true)}
        >
          <button
            id="hamburger-button"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        onMouseEnter={() => !sidebarAlwaysOpen && setIsSidebarOpen(true)}
        onMouseLeave={() => !sidebarAlwaysOpen && setIsSidebarOpen(false)}
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen || sidebarAlwaysOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white dark:bg-gray-800 w-64 transition-transform duration-200 ease-in-out z-20 shadow-lg mt-16`}
      >
        <nav className="mt-5 px-2">
          <Link
            to="/dashboard"
            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              isActivePath('/dashboard') && !location.pathname.includes('/')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Inbox className="mr-4 h-6 w-6" />
            Inbox
          </Link>
          <Link
            to="/dashboard/discover"
            className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              isActivePath('/dashboard/discover')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Compass className="mr-4 h-6 w-6" />
            Discover
          </Link>
          <Link
            to="/dashboard/search"
            className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              isActivePath('/dashboard/search')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Search className="mr-4 h-6 w-6" />
            Search
          </Link>
          <Link
            to="/dashboard/organization"
            className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              isActivePath('/dashboard/organization')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="mr-4 h-6 w-6" />
            My Organization
          </Link>
          <Link
            to="/dashboard/bookmarks"
            className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              isActivePath('/dashboard/bookmarks')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="mr-4 h-6 w-6" />
            Bookmarks
          </Link>
          <Link
            to="/dashboard/settings"
            className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              isActivePath('/dashboard/settings')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <SettingsIcon className="mr-4 h-6 w-6" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-margin duration-200 ease-in-out pt-16 ${isSidebarOpen || sidebarAlwaysOpen ? 'ml-64' : ''}`}>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route index element={<DashboardInbox />} />
            <Route path="discover" element={<DashboardDiscover />} />
            <Route path="search" element={<DashboardSearch />} />
            <Route path="organization" element={<DashboardOrganization />} />
            <Route path="bookmarks" element={<DashboardBookmarks />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;