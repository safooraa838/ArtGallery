// Types for artwork data
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
  year: number;
  medium: string;
  dimensions?: string;
  tags: string[];
  source: 'api' | 'user';
}

// Types for user data
export interface User {
  id: string;
  username: string;
  email: string;
  favoriteArtworks: string[];
  submittedArtworks: string[];
}

// Types for authentication
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Types for gallery context
export interface GalleryState {
  artworks: Artwork[];
  filteredArtworks: Artwork[];
  favorites: string[];
  loading: boolean;
  error: string | null;
  filter: {
    searchTerm: string;
    tags: string[];
    artistName: string;
  };
  sort: 'title' | 'artist' | 'year' | 'latest';
  currentArtwork: Artwork | null;
}

// Types for theme
export type Theme = 'light' | 'dark';