import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Calendar, Clock } from 'lucide-react';
import Header from '../components/Header';

function DashboardLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to the VolunTrack Dashboard
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Sign up or sign in to access powerful volunteer management tools and connect with opportunities in your community.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Connect with Organizations</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Find and connect with organizations that match your interests and skills.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Track Your Hours</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Easily log and manage your volunteer hours with our intuitive tracking system.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Manage Opportunities</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Create and manage volunteer opportunities for your organization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center space-x-4">
          <Link
            to="/signin"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-indigo-500 hover:bg-indigo-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardLanding;