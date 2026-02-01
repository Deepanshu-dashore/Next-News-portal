'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { Container } from '@/components/ui/Container';
import { DataTable, Column } from '@/src/components/dashboard/DataTable';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { DeleteConfirmationModal } from '@/src/components/dashboard/DeleteConfirmationModal';
import { useCategories, useDeleteCategory, useCreateCategory, useUpdateCategory } from '@/src/hooks/useCategories';
import { Category } from '@/src/lib/api/category.api';
import CategoryUploadForm, { CategoryUploadFormData } from '@/components/dashboard/CategoryUploadForm';

export default function CategoriesManagementPage() {
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const { data: categories, isLoading } = useCategories();
  const deleteMutation = useDeleteCategory();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const columns: Column<Category>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (category) => (
        <div>
          <p className="font-bold text-gray-900">{category.name}</p>
          <p className="text-xs text-gray-500">{category.slug}</p>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (category) => (
        <p className="text-sm text-gray-700 max-w-md truncate">{category.description}</p>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      sortable: true,
      render: (category) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase ${
            category.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {category.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    // {
    //   key: 'createdAt',
    //   label: 'Created',
    //   sortable: true,
    //   render: (category) => (
    //     <span className="text-sm text-gray-600">
    //       {new Date(category.createdAt).toDateString()}
    //     </span>
    //   ),
    // },
    // {
    //   key: 'updatedAt',
    //   label: 'Updated',
    //   sortable: true,
    //   render: (category) => (
    //     <span className="text-sm text-gray-600">
    //       {new Date(category.updatedAt).toLocaleDateString()}
    //     </span>
    //   ),
    // },
  ];

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setModalMode('create');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setModalMode('create');
  };

  const handleSubmit = async (data: CategoryUploadFormData) => {
    try {
      if (modalMode === 'create') {
        await createMutation.mutateAsync(data);
      } else if (editingCategory) {
        await updateMutation.mutateAsync({ id: editingCategory._id, data });
      }
      handleCloseModal();
    } catch (error) {
      console.error(`Failed to ${modalMode} category:`, error);
    }
  };

  const handleDelete = async (category: Category) => {
    setDeleteConfirm(category);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      try {
        await deleteMutation.mutateAsync(deleteConfirm._id);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <AdminHeader
        title="Category Management"
        description="Organize your content with categories"
        add={
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/categories/bulk-upload')}
              className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all capitalize tracking-wide cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Bulk 
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-green-600 to-green-800 text-white font-semibold text-sm rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all capitalize tracking-wide cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 14 14">
                <path fill="currentColor" fillRule="evenodd" d="M8 1a1 1 0 0 0-2 0v5H1a1 1 0 0 0 0 2h5v5a1 1 0 1 0 2 0V8h5a1 1 0 1 0 0-2H8z" clipRule="evenodd" strokeWidth={0.5} stroke="currentColor"></path>
              </svg>
              Add Category
            </button>
          </div>
        }
      />
      
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase">Total Categories</p>
                  <p className="text-3xl font-black text-gray-900 mt-2">{categories?.data?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase">Active</p>
                  <p className="text-3xl font-black text-green-600 mt-2">
                    {categories?.data?.filter((c: Category) => c.isActive).length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase">Inactive</p>
                  <p className="text-3xl font-black text-gray-600 mt-2">
                    {categories?.data?.filter((c: Category) => !c.isActive).length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        {/* Categories Table */}
        <DataTable
            data={categories?.data || []}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemKey="_id"
            emptyMessage="No categories found. Click 'Add New Category' to create one."
            isLoading={isLoading}
          />

        {/* Inline Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-black text-gray-900">
                  {modalMode === 'create' ? 'Create New Category' : `Edit ${editingCategory?.name}`}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <CategoryUploadForm
                  onSubmit={handleSubmit}
                  onCancel={handleCloseModal}
                  isLoading={createMutation.isPending || updateMutation.isPending}
                  initialData={
                    modalMode === 'edit' && editingCategory
                      ? {
                          name: editingCategory.name,
                          description: editingCategory.description,
                          isActive: editingCategory.isActive,
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={!!deleteConfirm}
          itemName={deleteConfirm?.name || ''}
          isLoading={deleteMutation.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      </div>
    </ProtectedRoute>
  );
}
