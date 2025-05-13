import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useGallery } from '../../contexts/GalleryContext';
import { useAuth } from '../../contexts/AuthContext';

export const ArtSubmissionForm: React.FC = () => {
  const navigate = useNavigate();
  const { addArtwork } = useGallery();
  const { isAuthenticated } = useAuth();
  
  const [formState, setFormState] = useState({
    title: '',
    artist: '',
    description: '',
    year: '',
    medium: '',
    dimensions: '',
    tags: '',
    imageUrl: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormState((prev) => ({ ...prev, imageUrl: value }));
    
    // Update image preview
    if (value) {
      setImagePreview(value);
    } else {
      setImagePreview(null);
    }
    
    // Clear error for imageUrl
    if (errors.imageUrl) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.imageUrl;
        return newErrors;
      });
    }
  };
  
  const clearImagePreview = () => {
    setImagePreview(null);
    setFormState((prev) => ({ ...prev, imageUrl: '' }));
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formState.artist.trim()) {
      newErrors.artist = 'Artist name is required';
    }
    
    if (!formState.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formState.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!/^https?:\/\/.+/.test(formState.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
    }
    
    if (formState.year && !/^\d{1,4}$/.test(formState.year)) {
      newErrors.year = 'Please enter a valid year (up to 4 digits)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/submit', message: 'Please login to submit artwork' } });
      return;
    }
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process tags from comma-separated string to array
      const tagsArray = formState.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      
      // Convert year to number if present
      const yearNum = formState.year ? parseInt(formState.year, 10) : null;
      
      // Add the new artwork to the gallery
      addArtwork({
        title: formState.title,
        artist: formState.artist,
        description: formState.description,
        imageUrl: formState.imageUrl,
        year: yearNum || 0,
        medium: formState.medium,
        dimensions: formState.dimensions,
        tags: tagsArray,
      });
      
      // Navigate to the gallery
      navigate('/gallery', { state: { message: 'Artwork submitted successfully!' } });
    } catch (error) {
      console.error('Error submitting artwork:', error);
      setErrors({
        submit: 'An error occurred while submitting your artwork. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Input
            label="Title *"
            name="title"
            value={formState.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Enter the title of the artwork"
            fullWidth
          />
          
          <Input
            label="Artist *"
            name="artist"
            value={formState.artist}
            onChange={handleChange}
            error={errors.artist}
            placeholder="Enter the artist's name"
            fullWidth
          />
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeholder="Enter a description of the artwork"
              rows={5}
              className={`block w-full rounded-md border ${
                errors.description ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
              } bg-white dark:bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Year"
              name="year"
              value={formState.year}
              onChange={handleChange}
              error={errors.year}
              placeholder="e.g., 2023"
              type="number"
              fullWidth
            />
            
            <Input
              label="Medium"
              name="medium"
              value={formState.medium}
              onChange={handleChange}
              error={errors.medium}
              placeholder="e.g., Oil on canvas"
              fullWidth
            />
          </div>
          
          <Input
            label="Dimensions"
            name="dimensions"
            value={formState.dimensions}
            onChange={handleChange}
            error={errors.dimensions}
            placeholder="e.g., 24 x 36 inches"
            fullWidth
          />
          
          <Input
            label="Tags"
            name="tags"
            value={formState.tags}
            onChange={handleChange}
            error={errors.tags}
            placeholder="e.g., abstract, landscape, modern (comma separated)"
            fullWidth
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Image URL *
            </label>
            <Input
              name="imageUrl"
              value={formState.imageUrl}
              onChange={handleImageUrlChange}
              error={errors.imageUrl}
              placeholder="https://example.com/artwork.jpg"
              fullWidth
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Enter a URL to an image of the artwork
            </p>
          </div>
          
          {imagePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                src={imagePreview}
                alt="Artwork preview"
                className="w-full h-auto object-contain max-h-[300px]"
                onError={() => {
                  setErrors((prev) => ({
                    ...prev,
                    imageUrl: 'Failed to load image. Please check the URL and try again.',
                  }));
                }}
              />
              <button
                type="button"
                onClick={clearImagePreview}
                className="absolute top-2 right-2 p-1 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white hover:text-slate-900 dark:hover:bg-slate-700"
                aria-label="Clear image preview"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-[300px] rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700">
              <div className="text-center">
                <Upload
                  size={48}
                  className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500"
                />
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Enter an image URL above to see a preview here
                </p>
              </div>
            </div>
          )}
          
          {errors.submit && (
            <div className="p-3 rounded-md bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
              {errors.submit}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button
          type="button"
          variant="outline"
          className="mr-4"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          Submit Artwork
        </Button>
      </div>
    </form>
  );
};