import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { Artwork } from '../../types';
import { useGallery } from '../../contexts/GalleryContext';
import { Button } from '../ui/Button';

interface ArtDetailProps {
  artwork: Artwork;
}

export const ArtDetail: React.FC<ArtDetailProps> = ({ artwork }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, artworks } = useGallery();
  const isFavorited = favorites.includes(artwork.id);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  // Find related artworks based on artist or tags
  const relatedArtworks = artworks
    .filter(
      (art) => 
        art.id !== artwork.id && 
        (art.artist === artwork.artist || 
          art.tags.some((tag) => artwork.tags.includes(tag)))
    )
    .slice(0, 3);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleFavoriteClick = () => {
    toggleFavorite(artwork.id);
  };
  
  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
  };
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: artwork.title,
          text: `Check out "${artwork.title}" by ${artwork.artist}`,
          url: window.location.href,
        });
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={handleBackClick}
        icon={<ArrowLeft size={18} />}
      >
        Back to Gallery
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Artwork Image */}
        <div className="relative">
          <div className={`relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 ${
            isImageZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}>
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className={`w-full h-auto object-contain transition-transform duration-300 ${
                isImageZoomed ? 'scale-150' : 'scale-100'
              }`}
              onClick={handleImageClick}
            />
          </div>
          <div className="mt-4 flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleFavoriteClick}
              icon={<Heart size={18} className={isFavorited ? 'fill-red-500 text-red-500' : ''} />}
            >
              {isFavorited ? 'Favorited' : 'Add to Favorites'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              icon={<Share2 size={18} />}
            >
              Share
            </Button>
          </div>
        </div>
        
        {/* Artwork Details */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {artwork.title}
          </h1>
          <h2 className="text-xl text-slate-700 dark:text-slate-300 mb-4">
            {artwork.artist}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Year</h3>
              <p className="text-slate-900 dark:text-white">{artwork.year || 'Unknown'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Medium</h3>
              <p className="text-slate-900 dark:text-white">{artwork.medium}</p>
            </div>
            
            {artwork.dimensions && (
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Dimensions</h3>
                <p className="text-slate-900 dark:text-white">{artwork.dimensions}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Description</h3>
              <p className="text-slate-900 dark:text-white whitespace-pre-line">
                {artwork.description}
              </p>
            </div>
            
            {artwork.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    tag && (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
            
            {artwork.source === 'api' && (
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
                >
                  <ExternalLink size={16} className="mr-1" />
                  View in museum collection
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Artworks */}
      {relatedArtworks.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Related Artworks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedArtworks.map((relatedArt) => (
              <div
                key={relatedArt.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/artwork/${relatedArt.id}`)}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <img
                    src={relatedArt.imageUrl}
                    alt={relatedArt.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-white">
                  {relatedArt.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {relatedArt.artist}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};