import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, setAuth, removeAuth } from '../utils/storage';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAuth = getAuth();
    if (storedAuth) {
      setAuthState(storedAuth);
    }
  }, []);

  // Simulated login (in a real app, this would call an API)
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll accept any credentials
      // In a real app, you would validate against a backend
      const user: User = {
        id: uuidv4(),
        username,
        email: `${username}@example.com`, // Simplified for demo
        favoriteArtworks: [],
        submittedArtworks: [],
      };
      
      const newAuthState = {
        user,
        isAuthenticated: true,
      };
      
      setAuthState(newAuthState);
      setAuth(newAuthState);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Simulated registration
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll accept any registration
      const user: User = {
        id: uuidv4(),
        username,
        email,
        favoriteArtworks: [],
        submittedArtworks: [],
      };
      
      const newAuthState = {
        user,
        isAuthenticated: true,
      };
      
      setAuthState(newAuthState);
      setAuth(newAuthState);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    removeAuth();
  };

  // Update user function
  const updateUser = (updates: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = {
      ...authState.user,
      ...updates,
    };
    
    const newAuthState = {
      ...authState,
      user: updatedUser,
    };
    
    setAuthState(newAuthState);
    setAuth(newAuthState);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};