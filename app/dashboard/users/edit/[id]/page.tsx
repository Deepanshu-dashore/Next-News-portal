'use client';

import { use, useState, useEffect } from 'react';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { UserForm } from '@/src/components/dashboard/UserForm';
import AppLayoutProvider from '@/src/components/layout/AppLayoutProvider';
import { useUsers } from '@/src/hooks/useUsers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditUserPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { users, isLoading, updateUser, isUpdating } = useUsers();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const foundUser = users.find((u: any) => u._id === id);
    if (foundUser) {
      setUser({
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        password: '',
        confirmPassword: '',
        role: foundUser.role,
        isActive: foundUser.isActive,
        bio: foundUser.bio || '',
      });
    }
  }, [users, id]);

  const handleSubmit = async (data: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      updateUser(
        { id, data },
        {
          onSuccess: () => {
            resolve(undefined);
          },
          onError: (error: any) => {
            reject(error);
          },
        }
      );
    });
  };

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={['admin', 'editor']}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-red-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-600 font-semibold">Loading user...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!user) {
    return (
      <ProtectedRoute allowedRoles={['admin']}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 font-semibold">User not found</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AppLayoutProvider>
        <div className="max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors mb-4 font-medium"
            >
              <Icon icon="mdi:arrow-left" width="20" height="20" />
              Back
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/dashboard" className="hover:text-red-600 transition font-medium">Dashboard</Link>
              <span className="text-gray-400">/</span>
              <Link href="/dashboard/users" className="hover:text-red-600 transition font-medium">Users</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Edit {user.name}</span>
            </div>

            {/* Page Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-linear-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white">
                <Icon icon="mdi:pencil" width="24" height="24" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit User Profile</h1>
                <p className="text-gray-600">Update {user.name}'s information</p>
              </div>
            </div>
          </div>

          {/* User Form */}
          <UserForm
            initialData={user}
            isEditing={true}
            onSubmit={handleSubmit}
          />
        </div>
      </AppLayoutProvider>
    </ProtectedRoute>
  );
}
