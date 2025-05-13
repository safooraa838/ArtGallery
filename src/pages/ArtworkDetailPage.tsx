import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGallery } from '../contexts/GalleryContext';
import { ArtDetail } from '../components/gallery/ArtDetail';
import { Loader } from 'lucide-react';

export const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artworks, currentArtwork, setCurrentArtwork } = useGallery();
  
  useEffect(() => {
    if (id) {
      const artwork = artworks.find((art) => art.id === id);
      if (artwork) {
        setCurrentArtwork(artwork);
        // Update document title
        document.title = `${artwork.title} by ${artwork.artist} | Art Gallery`;
      } else {
        // Artwork not found, redirect to gallery
        navigate('/gallery');
      }
    }
    
    // Cleanup - reset title when leaving page
    return () => {
      document.title = 'Art Gallery';
      setCurrentArtwork(null);
    };
  }, [id, artworks, navigate, setCurrentArtwork]);
  
  if (!currentArtwork) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="h-8 w-8 text-blue-600 dark:text-blue-500 animate-spin" />
      </div>
    );
  }
  
  return <ArtDetail artwork={currentArtwork} />;
};