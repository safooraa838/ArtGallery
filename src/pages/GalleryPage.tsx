import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { ArtGrid } from '../components/gallery/ArtGrid';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useGallery } from '../contexts/GalleryContext';

export const GalleryPage: React.FC = () => {
  const location = useLocation();
  const { filterArtworks, sortArtworks, filter, sort } = useGallery();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filter.searchTerm);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterArtworks({ searchTerm });
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    filterArtworks({ searchTerm: '' });
  };
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sortArtworks(e.target.value as any);
  };
  
  // Display success message if redirected from submission
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setShowMessage(true);
      
      // Clear message after 5 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
          Art Gallery
        </h1>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pr-10 w-full md:w-64"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <Search size={16} />
            </button>
          </form>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilters}
            icon={<Filter size={16} />}
            className="hidden md:flex"
          >
            Filters
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilters}
            className="md:hidden"
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>
      
      {showMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={() => setShowMessage(false)}
            className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100"
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      <div className="mb-8">
        <div className={`${isFiltersOpen ? 'block' : 'hidden'} bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <SlidersHorizontal size={18} className="mr-2" />
              Filter & Sort
            </h2>
            <button
              onClick={toggleFilters}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Sort By
              </label>
              <select
                value={sort}
                onChange={handleSortChange}
                className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
              >
                <option value="latest">Latest Additions</option>
                <option value="title">Title (A-Z)</option>
                <option value="artist">Artist (A-Z)</option>
                <option value="year">Year (Oldest First)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Artist
              </label>
              <Input
                type="text"
                placeholder="Filter by artist name"
                value={filter.artistName}
                onChange={(e) => filterArtworks({ artistName: e.target.value })}
                fullWidth
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {['Impressionism', 'Portrait', 'Landscape', 'Modern', 'Abstract', 'Sculpture'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const currentTags = [...filter.tags];
                      const tagIndex = currentTags.indexOf(tag);
                      
                      if (tagIndex >= 0) {
                        currentTags.splice(tagIndex, 1);
                      } else {
                        currentTags.push(tag);
                      }
                      
                      filterArtworks({ tags: currentTags });
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filter.tags.includes(tag)
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={() => {
                filterArtworks({
                  searchTerm: '',
                  tags: [],
                  artistName: '',
                });
                setSearchTerm('');
              }}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={toggleFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={toggleFilters}
            className={`${isFiltersOpen ? 'hidden' : 'flex'} items-center text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500`}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            {filter.tags.length > 0 || filter.artistName ? 'Filters Applied' : 'Show Filters'}
          </button>
          
          {(filter.searchTerm || filter.tags.length > 0 || filter.artistName) && (
            <div className="flex items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">
                Active filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {filter.searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    Search: {filter.searchTerm}
                    <button
                      onClick={handleClearSearch}
                      className="ml-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                
                {filter.artistName && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    Artist: {filter.artistName}
                    <button
                      onClick={() => filterArtworks({ artistName: '' })}
                      className="ml-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                
                {filter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tag}
                    <button
                      onClick={() => {
                        const newTags = filter.tags.filter((t) => t !== tag);
                        filterArtworks({ tags: newTags });
                      }}
                      className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                
                <button
                  onClick={() => {
                    filterArtworks({
                      searchTerm: '',
                      tags: [],
                      artistName: '',
                    });
                    setSearchTerm('');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ArtGrid />
    </div>
  );
};