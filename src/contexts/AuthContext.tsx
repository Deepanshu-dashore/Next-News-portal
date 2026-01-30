'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'author' | 'editor';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cookie configuration for security
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  sameSite: 'lax' as const, // Changed from strict to lax for better compatibility
  path: '/', // Available throughout the application
};

const AUTH_TOKEN_COOKIE = 'authToken';
const USER_DATA_COOKIE = 'userData';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount by reading from cookies
    const storedUser = Cookies.get(USER_DATA_COOKIE);
    const authToken = Cookies.get(AUTH_TOKEN_COOKIE);
    
    console.log('AuthContext - Checking cookies on mount');
    console.log('AuthContext - Stored user cookie:', storedUser);
    console.log('AuthContext - Auth token cookie:', authToken ? 'exists' : 'missing');
    
    if (storedUser && authToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('AuthContext - Parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        // If cookie data is corrupted, clear everything
        console.error('AuthContext - Error parsing user data:', error);
        Cookies.remove(USER_DATA_COOKIE);
        Cookies.remove(AUTH_TOKEN_COOKIE);
      }
    } else {
      console.log('AuthContext - No stored user or token found');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext - Attempting login for:', email);
      
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies in requests
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('AuthContext - Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Extract user data from the response
      const userData: User = {
        id: data.data.id || data.data._id || '',
        email: data.data.email,
        name: data.data.name,
        role: data.data.role,
      };

      console.log('AuthContext - User data to store:', userData);

      setUser(userData);
      
      // Store user data and token in secure cookies
      Cookies.set(USER_DATA_COOKIE, JSON.stringify(userData), COOKIE_OPTIONS);
      Cookies.set(AUTH_TOKEN_COOKIE, data.data.token, COOKIE_OPTIONS);
      
      console.log('AuthContext - Cookies set, redirecting to dashboard');

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('AuthContext - Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    
    // Remove all auth cookies
    Cookies.remove(USER_DATA_COOKIE, { path: '/' });
    Cookies.remove(AUTH_TOKEN_COOKIE, { path: '/' });
    
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
