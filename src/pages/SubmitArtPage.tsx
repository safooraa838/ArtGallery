import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ArtSubmissionForm } from '../components/forms/ArtSubmissionForm';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const SubmitArtPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/submit', message: 'Please login to submit artwork' } });
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          icon={<ArrowLeft size={18} />}
          className="mb-4"
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Submit Your Artwork
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Share your creation with the art community. Please provide the details below.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-8">
        <ArtSubmissionForm />
      </div>
    </div>
  );
};