'use client';

import { useState } from 'react';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { Container } from '@/components/ui/Container';
import { DataTable, Column } from '@/src/components/dashboard/DataTable';
import CategoryForm, { CategoryFormData } from '@/src/components/dashboard/CategoryForm';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/src/hooks/useCategories';
import { Category } from '@/src/lib/api/category.api';

export default function CategoriesManagementPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);

  const { data: categories, isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

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
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (category) => (
        <span className="text-sm text-gray-600">
          {new Date(category.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'updatedAt',
      label: 'Updated',
      sortable: true,
      render: (category) => (
        <span className="text-sm text-gray-600">
          {new Date(category.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await updateMutation.mutateAsync({ id: editingCategory._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
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

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <Container>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                Category Management
              </h1>
              <p className="text-gray-600 mt-2">Organize your content with categories</p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all uppercase tracking-wide cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Category
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {!showForm && (
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
        )}

        {/* Form or Table */}
        {showForm ? (
          <CategoryForm
            category={editingCategory}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        ) : (
          <DataTable
            data={categories?.data || []}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemKey="_id"
            emptyMessage="No categories found. Click 'Add New Category' to create one."
            isLoading={isLoading}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Confirm Delete</h3>
                  <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <span className="font-bold">"{deleteConfirm.name}"</span>?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  disabled={deleteMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </ProtectedRoute>
  );
}
