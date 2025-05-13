import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

type FormType = 'login' | 'register';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  
  const [formType, setFormType] = useState<FormType>('login');
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the redirect path from location state if available
  const from = location.state?.from || '/';
  const message = location.state?.message || '';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const toggleFormType = () => {
    setFormType((prev) => (prev === 'login' ? 'register' : 'login'));
    setErrors({});
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (formType === 'register') {
      if (!formState.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (formState.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (formState.password !== formState.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!formState.password) {
        newErrors.password = 'Password is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let success = false;
      
      if (formType === 'login') {
        success = await login(formState.username, formState.password);
      } else {
        success = await register(formState.username, formState.email, formState.password);
      }
      
      if (success) {
        navigate(from);
      } else {
        setErrors({
          form: formType === 'login'
            ? 'Invalid username or password'
            : 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({
        form: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {message && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg">
          {message}
        </div>
      )}
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <LogIn className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">
          {formType === 'login' ? 'Sign in to your account' : 'Create an account'}
        </h2>
        
        {errors.form && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Enter your username"
            fullWidth
          />
          
          {formType === 'register' && (
            <Input
              label="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
              fullWidth
            />
          )}
          
          <Input
            label="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            error={errors.password}
            placeholder={formType === 'register' ? 'Create a password' : 'Enter your password'}
            fullWidth
          />
          
          {formType === 'register' && (
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formState.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              fullWidth
            />
          )}
          
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            fullWidth
            className="mt-6"
          >
            {formType === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {formType === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type="button"
              onClick={toggleFormType}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              {formType === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};