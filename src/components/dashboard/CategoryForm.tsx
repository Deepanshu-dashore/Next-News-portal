'use client';

import { useState, useEffect } from 'react';

interface CategoryFormProps {
  category?: any | null;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface CategoryFormData {
  name: string;
  description: string;
  slug?: string;
  isActive: boolean;
}

export default function CategoryForm({ category, onSubmit, onCancel, isLoading }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    slug: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        slug: category.slug || '',
        isActive: category.isActive,
      });
    }
  }, [category]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 p-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">
          {category ? 'Edit Category' : 'Add New Category'}
        </h2>
        <p className="text-green-100 text-sm mt-1">
          {category ? 'Update category information' : 'Fill in the details to add a new category'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Category Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Category Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-600/20 outline-none transition-all ${
              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
            }`}
            placeholder="Enter category name"
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-600/20 outline-none transition-all resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
            }`}
            placeholder="Enter category description"
            disabled={isLoading}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600 font-medium">{errors.description}</p>}
        </div>

        {/* Slug (Optional) */}
        <div>
          <label htmlFor="slug" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Slug (Optional)
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none transition-all"
            placeholder="auto-generated-slug"
            disabled={isLoading}
          />
          <p className="mt-2 text-xs text-gray-500">Leave empty to auto-generate from category name</p>
        </div>

        {/* Active Status */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Status
          </label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-600 cursor-pointer"
                disabled={isLoading}
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
            <span className="text-sm text-gray-500">
              {formData.isActive ? 'Category is visible' : 'Category is hidden'}
            </span>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : category ? (
            'Update Category'
          ) : (
            'Create Category'
          )}
        </button>
      </div>
    </form>
  );
}
