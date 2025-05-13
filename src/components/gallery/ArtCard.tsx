import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Artwork } from '../../types';
import { useGallery } from '../../contexts/GalleryContext';

interface ArtCardProps {
  artwork: Artwork;
}

export const ArtCard: React.FC<ArtCardProps> = ({ artwork }) => {
  const { favorites, toggleFavorite } = useGallery();
  const isFavorited = favorites.includes(artwork.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(artwork.id);
  };
  
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/artwork/${artwork.id}`} className="block">
        <div className="relative pb-[100%] overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow transition-all duration-200"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={20}
              className={`${
                isFavorited
                  ? 'fill-red-500 text-red-500'
                  : 'text-slate-600 dark:text-slate-400'
              } transition-colors duration-200`}
            />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white line-clamp-1 mb-1">
            {artwork.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            {artwork.artist}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-2">
            {artwork.description}
          </p>
          
          {artwork.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {artwork.tags.slice(0, 2).map((tag) => (
                tag && (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                )
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};