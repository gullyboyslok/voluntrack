import React, { useState } from 'react';
import { Clock, MapPin, X } from 'lucide-react';

interface Opportunity {
  id: number;
  title: string;
  organization: string;
  location: string;
  date: string;
  duration: string;
  description: string;
  image: string;
  requirements?: string;
  contactEmail?: string;
  contactPhone?: string;
  skills?: string[];
}

function DashboardDiscover() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  
  const opportunities: Opportunity[] = [
    {
      id: 1,
      title: 'Community Garden Project',
      organization: 'Green Earth Initiative',
      location: 'Central Park',
      date: '2024-03-15',
      duration: '3 hours',
      description: 'Help us maintain and grow our community garden. No experience necessary! Join us for a day of planting, weeding, and learning about sustainable gardening practices. This is a great opportunity for beginners and experienced gardeners alike.',
      image: 'https://images.unsplash.com/photo-1593113646679-b31b1f6d7e5f?auto=format&fit=crop&w=800&q=80',
      requirements: 'Bring gloves, water bottle, and sunscreen. Wear comfortable clothes that can get dirty.',
      contactEmail: 'garden@greenearthinitiative.org',
      contactPhone: '(555) 123-4567',
      skills: ['Gardening', 'Teamwork', 'Environmental awareness']
    },
    {
      id: 2,
      title: 'Food Bank Distribution',
      organization: 'Local Food Bank',
      location: 'Downtown Community Center',
      date: '2024-03-16',
      duration: '4 hours',
      description: 'Assist in sorting and distributing food to families in need. Tasks include packaging food items, organizing donations, and helping with distribution. This is a rewarding opportunity to directly impact food security in our community.',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
      requirements: 'Must be able to stand for extended periods and lift up to 20 pounds. Training provided on-site.',
      contactEmail: 'volunteer@localfoodbank.org',
      contactPhone: '(555) 987-6543',
      skills: ['Organization', 'Customer service', 'Attention to detail']
    },
    {
      id: 3,
      title: 'Senior Center Tech Support',
      organization: 'Elder Care Alliance',
      location: 'Sunshine Senior Living',
      date: '2024-03-20',
      duration: '2 hours',
      description: 'Help seniors learn to use technology like smartphones, tablets, and computers. Volunteers will be paired with seniors to provide one-on-one assistance with basic tech skills, social media, video calls with family, and more.',
      image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
      requirements: 'Patient and friendly individuals with good communication skills. Basic knowledge of common devices and applications required.',
      contactEmail: 'techhelp@eldercarealliance.org',
      contactPhone: '(555) 234-5678',
      skills: ['Technology', 'Teaching', 'Patience', 'Communication']
    },
  ];

  const handleSignUp = (opportunity: Opportunity) => {
    alert(`You've signed up for: ${opportunity.title}!`);
    setSelectedOpportunity(null);
  };

  const handleNotInterested = () => {
    setSelectedOpportunity(null);
  };

  if (selectedOpportunity) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative">
          <img 
            src={selectedOpportunity.image} 
            alt={selectedOpportunity.title} 
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={() => setSelectedOpportunity(null)}
            className="absolute top-4 right-4 bg-white p-1 rounded-full shadow-md"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedOpportunity.title}</h2>
              <p className="text-lg text-gray-600">{selectedOpportunity.organization}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-gray-500">
            <MapPin className="h-5 w-5 mr-2 text-gray-400" />
            {selectedOpportunity.location}
          </div>
          
          <div className="mt-2 flex items-center text-gray-500">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            {new Date(selectedOpportunity.date).toLocaleDateString()} • {selectedOpportunity.duration}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{selectedOpportunity.description}</p>
          </div>
          
          {selectedOpportunity.requirements && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Requirements</h3>
              <p className="mt-2 text-gray-600">{selectedOpportunity.requirements}</p>
            </div>
          )}
          
          {selectedOpportunity.skills && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Skills You'll Develop</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedOpportunity.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            <div className="mt-2 text-gray-600">
              {selectedOpportunity.contactEmail && (
                <div>Email: {selectedOpportunity.contactEmail}</div>
              )}
              {selectedOpportunity.contactPhone && (
                <div>Phone: {selectedOpportunity.contactPhone}</div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => handleSignUp(selectedOpportunity)}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
            <button
              onClick={handleNotInterested}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Not Interested
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recommended Opportunities
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="p-4 hover:bg-gray-50">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900">{opportunity.title}</h4>
                    <button 
                      onClick={() => setSelectedOpportunity(opportunity)}
                      className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{opportunity.organization}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {opportunity.location}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {opportunity.date} • {opportunity.duration}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{opportunity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardDiscover;