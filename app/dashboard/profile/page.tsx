'use client';

import { useState } from 'react';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useAuth } from '@/src/contexts/AuthContext';
import { useUserProfile, useUpdateProfile, UpdateProfileData } from '@/src/hooks/useUserProfile';
import AppLayoutProvider from '@/src/components/layout/AppLayoutProvider';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import UserProfileView from '@/src/components/dashboard/UserProfileView';
import UserProfileEdit from '@/src/components/dashboard/UserProfileEdit';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { data: profile, isLoading } = useUserProfile(user?.id || '');
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const handleSave = (data: UpdateProfileData): Promise<void> => {
    if (!user?.id) return Promise.resolve();

    return new Promise((resolve, reject) => {
      updateProfile(
        { userId: user.id, data },
        {
          onSuccess: () => {
            setIsEditing(false);
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
      <ProtectedRoute>
        <AppLayoutProvider>
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-red-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-600 font-semibold">Loading profile...</p>
            </div>
          </div>
        </AppLayoutProvider>
      </ProtectedRoute>
    );
  }

  if (!profile) {
    return (
      <ProtectedRoute>
        <AppLayoutProvider>
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <p className="text-gray-600 font-semibold">Profile not found</p>
            </div>
          </div>
        </AppLayoutProvider>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppLayoutProvider>
        <div className="space-y-8">
          <AdminHeader
            title={isEditing ? 'Edit Profile' : 'My Profile'}
            description={isEditing ? 'Update your profile information' : 'View and manage your profile'}
          />

          {isEditing ? (
            <UserProfileEdit
              profile={profile}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
              isLoading={isUpdating}
            />
          ) : (
            <UserProfileView profile={profile} onEdit={() => setIsEditing(true)} />
          )}
        </div>
      </AppLayoutProvider>
    </ProtectedRoute>
  );
}
