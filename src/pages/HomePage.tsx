import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, Upload, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-amber-500/20 dark:from-blue-900/40 dark:to-amber-700/40" />
          <div className="absolute inset-0 bg-grid-slate-900/10 dark:bg-grid-slate-200/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Discover, Experience, and Share <br className="hidden md:block" />
            <span className="text-blue-600 dark:text-blue-500">Beautiful Art</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8">
            Explore our curated collection of artworks or share your own creations with the world.
            A virtual gallery experience, right in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/gallery">
              <Button size="lg" variant="primary" icon={<Search size={20} />}>
                Explore Gallery
              </Button>
            </Link>
            <Link to={isAuthenticated ? "/submit" : "/login"}>
              <Button size="lg" variant="outline" icon={<Upload size={20} />}>
                Submit Artwork
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Artworks Preview */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Featured Artworks
            </h2>
            <Link to="/gallery" className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400">
              <span className="mr-1">View all</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Artwork Cards (For visual structure, no real data) */}
            {[
              {
                title: "Starry Night",
                artist: "Vincent van Gogh",
                image: "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg"
              },
              {
                title: "Water Lilies",
                artist: "Claude Monet",
                image: "https://images.pexels.com/photos/889839/pexels-photo-889839.jpeg"
              },
              {
                title: "The Persistence of Memory",
                artist: "Salvador Dalí",
                image: "https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg"
              }
            ].map((artwork, index) => (
              <div key={index} className="group relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link to="/gallery" className="block">
                  <div className="relative pb-[70%] overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {artwork.artist}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Our Gallery
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
              Experience art in a new way with our interactive features designed for art enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Discover Art
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Explore a vast collection of artworks from renowned museums and independent artists around the world.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Favorite Collections
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Create your personal collection by saving artworks you love, making it easy to revisit and share your favorites.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Artist Community
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Join a vibrant community of art enthusiasts and creators. Share your own artwork and gain recognition.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to start your artistic journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of art enthusiasts in our community. Browse the gallery or share your own masterpieces today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/gallery">
              <Button size="lg" variant="secondary">
                Explore Gallery
              </Button>
            </Link>
            <Link to={isAuthenticated ? "/submit" : "/login"}>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};