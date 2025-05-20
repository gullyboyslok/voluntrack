import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, Clock, Users, Mail } from 'lucide-react';
import Header from '../components/Header';
import { useSettings } from '../context/SettingsContext';
import { motion } from 'framer-motion';

function LandingPage() {
  const { buttonEffects } = useSettings();

  const ButtonComponent = buttonEffects ? motion.button : 'button';
  const LinkComponent = buttonEffects ? motion.a : 'a';

  const buttonProps = buttonEffects ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  } : {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Connect, Contribute, Grow</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Make a Difference Together</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            VolunTrack bridges the gap between passionate volunteers, ambitious interns, and impactful organizations, creating meaningful connections that benefit both individuals and communities.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow mx-2">
              <Link to="/signup">
                <ButtonComponent
                  {...buttonProps}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  Get Started
                </ButtonComponent>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 mx-2">
              <Link to="/about">
                <ButtonComponent
                  {...buttonProps}
                  className="w-full flex items-center justify-center px-8 py-3 border border-indigo-600 dark:border-indigo-400 text-base font-medium rounded-md text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900 md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </ButtonComponent>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Event Management</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Easily organize and manage volunteer events with our intuitive calendar system.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Hour Tracking</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Accurately track and log your volunteer hours with automated time tracking.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Community Connection</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Connect with other volunteers and organizations in your local community.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:VolunTrack.beta@gmail.com" className="text-gray-400 hover:text-white">VolunTrack.beta@gmail.com</a>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:jaiswalshlok@gmail.com" className="text-gray-400 hover:text-white">jaiswalshlok@gmail.com</a>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:ayaanladak.global@gmail.com" className="text-gray-400 hover:text-white">ayaanladak.global@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;