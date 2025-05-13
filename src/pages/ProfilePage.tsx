import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, PlusCircle, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGallery } from '../contexts/GalleryContext';
import { Button } from '../components/ui/Button';
import { ArtCard } from '../components/gallery/ArtCard';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { artworks, favorites } = useGallery();
  const [activeTab, setActiveTab] = useState<'favorites' | 'submissions'>('favorites');
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/profile', message: 'Please login to view your profile' } });
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }
  
  // Get favorite artworks
  const favoriteArtworks = artworks.filter((artwork) => favorites.includes(artwork.id));
  
  // Get submitted artworks
  const submittedArtworks = artworks.filter((artwork) => artwork.source === 'user');
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-8 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {user.username}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {user.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            icon={<Settings size={18} />}
          >
            Edit Profile
          </Button>
        </div>
        
        <div className="mt-6 flex space-x-4">
          <div className="text-center">
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">
              {favorites.length}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Favorites
            </span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">
              {submittedArtworks.length}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Submissions
            </span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center">
                <Heart size={18} className="mr-2" />
                Favorites
              </div>
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'submissions'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center">
                <PlusCircle size={18} className="mr-2" />
                Your Submissions
              </div>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Content */}
      <div>
        {activeTab === 'favorites' && (
          <>
            {favoriteArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteArtworks.map((artwork) => (
                  <ArtCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  You haven't added any artworks to your favorites yet.
                </p>
                <Link to="/gallery">
                  <Button variant="primary">
                    Explore Gallery
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'submissions' && (
          <>
            {submittedArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {submittedArtworks.map((artwork) => (
                  <ArtCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  You haven't submitted any artworks yet.
                </p>
                <Link to="/submit">
                  <Button variant="primary" icon={<PlusCircle size={18} />}>
                    Submit Artwork
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};