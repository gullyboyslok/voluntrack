import React from 'react';
import { Award, Mail } from 'lucide-react';
import Header from '../components/Header';
import { useSettings } from '../context/SettingsContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function About() {
  const { buttonEffects } = useSettings();
  const ButtonComponent = buttonEffects ? motion.a : 'a';
  
  const buttonProps = buttonEffects ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  } : {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight lg:text-5xl">
              About VolunTrack
            </h1>
          </div>
          
          <div className="mt-12 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg mb-8">
                  <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">Hey!</h2>
                  
                  <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                    Welcome to VolunTrack! We're thrilled to have you here as we work towards launching a platform that makes volunteering easier, more efficient, and more rewarding.
                  </p>
                  
                  <p className="text-indigo-700 dark:text-indigo-300">
                    Your support helps us grow, and as a token of appreciation, all organizations participating in our Beta Testing will receive first priority for new features, helping them connect with more volunteers. For everyone else, your input directly shapes how volunteers and nonprofits can make an even bigger impact in their communities!
                  </p>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Who We Are</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center mb-4">
                      <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">PVSA Certified</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      VolunTrack is a nonprofit organization certified to provide Presidential Volunteer Service Award (PVSA) hours. We connect volunteers with nonprofits while streamlining the process of logging and verifying volunteer hours.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center mb-4">
                      <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Simplified Documentation</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our platform automatically generates printable documentation for completed hours, making it easier for volunteers to submit records for personal recognition, awards, and required service hours.
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  Our founders have personally gone through the PVSA process and experienced firsthand how tedious it can be—logging hours, getting them verified, obtaining written proof, and submitting them to various organizations. That's why we created VolunTrack: to simplify and speed up this process for both volunteers and nonprofit organizations.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join Our Team</h2>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We're currently looking for highly skilled website and software development interns to join our team right before our MVP and final launch! We're in Beta Launch phase, and applications for our dev team are open until March 13th.
                  </p>
                  
                  <div className="bg-white dark:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-500 mb-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      If you're interested, email <a href="mailto:VolunTrack.beta@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">VolunTrack.beta@gmail.com</a>, and our onboarding team (<a href="mailto:ayaanladak.global@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Ayaan Ladak</a> and <a href="mailto:jaiswalshlok@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Shlok Jaiswal</a>) will guide you through the selection process.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300">
                    Even if you're not selected in this round, we're growing rapidly and will reach out to interested applicants as positions open up post-launch!
                  </p>
                </div>
                
                <div className="text-center text-gray-700 dark:text-gray-300 italic mb-8">
                  Thanks for being part of our journey—we couldn't do this without you!
                </div>

                <div className="mt-12 flex justify-center mb-12">
                  <ButtonComponent
                    href="mailto:VolunTrack.beta@gmail.com"
                    {...buttonProps}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Us
                  </ButtonComponent>
                </div>

                {/* FAQ Section */}
                <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions (FAQ)</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Where can I learn more about VolunTrack?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Read the <Link to="/about" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">about page</Link> to learn more.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Who can use VolunTrack?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        VolunTrack is for anyone who is looking to intern or volunteer, and is targeted at middle to high schoolers.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Is VolunTrack free to use?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        VolunTrack is 100% free to use, and, in the future, will be giving organizations money through advertisements. If you want to receive these benefits early, fill out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSeUrddtWC2TvrB6n8t5H-MKqFY1AWcphqQRhbkA-gkF2ZQ_xQ/viewform" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">beta testing form</a> to learn more!
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">How do I sign up for an account?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Use the sign up button in the top right to create an account.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Can I use VolunTrack if I am under 18?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        VolunTrack is mainly made for people under 18, so yes.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">How do I find volunteer or internship opportunities?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        You can use the <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Dashboard</Link>, and click on either the <Link to="/dashboard/discover" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Discover</Link> tab or the <Link to="/dashboard/search" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Search</Link> tab to search for opportunities.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Can I apply for multiple opportunities at the same time?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Yes, you can sign up for multiple opportunities as long as they don't conflict.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">How do I contact an organization after applying?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        You can use the <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Inbox</Link> to reply to messages from your organization, or directly message them through the inbox as well.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Will I receive a certificate or proof of my volunteer hours?</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Yes, you can ask the organization for a certificate of your volunteer hours. If you don't receive one, you can email <a href="mailto:VolunTrack.beta@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">VolunTrack.beta@gmail.com</a> to report them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white border-t border-gray-700">
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

export default About;