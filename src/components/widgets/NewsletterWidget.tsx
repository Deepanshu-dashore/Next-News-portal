'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import apiClient from '@/src/lib/axios';

export function NewsletterWidget() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      
      // Use the axios client for API calls
      const response = await apiClient.post('/subscriber', { 
        name: name.trim(),
        email: email.trim() 
      });

      if (response.data?.success || response.status === 200 || response.status === 201) {
        toast.success(`Welcome ${name}! You've subscribed to Daily Briefing!`);
        setName('');
        setEmail('');
      } else {
        toast.error(response.data?.error || response.data?.message || 'Failed to subscribe');
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      
      // Check for specific error messages
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message;

      // Handle already exists error
      if (errorMessage?.toLowerCase().includes('already') || 
          errorMessage?.toLowerCase().includes('exist') ||
          error.response?.status === 409) {
        toast.error(`${email} is already subscribed to our newsletter!`);
      } else {
        toast.error(errorMessage || 'An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="newsletter-section" className="bg-black px-6 text-white p-8 text-center border border-gray-200 rounded-3xl shadow-sm scroll-mt-20">
      <div className="w-12 h-12 bg-(--accent-primary) text-white rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h3 className="text-xl text-white font-black uppercase tracking-tight mb-2">
        Daily Briefing
      </h3>
      
      <p className="text-gray-300 text-xs font-medium leading-relaxed mb-6">
        Get the most important news stories delivered to your inbox every morning.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input 
          type="text" 
          placeholder="Your name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          className="h-11 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-(--accent-primary) focus:ring-2 focus:ring-(--accent-primary)/20 text-sm"
        />
        <Input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="h-11 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-(--accent-primary) focus:ring-2 focus:ring-(--accent-primary)/20 text-sm"
        />
        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-(--accent-primary) text-white hover:bg-(--accent-primary)/90 font-black uppercase tracking-widest text-[10px] shadow-sm disabled:opacity-70" 
          size="sm"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe Free'}
        </Button>
      </form>
      
      <p className="text-[10px] text-gray-300 mt-4">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
