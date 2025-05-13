import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchArtworks } from '../utils/api';
import { getArtworks, setArtworks, getFavorites, setFavorites } from '../utils/storage';
import { GalleryState, Artwork } from '../types';
import { useAuth } from './AuthContext';

interface GalleryContextType extends GalleryState {
  fetchMoreArtworks: () => Promise<void>;
  filterArtworks: (filter: Partial<GalleryState['filter']>) => void;
  sortArtworks: (sort: GalleryState['sort']) => void;
  addArtwork: (artwork: Omit<Artwork, 'id' | 'source'>) => void;
  toggleFavorite: (artworkId: string) => void;
  setCurrentArtwork: (artwork: Artwork | null) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [state, setState] = useState<GalleryState>({
    artworks: [],
    filteredArtworks: [],
    favorites: [],
    loading: true,
    error: null,
    filter: {
      searchTerm: '',
      tags: [],
      artistName: '',
    },
    sort: 'latest',
    currentArtwork: null,
  });

  // Load initial data from storage
  useEffect(() => {
    const storedArtworks = getArtworks();
    const storedFavorites = getFavorites();
    
    if (storedArtworks.length > 0) {
      setState(prev => ({
        ...prev,
        artworks: storedArtworks,
        filteredArtworks: storedArtworks,
        favorites: storedFavorites,
        loading: false,
      }));
    } else {
      // If no stored artworks, fetch from API
      fetchMoreArtworks();
    }
  }, []);

  // Fetch more artworks from the API
  const fetchMoreArtworks = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const newArtworks = await fetchArtworks(page, 10);
      
      // Combine with existing artworks, removing duplicates
      const combinedArtworks = [
        ...state.artworks,
        ...newArtworks.filter(newArt => 
          !state.artworks.some(existingArt => existingArt.id === newArt.id)
        )
      ];
      
      setState(prev => ({
        ...prev,
        artworks: combinedArtworks,
        filteredArtworks: applyFiltersAndSort(
          combinedArtworks, 
          prev.filter, 
          prev.sort
        ),
        loading: false,
      }));
      
      setArtworks(combinedArtworks);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch artworks',
        loading: false,
      }));
    }
  }, [page, state.artworks]);

  // Apply filters and sorting
  const applyFiltersAndSort = (
    artworks: Artwork[], 
    filter: GalleryState['filter'], 
    sort: GalleryState['sort']
  ) => {
    // Apply filters
    let filtered = artworks;
    
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(art => 
        art.title.toLowerCase().includes(searchLower) ||
        art.artist.toLowerCase().includes(searchLower) ||
        art.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (filter.tags.length > 0) {
      filtered = filtered.filter(art => 
        filter.tags.some(tag => art.tags.includes(tag))
      );
    }
    
    if (filter.artistName) {
      filtered = filtered.filter(art => 
        art.artist.toLowerCase().includes(filter.artistName.toLowerCase())
      );
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'year':
          return (a.year || 0) - (b.year || 0);
        case 'latest':
        default:
          // For user-submitted artworks, they should appear first
          if (a.source === 'user' && b.source !== 'user') return -1;
          if (a.source !== 'user' && b.source === 'user') return 1;
          return 0;
      }
    });
  };

  // Filter artworks
  const filterArtworks = (filterUpdates: Partial<GalleryState['filter']>) => {
    const newFilter = { ...state.filter, ...filterUpdates };
    setState(prev => ({
      ...prev,
      filter: newFilter,
      filteredArtworks: applyFiltersAndSort(prev.artworks, newFilter, prev.sort),
    }));
  };

  // Sort artworks
  const sortArtworks = (sort: GalleryState['sort']) => {
    setState(prev => ({
      ...prev,
      sort,
      filteredArtworks: applyFiltersAndSort(prev.artworks, prev.filter, sort),
    }));
  };

  // Add a new artwork
  const addArtwork = (artworkData: Omit<Artwork, 'id' | 'source'>) => {
    const newArtwork: Artwork = {
      ...artworkData,
      id: `user-${Date.now()}`,
      source: 'user',
    };
    
    const updatedArtworks = [newArtwork, ...state.artworks];
    
    setState(prev => ({
      ...prev,
      artworks: updatedArtworks,
      filteredArtworks: applyFiltersAndSort(
        updatedArtworks, 
        prev.filter, 
        prev.sort
      ),
    }));
    
    setArtworks(updatedArtworks);
    
    // If user is authenticated, update their submitted artworks
    if (user) {
      const { updateUser } = useAuth();
      updateUser({
        submittedArtworks: [...(user.submittedArtworks || []), newArtwork.id],
      });
    }
  };

  // Toggle favorite status
  const toggleFavorite = (artworkId: string) => {
    const isFavorited = state.favorites.includes(artworkId);
    const newFavorites = isFavorited
      ? state.favorites.filter(id => id !== artworkId)
      : [...state.favorites, artworkId];
    
    setState(prev => ({
      ...prev,
      favorites: newFavorites,
    }));
    
    setFavorites(newFavorites);
    
    // If user is authenticated, update their favorites
    if (user) {
      const { updateUser } = useAuth();
      updateUser({
        favoriteArtworks: newFavorites,
      });
    }
  };

  // Set current artwork for detail view
  const setCurrentArtwork = (artwork: Artwork | null) => {
    setState(prev => ({
      ...prev,
      currentArtwork: artwork,
    }));
  };

  return (
    <GalleryContext.Provider
      value={{
        ...state,
        fetchMoreArtworks,
        filterArtworks,
        sortArtworks,
        addArtwork,
        toggleFavorite,
        setCurrentArtwork,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};