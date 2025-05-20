import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Filter, X } from 'lucide-react';

interface Opportunity {
  id: number;
  title: string;
  organization: string;
  location: string;
  distance: number;
  date: string;
  duration: string;
  description: string;
  image?: string;
  category: string;
  requirements?: string;
  contactEmail?: string;
  contactPhone?: string;
}

function DashboardSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    distance: '25',
    category: 'all categories',
    duration: 'any',
  });
  const [filteredResults, setFilteredResults] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const allOpportunities: Opportunity[] = [
    {
      id: 1,
      title: 'Local Library Reading Program',
      organization: 'City Library',
      location: 'Main Street Library',
      distance: 2.3,
      date: '2024-04-05',
      duration: '2 hours per session',
      description: 'Read to children ages 5-10 and help foster a love of reading. Weekly commitment for 2 months.',
      category: 'education',
      requirements: 'Good reading skills, patience with children, background check required',
      contactEmail: 'volunteer@citylibrary.org',
      contactPhone: '(555) 111-2222'
    },
    {
      id: 2,
      title: 'Beach Cleanup Initiative',
      organization: 'Ocean Conservation Group',
      location: 'Sunset Beach',
      distance: 5.1,
      date: '2024-04-12',
      duration: '3 hours one-time',
      description: 'Join us for a one-time beach cleanup event. All supplies provided. Help keep our beaches clean!',
      category: 'environment',
      requirements: 'Comfortable walking on sand, able to bend and pick up trash',
      contactEmail: 'cleanup@oceanconservation.org'
    },
    {
      id: 3,
      title: 'Senior Center Tech Support',
      organization: 'Senior Care Center',
      location: 'Golden Years Retirement Home',
      distance: 3.7,
      date: '2024-04-08',
      duration: '1-2 hours flexible',
      description: 'Help seniors learn to use smartphones, tablets, and computers. Flexible scheduling.',
      category: 'community service',
      requirements: 'Patient, good with technology, clear communication skills',
      contactEmail: 'volunteer@seniorcare.org',
      contactPhone: '(555) 333-4444'
    },
    {
      id: 4,
      title: 'Animal Shelter Assistant',
      organization: 'Happy Paws Rescue',
      location: 'North Side Animal Shelter',
      distance: 4.2,
      date: '2024-04-10',
      duration: '4 hours weekly',
      description: 'Help care for rescued animals, clean facilities, and assist with adoption events.',
      category: 'animal welfare',
      requirements: 'Comfortable around animals, physically able to clean cages, 16+ years old',
      contactEmail: 'volunteer@happypaws.org',
      contactPhone: '(555) 555-6666'
    },
    {
      id: 5,
      title: 'Community Theater Helper',
      organization: 'Downtown Arts Collective',
      location: 'Community Playhouse',
      distance: 1.8,
      date: '2024-04-15',
      duration: '3-4 hours per event',
      description: 'Assist with set design, ticket sales, ushering, and other tasks for community theater productions.',
      category: 'arts & culture',
      requirements: 'Reliable, customer service skills, interest in theater',
      contactEmail: 'volunteer@downtownarts.org'
    },
    {
      id: 6,
      title: 'Hospital Volunteer',
      organization: 'City General Hospital',
      location: 'City General Hospital',
      distance: 6.5,
      date: '2024-04-03',
      duration: '4 hours weekly',
      description: 'Assist hospital staff with non-medical tasks, provide comfort to patients, and help with visitor services.',
      category: 'healthcare',
      requirements: 'Background check, TB test, 18+ years old, commitment of at least 3 months',
      contactEmail: 'volunteers@citygeneral.org',
      contactPhone: '(555) 777-8888'
    }
  ];

  // Filter opportunities based on search and filters
  useEffect(() => {
    let results = [...allOpportunities];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        opp => 
          opp.title.toLowerCase().includes(term) || 
          opp.organization.toLowerCase().includes(term) ||
          opp.description.toLowerCase().includes(term)
      );
    }
    
    // Apply distance filter
    if (filters.distance !== 'any') {
      const maxDistance = parseInt(filters.distance);
      results = results.filter(opp => opp.distance <= maxDistance);
    }
    
    // Apply category filter
    if (filters.category !== 'all categories') {
      results = results.filter(
        opp => opp.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply duration filter
    if (filters.duration !== 'any') {
      switch (filters.duration) {
        case 'short':
          results = results.filter(opp => opp.duration.includes('1-2') || opp.duration.includes('1 hour') || opp.duration.includes('2 hour'));
          break;
        case 'medium':
          results = results.filter(opp => opp.duration.includes('2-4') || opp.duration.includes('3 hour') || opp.duration.includes('4 hour'));
          break;
        case 'long':
          results = results.filter(opp => {
            const durationText = opp.duration.toLowerCase();
            return durationText.includes('4+') || 
                  (durationText.includes('hour') && parseInt(durationText) >= 4);
          });
          break;
      }
    }
    
    setFilteredResults(results);
  }, [searchTerm, filters]);

  const handleViewDetails = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const handleSignUp = (opportunity: Opportunity) => {
    alert(`You've signed up for: ${opportunity.title}!`);
    setSelectedOpportunity(null);
  };

  const categories = [
    'All Categories',
    'Education',
    'Environment',
    'Healthcare',
    'Animal Welfare',
    'Community Service',
    'Arts & Culture',
  ];

  if (selectedOpportunity) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative p-6">
          <button 
            onClick={() => setSelectedOpportunity(null)}
            className="absolute top-4 right-4 bg-gray-100 p-1 rounded-full"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 pr-10">{selectedOpportunity.title}</h2>
          <p className="text-lg text-gray-600">{selectedOpportunity.organization}</p>
          
          <div className="mt-4 flex items-center text-gray-500">
            <MapPin className="h-5 w-5 mr-2 text-gray-400" />
            {selectedOpportunity.location} ({selectedOpportunity.distance} miles away)
          </div>
          
          <div className="mt-2 flex items-center text-gray-500">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            {new Date(selectedOpportunity.date).toLocaleDateString()} • {selectedOpportunity.duration}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{selectedOpportunity.description}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Category</h3>
            <p className="mt-2 text-gray-600 capitalize">{selectedOpportunity.category}</p>
          </div>
          
          {selectedOpportunity.requirements && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Requirements</h3>
              <p className="mt-2 text-gray-600">{selectedOpportunity.requirements}</p>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            <p className="mt-2 text-gray-600">
              {selectedOpportunity.contactEmail && (
                <div>Email: {selectedOpportunity.contactEmail}</div>
              )}
              {selectedOpportunity.contactPhone && (
                <div>Phone: {selectedOpportunity.contactPhone}</div>
              )}
            </p>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => handleSignUp(selectedOpportunity)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search for volunteer opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-400" />
                Filters
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
                Distance
              </label>
              <select
                id="distance"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.distance}
                onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
              >
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <select
                id="duration"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
              >
                <option value="any">Any Duration</option>
                <option value="short">1-2 hours</option>
                <option value="medium">2-4 hours</option>
                <option value="long">4+ hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Search Results {filteredResults.length > 0 && `(${filteredResults.length})`}
          </h3>
        </div>
        
        {filteredResults.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No opportunities found matching your criteria. Try adjusting your filters.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredResults.map((result) => (
              <div key={result.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {result.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {result.organization}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {result.distance} miles away
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {result.duration}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleViewDetails(result)}
                    className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardSearch;