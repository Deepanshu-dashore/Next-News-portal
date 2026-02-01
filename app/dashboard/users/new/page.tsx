'use client';

import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { UserForm } from '@/src/components/dashboard/UserForm';
import AppLayoutProvider from '@/src/components/layout/AppLayoutProvider';
import { useUsers, UserFormData } from '@/src/hooks/useUsers';

export default function NewUserPage() {
  const { createUser, isCreating } = useUsers();

  const handleSubmit = async (data: UserFormData): Promise<void> => {
    return new Promise((resolve, reject) => {
      createUser(data, {
        onSuccess: () => {
          resolve(undefined);
        },
        onError: (error: any) => {
          reject(error);
        },
      });
    });
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'editor']}>
      <AppLayoutProvider>
        <div className="max-w-3xl mx-auto">
          <UserForm
            isEditing={false}
            onSubmit={handleSubmit}
          />
        </div>
      </AppLayoutProvider>
    </ProtectedRoute>
  );
}
