'use client';

import { useRouter, useParams } from 'next/navigation';
import { useCategoryBySlug, useUpdateCategory } from '@/src/hooks/useCategories';
import CategoryUploadForm, { CategoryUploadFormData } from '@/components/dashboard/CategoryUploadForm';
import AdminHeader from '@/components/dashboard/AdminHeader';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { data: category, isLoading: isCategoryLoading } = useCategoryBySlug(slug);
  const updateMutation = useUpdateCategory();

  const handleSubmit = async (data: CategoryUploadFormData) => {
    if (!category?.data?._id) return;

    try {
      await updateMutation.mutateAsync({
        id: category.data._id,
        data,
      });
      router.push('/dashboard/categories');
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isCategoryLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!category?.data) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-medium">Category not found</p>
          <button
            onClick={() => router.push('/dashboard/categories')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <AdminHeader
        title="Edit Category"
        description="Update category information"
      />
      
      <div className="max-w-4xl mx-auto p-6">
        <CategoryUploadForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={updateMutation.isPending}
          initialData={{
            name: category.data.name,
            description: category.data.description,
            isActive: category.data.isActive,
          }}
        />
      </div>
    </div>
  );
}
