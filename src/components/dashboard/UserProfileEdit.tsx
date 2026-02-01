'use client';

import { useState } from 'react';
import { UserProfile, UpdateProfileData } from '@/src/hooks/useUserProfile';

interface UserProfileEditProps {
  profile: UserProfile;
  onSave: (data: UpdateProfileData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserProfileEdit({ profile, onSave, onCancel, isLoading = false }: UserProfileEditProps) {
  const [formData, setFormData] = useState<UpdateProfileData>({
    name: profile.name,
    bio: profile.bio || '',
    avatarUrl: profile.avatarUrl || '',
    socialLinks: profile.socialLinks || {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value || undefined,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-bold text-gray-900 mb-3">Full Name *</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
            errors.name ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
          }`}
          disabled={isLoading}
        />
        {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name}</p>}
      </div>

      {/* Bio */}
      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-bold text-gray-900 mb-3">Bio</label>
        <textarea
          value={formData.bio || ''}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition resize-none"
          placeholder="Tell us about yourself..."
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 mt-2">{(formData.bio || '').length}/500 characters</p>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
        <div className="space-y-4">
          {/* Twitter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter URL</label>
            <input
              type="url"
              value={formData.socialLinks?.twitter || ''}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              placeholder="https://twitter.com/username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook URL</label>
            <input
              type="url"
              value={formData.socialLinks?.facebook || ''}
              onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
              placeholder="https://facebook.com/username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
            <input
              type="url"
              value={formData.socialLinks?.linkedin || ''}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
            <input
              type="url"
              value={formData.socialLinks?.instagram || ''}
              onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
              placeholder="https://instagram.com/username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Website URL</label>
            <input
              type="url"
              value={formData.socialLinks?.website || ''}
              onChange={(e) => handleSocialLinkChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Read-Only Info */}
      <div className="grid grid-cols-2 gap-6">
        {/* Email */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-bold text-gray-900 mb-3">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
        </div>

        {/* Role */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-bold text-gray-900 mb-3">Role</label>
          <input
            type="text"
            value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            disabled
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-2">Role is managed by administrators</p>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all uppercase tracking-wide disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
