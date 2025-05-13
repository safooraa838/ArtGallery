// Utility functions for browser storage operations

const STORAGE_KEYS = {
  AUTH: 'art_gallery_auth',
  ARTWORKS: 'art_gallery_artworks',
  FAVORITES: 'art_gallery_favorites',
  THEME: 'art_gallery_theme',
};

// Generic get function for localStorage
export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item from storage: ${key}`, error);
    return null;
  }
};

// Generic set function for localStorage
export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in storage: ${key}`, error);
  }
};

// Generic remove function for localStorage
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from storage: ${key}`, error);
  }
};

// Auth-specific storage functions
export const getAuth = () => getItem(STORAGE_KEYS.AUTH);
export const setAuth = (auth: any) => setItem(STORAGE_KEYS.AUTH, auth);
export const removeAuth = () => removeItem(STORAGE_KEYS.AUTH);

// Artworks-specific storage functions
export const getArtworks = () => getItem(STORAGE_KEYS.ARTWORKS) || [];
export const setArtworks = (artworks: any[]) => setItem(STORAGE_KEYS.ARTWORKS, artworks);
export const addArtwork = (artwork: any) => {
  const artworks = getArtworks();
  setArtworks([...artworks, artwork]);
};

// Favorites-specific storage functions
export const getFavorites = () => getItem(STORAGE_KEYS.FAVORITES) || [];
export const setFavorites = (favorites: string[]) => setItem(STORAGE_KEYS.FAVORITES, favorites);
export const toggleFavorite = (artworkId: string) => {
  const favorites = getFavorites();
  if (favorites.includes(artworkId)) {
    setFavorites(favorites.filter(id => id !== artworkId));
    return false;
  } else {
    setFavorites([...favorites, artworkId]);
    return true;
  }
};

// Theme-specific storage functions
export const getTheme = () => getItem(STORAGE_KEYS.THEME) || 'light';
export const setTheme = (theme: 'light' | 'dark') => setItem(STORAGE_KEYS.THEME, theme);