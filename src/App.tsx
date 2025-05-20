import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/Header';
import DashboardLanding from './pages/DashboardLanding';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check authentication status on mount and when localStorage changes
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };
    
    // Initial check
    checkAuth();
    
    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener('storage', checkAuth);
    
    // Custom event for auth changes in the same tab
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <DashboardLanding />} />
        <Route path="/profile" element={
          <>
            <Header />
            <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {isAuthenticated ? (
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                  <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700 dark:text-yellow-200">
                          This is an example profile. This feature is coming soon.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Profile Information
                    </h3>
                  </div>
                  
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">First name</dt>
                        <dd className="mt-1 text-sm text-gray-900">FirstName</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Last name</dt>
                        <dd className="mt-1 text-sm text-gray-900">LastName</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">example@email.com</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                        <dd className="mt-1 text-sm text-gray-900">San Francisco, CA</dd>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-5 sm:px-6 border-t border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Volunteer Statistics
                    </h3>
                  </div>
                  
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div className="bg-indigo-50 rounded-lg p-5 text-center">
                        <dt className="text-sm font-medium text-indigo-500 truncate">Total Hours</dt>
                        <dd className="mt-1 text-3xl font-semibold text-indigo-600">42</dd>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-5 text-center">
                        <dt className="text-sm font-medium text-indigo-500 truncate">Events Attended</dt>
                        <dd className="mt-1 text-3xl font-semibold text-indigo-600">12</dd>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-5 text-center">
                        <dt className="text-sm font-medium text-indigo-500 truncate">Organizations</dt>
                        <dd className="mt-1 text-3xl font-semibold text-indigo-600">5</dd>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Past Events
                    </h3>
                  </div>
                  
                  <div className="bg-white overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-indigo-600 truncate">
                            Community Garden Project
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              4 hours
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              Green Earth Initiative
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              March 9, 2024
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-indigo-600 truncate">
                            Food Bank Distribution
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              6 hours
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              Local Food Bank
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              February 24, 2024
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-indigo-600 truncate">
                            Senior Center Tech Support
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              3 hours
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              Elder Care Alliance
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              February 15, 2024
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : <Navigate to="/signin" />}
            </div>
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;