'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import MultiCategoryUploadForm from '@/src/components/dashboard/MultiCategoryUploadForm';
import { useBulkCreateCategories } from '@/src/hooks/useCategories';
import AdminHeader from '@/src/components/dashboard/AdminHeader';

export default function BulkUploadCategoryPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const bulkCreateMutation = useBulkCreateCategories();

  const handleSubmit = async (categories: any[]) => {
    setError(null);
    setSuccess(null);

    try {
      await bulkCreateMutation.mutateAsync(categories);
      setSuccess(`Successfully created ${categories.length} categor${categories.length === 1 ? 'y' : 'ies'}!`);
      
      // Redirect to categories page after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/categories');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create categories');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/categories');
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <div>
          {/* Page Header */}
          <AdminHeader
            title="Bulk Category Upload"
            description="Create multiple categories at once"
            back='back'
          />

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-green-900">Success!</h3>
                <p className="text-green-700 text-sm">{success}</p>
                <p className="text-green-600 text-xs mt-1">Redirecting to categories page...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-red-900">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <MultiCategoryUploadForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={bulkCreateMutation.isPending}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
