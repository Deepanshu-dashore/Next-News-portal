'use client';

import { UserProfile } from '@/src/hooks/useUserProfile';
import { useState } from 'react';

interface UserProfileViewProps {
  profile: UserProfile;
  onEdit: () => void;
}

 function UserProfileView({ profile, onEdit }: UserProfileViewProps) {
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
      {/* Header Card - Professional Profile Design */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Banner */}
        <div style={{backgroundImage:"url('/UserProfileBanner.png')"}} className="relative h-56 bg-cover bg-center flex items-center" />
        
        {/* Profile Content */}
        <div className="relative px-8 py-6">
          <div className="flex items-start gap-6">
            {/* Avatar - Positioned over banner */}
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg shrink-0 -mt-20">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                getInitials(profile.name)
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Verified
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{profile.email}</p>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <span className={`inline-block w-2 h-2 rounded-full ${profile.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className="capitalize font-medium">{profile.role}</span>
                <span className="text-gray-400">•</span>
                <span>{profile.isActive ? 'Active' : 'Offline'}</span>
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md shrink-0 mt-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-8 mt-8 pt-6 border-t border-gray-200">
            {/* Total Articles */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{profile.totalArticles || 0}</p>
                <p className="text-gray-500 text-xs font-medium">Articles</p>
              </div>
            </div>

            {/* Published Articles */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{profile.totalPublishedArticles || 0}</p>
                <p className="text-gray-500 text-xs font-medium">Published</p>
              </div>
            </div>

            {/* Total Videos */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{profile.totalVideos || 0}</p>
                <p className="text-gray-500 text-xs font-medium">Videos</p>
              </div>
            </div>

            {/* Last Login */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {profile.lastLogin ? new Date(profile.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Never'}
                </p>
                <p className="text-gray-500 text-xs font-medium">Last Login</p>
              </div>
            </div>

            <div className="flex-1"></div>
          </div>
        </div>
      </div>

      {/* Bio & Social Links - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bio Section */}
        {profile.bio && (
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Social Links - One Row */}
        {profile.socialLinks && (
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${!profile.bio ? 'lg:col-span-3' : ''}`}>
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Connect
            </h2>
            <div className="flex flex-wrap gap-4">
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-sm"
                  title="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  </svg>
                  <span>Twitter</span>
                </a>
              )}
              {profile.socialLinks.facebook && (
                <a
                  href={profile.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-sm"
                  title="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-sm"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.socialLinks.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium text-sm"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16.5 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0M12 9.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" fill="white" />
                  </svg>
                  <span>Instagram</span>
                </a>
              )}
              {profile.socialLinks.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium text-sm"
                  title="Website"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileView;
