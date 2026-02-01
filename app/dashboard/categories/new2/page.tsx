'use client';

import { useRouter } from 'next/navigation';
import CategoryUploadForm, { CategoryUploadFormData } from '@/src/components/dashboard/CategoryUploadForm';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { useCreateCategory } from '@/src/hooks/useCategories';

export default function NewCategoryPage() {
  const router = useRouter();
  const createMutation = useCreateCategory();

  const handleSubmit = async (data: CategoryUploadFormData) => {
    try {
      await createMutation.mutateAsync(data);
      router.push('/dashboard/categories');
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <AdminHeader
        title="Create Category"
        description="Add a new category to organize your content"
      />
      
      <div className="max-w-4xl mx-auto p-6">
        <CategoryUploadForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={createMutation.isPending}
        />
      </div>
    </div>
  );
}
