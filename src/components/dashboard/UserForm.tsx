'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormHeader from './FormHeader';
import { UserFormData } from '@/src/hooks/useUsers';
import SubmitButton from './SubmitButton';
import AdminHeader from './AdminHeader';

interface UserFormProps {
  initialData?: UserFormData & { id?: string };
  isEditing?: boolean;
  onSubmit?: (data: UserFormData) => Promise<void>;
}

export function UserForm({ initialData, isEditing = false, onSubmit }: UserFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const [formData, setFormData] = useState<UserFormData>(
    initialData || {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'author',
      isActive: true,
      bio: '',
    }
  );

  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!isEditing) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (formData.password) {
      // If editing and password is provided, validate it
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
        setSuccessMessage(isEditing ? 'User updated successfully!' : 'User created successfully!');
        setTimeout(() => {
          router.push('/dashboard/users');
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrors({ name: error.response?.data?.message || 'Failed to save user' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">

      <div className="p-6 space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-green-100 border border-green-400 rounded-lg text-green-800 font-medium">
            {successMessage}
          </div>
        )}

        {/* General Error */}
        {errors.name && !errors.name.includes('is required') && (
          <div className="p-4 bg-red-100 border border-red-400 rounded-lg text-red-800 font-medium">
            {errors.name}
          </div>
        )}

        {/* Name, Email, Role, Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Smith"
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
              }`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., john@example.com"
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
              }`}
              disabled={isEditing}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1 font-medium">{errors.email}</p>}
            {isEditing && <p className="text-gray-500 text-xs mt-1">Cannot be changed</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Role <span className="text-red-600">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
            >
              <option value="author">Author</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-gray-500 text-xs mt-1">Permission level</p>
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Account Status
            </label>
            <div className="flex items-center gap-3 h-12">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleChange({ target: { name: 'isActive', type: 'checkbox', checked: e.target.checked } } as any)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-red-600 peer-focus:ring-4 peer-focus:ring-red-600/20 transition-all"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </label>
            </div>
            <p className="text-gray-500 text-xs mt-1">{formData.isActive ? 'Can login' : 'Suspended'}</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            placeholder="Write a brief bio or description"
            rows={3}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition resize-none"
          />
        </div>

        {/* Password Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
          <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">
            {isEditing ? 'Change Password (Optional)' : 'Password Configuration'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password {isEditing ? '' : <span className="text-red-600">*</span>}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isEditing ? 'Leave blank to keep current' : 'Min. 6 characters'}
                className={`w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
                }`}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1 font-medium">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password {isEditing ? '' : <span className="text-red-600">*</span>}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={`w-full px-4 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
                }`}
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1 font-medium">{errors.confirmPassword}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <SubmitButton 
          isLoading={isLoading} 
          label={isEditing ? 'Update User' : 'Create User'} 
          icon='duo-icons:user'
          loadingLabel="Saving..."
          // className="bg-red-600 hover:bg-red-700" 
        />
      </div>
    </form>
  );
}
