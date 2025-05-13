import React, { useEffect, useRef, useCallback } from 'react';
import { ArtCard } from './ArtCard';
import { useGallery } from '../../contexts/GalleryContext';
import { Loader } from 'lucide-react';

export const ArtGrid: React.FC = () => {
  const { filteredArtworks, loading, fetchMoreArtworks } = useGallery();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  // Setup infinite scrolling
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        fetchMoreArtworks();
      }
    },
    [fetchMoreArtworks, loading]
  );
  
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '100px',
    });
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);
  
  if (filteredArtworks.length === 0 && !loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          No artworks found. Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredArtworks.map((artwork) => (
          <ArtCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
      
      <div ref={loadMoreRef} className="h-16 flex items-center justify-center mt-4">
        {loading && (
          <div className="flex items-center justify-center">
            <Loader className="h-6 w-6 text-blue-600 dark:text-blue-500 animate-spin" />
            <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
              Loading more artworks...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};