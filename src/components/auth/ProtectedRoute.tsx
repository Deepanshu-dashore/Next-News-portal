'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'author' | 'editor')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      console.log('ProtectedRoute - User:', user);
      console.log('ProtectedRoute - Allowed Roles:', allowedRoles);
      console.log('ProtectedRoute - User Role:', user?.role);
      
      if (!user) {
        // Not logged in, redirect to login
        console.log('ProtectedRoute - No user, redirecting to login');
        router.push(`/author-login?redirect=${pathname}`);
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // User doesn't have required role
        console.log('ProtectedRoute - User role not allowed, redirecting to unauthorized');
        router.push('/unauthorized');
      } else {
        console.log('ProtectedRoute - User authorized');
      }
    }
  }, [user, isLoading, router, pathname, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--accent-primary)"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
