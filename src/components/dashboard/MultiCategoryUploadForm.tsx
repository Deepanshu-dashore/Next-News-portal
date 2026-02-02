'use client';

import { useState } from 'react';
import FormHeader from './FormHeader';
import { toSlug } from '@/backend/utlis/slug.utlis';
import SubmitButton from './SubmitButton';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface MultiCategoryUploadFormProps {
  onSubmit: (categories: Omit<CategoryItem, 'id'>[]) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function MultiCategoryUploadForm({ onSubmit, onCancel, isLoading }: MultiCategoryUploadFormProps) {
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      isActive: true,
    },
  ]);

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        isActive: true,
      },
    ]);
  };

  const removeCategory = (id: string) => {
    if (categories.length > 1) {
      setCategories(categories.filter((cat) => cat.id !== id));
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const updateCategory = (id: string, field: keyof CategoryItem, value: any) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === id) {
          return { ...cat, [field]: value };
        }
        return cat;
      })
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    categories.forEach((cat) => {
      const catErrors: Record<string, string> = {};

      if (!cat.name.trim()) {
        catErrors.name = 'Name is required';
        isValid = false;
      }

      // if (!cat.description.trim()) {
      //   catErrors.description = 'Description is required';
      //   isValid = false;
      // }

      if (Object.keys(catErrors).length > 0) {
        newErrors[cat.id] = catErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Remove the temporary id field and add auto-generated slugs
      await onSubmit(categories);
    } catch (error) { 
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">

      <div className="p-6 space-y-6">
        {/* Table Header */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 text-sm font-bold text-gray-700 uppercase">Category Name</div>
            <div className="col-span-6 text-sm font-bold text-gray-700 uppercase">Description</div>
            <div className="col-span-1 text-sm font-bold text-gray-700 uppercase text-center">Status</div>
            <div className="col-span-1 text-sm font-bold text-gray-700 uppercase text-center">Action</div>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                {/* Category Name */}
                <div className="col-span-4">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                    className={`w-full px-3 py-3 border rounded-lg outline-none transition-all text-sm ${
                      errors[category.id]?.name ? 'border-red-500' : 'border-gray-300 focus:border-red-300'
                    }`}
                    placeholder="Enter category name"
                    disabled={isLoading}
                  />
                  {errors[category.id]?.name && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors[category.id].name}</p>
                  )}
                </div>

                {/* Description */}
                <div className="col-span-6  ">
                  <input
                    type="text"
                    value={category.description}
                    onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                    className={`w-full px-3 py-3 border rounded-lg outline-none transition-all text-sm ${
                      errors[category.id]?.description
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-red-300'
                    }`}
                    placeholder="Enter description"
                    disabled={isLoading}
                  />
                  {errors[category.id]?.description && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors[category.id].description}</p>
                  )}
                </div>

                {/* Status Toggle */}
                <div className="col-span-1 my-auto flex justify-center items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={category.isActive}
                        onChange={(e) => updateCategory(category.id, 'isActive', e.target.checked)}
                        className="sr-only peer"
                        disabled={isLoading}
                      />
                      <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-emerald-500 peer-focus transition-all"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                    </div>
                  </label>
                </div>

                {/* Delete Button */}
                <div className="col-span-1 my-auto flex justify-center items-center">
                  <button
                    type="button"
                    onClick={() => removeCategory(category.id)}
                    disabled={categories.length === 1 || isLoading}
                    className="p-2 border disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-800 text-white bg-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Delete category"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add More Button */}
        <div className="mt-4 w-full flex justify-end items-center">
        <button
          type="button"
          onClick={addCategory}
          className="w-fit py-2 px-3.5 text-white bg-gray-800 font-semibold text-[14px] rounded-lg hover:bg-gray-600 cursor-pointer transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={isLoading}
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M7.345 4.017a42.3 42.3 0 0 1 9.31 0c1.713.192 3.095 1.541 3.296 3.26a40.7 40.7 0 0 1 0 9.446c-.201 1.719-1.583 3.068-3.296 3.26a42.3 42.3 0 0 1-9.31 0c-1.713-.192-3.095-1.541-3.296-3.26a40.7 40.7 0 0 1 0-9.445a3.734 3.734 0 0 1 3.295-3.26M12 7.007a.75.75 0 0 1 .75.75v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1 0-1.5h3.493V7.757a.75.75 0 0 1 .75-.75" clipRule="evenodd" strokeWidth={0.5} stroke="currentColor"></path>
          </svg>
          Add btn
        </button>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-bold text-blue-900 mb-1">Bulk Upload Summary</h4>
              <p className="text-xs text-blue-700">
                You are about to create <strong>{categories.length}</strong> categor
                {categories.length === 1 ? 'y' : 'ies'}. Slugs will be auto-generated from category names.
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
          <SubmitButton 
            isLoading={isLoading} 
            label="Submit btn" 
            loadingLabel="Creating..." 
            icon="stash:list-add-duotone"
          />
        </div>
      </div>
    </form>
  );
}