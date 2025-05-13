import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">ArtGallery</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              A platform for art enthusiasts to discover, share, and appreciate beautiful artwork from around the world.
            </p>
            <div className="flex items-center mt-4 text-slate-600 dark:text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>for art lovers</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/gallery" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                  Featured Arts
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                  Submit Art
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500 flex items-center">
                  <Github size={16} className="mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500 flex items-center">
                  <Twitter size={16} className="mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500 flex items-center">
                  <Instagram size={16} className="mr-2" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              &copy; {new Date().getFullYear()} ArtGallery. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/about" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                About
              </Link>
              <Link to="/privacy" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};