'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/src/lib/axios';
import { 
  setAuthToken, 
  setUserData, 
  getUserData, 
  clearAuthCookies,
  isAuthenticated 
} from '@/src/lib/cookies';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'author' | 'editor';
  avatarUrl?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount by reading from cookies
    if (isAuthenticated()) {
      const storedUser = getUserData<User>();
      if (storedUser) {
        setUser(storedUser);
      } else {
        // If cookie data is corrupted, clear everything
        clearAuthCookies();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/user/login', { email, password });

      const data = response.data;

      // Extract user data and token from the response
      const userData: User = {
        id: data.data.id || data.data._id || '',
        email: data.data.email,
        name: data.data.name,
        role: data.data.role,
        avatarUrl: data.data.avatarUrl,
        bio: data.data.bio,
      };

      // Store the auth token in cookies
      if (data.token) {
        setAuthToken(data.token);
      }

      // Store user data in cookies
      setUserData(userData);
      setUser(userData);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.error('AuthContext - Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    setUser(null);
    
    // Call logout API
    try {
      await apiClient.post('/user/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Clear all auth cookies
    clearAuthCookies();
    
    router.push('/author-login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
