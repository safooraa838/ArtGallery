import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/forms/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // If user is already authenticated and not directed from a specific page, redirect to home
  useEffect(() => {
    const from = location.state?.from;
    if (isAuthenticated && !from) {
      navigate('/');
    }
  }, [isAuthenticated, location.state, navigate]);
  
  if (isAuthenticated && !location.state?.from) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};