'use client';

import { useState, useEffect } from 'react';
import FormHeader from './FormHeader';
import SubmitButton from './SubmitButton';

interface CategoryUploadFormProps {
  onSubmit: (data: CategoryUploadFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: CategoryUploadFormData;
}

export interface CategoryUploadFormData {
  name: string;
  description: string;
  isActive: boolean;
}

export default function CategoryUploadForm({ onSubmit, onCancel, isLoading, initialData }: CategoryUploadFormProps) {
  const [formData, setFormData] = useState<CategoryUploadFormData>(
    initialData || {
      name: '',
      description: '',
      isActive: true,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

      <div className="p-6 space-y-6">
        {/* Category Name */}
        <div className='flex gap-2 items-center'>
        <div className='w-1/2'>
          <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Category Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600/20 outline-none transition-all ${
              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
            }`}
            placeholder="Enter category name"
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
        </div>
         {/* Status Toggle */}
        <div className='mt-auto border h-full p-2 py-1 rounded-md border-gray-300'>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="sr-only peer"
                disabled={isLoading}
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-600/20 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">Active Category</span>
              <p className="text-xs text-gray-500">Category will be visible on the site</p>
            </div>
          </label>
        </div>

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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600/20 outline-none transition-all resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300 focus:border-green-600'
            }`}
            placeholder="Enter category description"
            disabled={isLoading}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600 font-medium">{errors.description}</p>}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
          <SubmitButton 
            isLoading={isLoading} 
            label={initialData ? 'Update Category' : 'Create Category'} 
            loadingLabel={initialData ? 'Updating...' : 'Creating...'} 
            icon="stash:list-add-duotone"
          />
        </div>
      </div>
    </form>
  );
}
