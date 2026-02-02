'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'article' | 'category' | 'tag';
  slug?: string;
}

interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void;
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
}

export interface SearchFilters {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  author?: string;
  tags?: string[];
  sortBy?: 'latest' | 'trending' | 'popular';
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search articles, categories, tags...', 
  showFilters = false,
  className = ''
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Simulated search suggestions (in production, fetch from API)
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Technology News', type: 'category', slug: 'technology' },
    { id: '2', title: 'AI Revolution in Healthcare', type: 'article', slug: 'ai-revolution-healthcare' },
    { id: '3', title: 'Climate Change', type: 'tag' },
    { id: '4', title: 'Business Growth Strategies', type: 'article', slug: 'business-growth' },
  ];

  useEffect(() => {
    if (query.length > 2) {
      // Filter suggestions based on query
      const filtered = mockSuggestions.filter(s => 
        s.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, filters);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    onSearch(suggestion.title, filters);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return 'heroicons:document-text-20-solid';
      case 'category': return 'heroicons:folder-20-solid';
      case 'tag': return 'heroicons:tag-20-solid';
      default: return 'heroicons:magnifying-glass-20-solid';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'text-blue-600 bg-blue-50';
      case 'category': return 'text-purple-600 bg-purple-50';
      case 'tag': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-24 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <div className="absolute left-4 text-gray-400">
            <Icon icon="heroicons:magnifying-glass-20-solid" className="w-5 h-5" />
          </div>
          
          <div className="absolute right-2 flex items-center gap-2">
            {showFilters && (
              <button
                type="button"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`p-2 rounded-lg hover:bg-gray-100 transition ${
                  showFilterPanel ? 'bg-gray-100 text-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon icon="heroicons:adjustments-horizontal-20-solid" className="w-5 h-5" />
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left"
              >
                <div className={`p-2 rounded-lg ${getTypeColor(suggestion.type)}`}>
                  <Icon icon={getTypeIcon(suggestion.type)} className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                  <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
                </div>
                <Icon icon="heroicons:chevron-right-20-solid" className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Advanced Filters Panel */}
      {showFilters && showFilterPanel && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-50">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Advanced Filters</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Categories</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy || 'latest'}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="latest">Latest</option>
                <option value="trending">Trending</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setFilters({});
                setShowFilterPanel(false);
              }}
              className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={() => {
                onSearch(query, filters);
                setShowFilterPanel(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
