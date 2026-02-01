'use client';

import { UserProfile } from '@/src/hooks/useUserProfile';
import { useState } from 'react';

interface UserProfileViewProps {
  profile: UserProfile;
  onEdit: () => void;
}

export default function UserProfileView({ profile, onEdit }: UserProfileViewProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-linear-to-r from-red-600 to-red-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-32 bg-linear-to-r from-red-600 to-red-700" />
        <div className="px-6 pb-6 -mt-16 relative z-10">
          <div className="flex items-end gap-4">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                getInitials(profile.name)
              )}
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
              <p className="text-red-100 text-sm mt-1">{profile.email}</p>
            </div>
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Role */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-600">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Role</p>
          <p className="text-xl font-bold text-gray-900 mt-1 capitalize">{profile.role}</p>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Status</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-3 h-3 rounded-full ${profile.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
            />
            <p className="text-lg font-bold text-gray-900">{profile.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>

        {/* Joined Date */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Joined</p>
          <p className="text-lg font-bold text-gray-900 mt-1">
            {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '-'}
          </p>
        </div>

        {/* Last Login */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-600">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Last Login</p>
          <p className="text-lg font-bold text-gray-900 mt-1">
            {profile.lastLogin ? new Date(profile.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
          </p>
        </div>
      </div>

      {/* Bio Card */}
      {profile.bio && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Bio</h2>
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </div>
      )}

      {/* Social Links */}
      {profile.socialLinks && Object.values(profile.socialLinks).some((link) => link) && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Social Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {profile.socialLinks.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Twitter</span>
              </a>
            )}
            {profile.socialLinks.facebook && (
              <a
                href={profile.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Facebook</span>
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">LinkedIn</span>
              </a>
            )}
            {profile.socialLinks.instagram && (
              <a
                href={profile.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors"
              >
                <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16.5 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0M12 9.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" fill="white" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Instagram</span>
              </a>
            )}
            {profile.socialLinks.website && (
              <a
                href={profile.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Website</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
