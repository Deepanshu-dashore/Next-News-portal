'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useUsers } from '@/src/hooks/useUsers';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { users, isLoading } = useUsers();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const foundUser = users.find((u: any) => u._id === id);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [users, id]);

  if (isLoading || !user) {
    return (
      <ProtectedRoute allowedRoles={['editor', 'admin']}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return formatDate(dateString);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'author':
        return 'bg-green-100 text-green-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'reader':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return 'mdi:shield-admin';
      case 'author':
        return 'mdi:pencil-box';
      case 'editor':
        return 'mdi:pencil';
      case 'reader':
        return 'mdi:book-open';
      default:
        return 'mdi:account';
    }
  };

  const socialIcons: { [key: string]: string } = {
    twitter: 'mdi:twitter',
    facebook: 'mdi:facebook',
    linkedin: 'mdi:linkedin',
    instagram: 'mdi:instagram',
    website: 'mdi:web',
  };

  const socialColors: { [key: string]: string } = {
    twitter: 'text-blue-400 hover:bg-blue-50',
    facebook: 'text-blue-600 hover:bg-blue-50',
    linkedin: 'text-blue-700 hover:bg-blue-50',
    instagram: 'text-pink-500 hover:bg-pink-50',
    website: 'text-gray-700 hover:bg-gray-100',
  };

  return (
    <ProtectedRoute allowedRoles={['editor', 'admin']}>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/dashboard" className="hover:text-red-600 transition font-medium">Author Dashboard</Link>
              <span className="text-gray-400">/</span>
              <Link href="/dashboard/users" className="hover:text-red-600 transition font-medium">Users</Link>
              <span className="text-gray-400">•</span>
              <span className="text-gray-900 font-medium">{user.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Profile Header Card */}
          <div className="bg-linear-to-r from-teal-600 via-teal-700 to-slate-800 rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Gradient Background */}
            <div className="relative h-48 bg-linear-to-br from-teal-400 via-teal-500 to-slate-700">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 right-8 text-teal-200 opacity-50">
                  <Icon icon="mdi:wave" width="120" height="120" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-8 pt-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 -mt-20 mb-6">
                {/* Left: Avatar & Basic Info */}
                <div className="flex items-end gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white">
                        <span className="text-6xl font-bold">{user.name?.[0]?.toUpperCase()}</span>
                      </div>
                    )}
                    {/* Edit Icon Overlay */}
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition cursor-pointer">
                      <Icon icon="mdi:pencil" width="20" height="20" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                      {user.isActive && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          <Icon icon="mdi:check-circle" width="14" height="14" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-teal-100 text-sm mb-3">Last seen {getTimeAgo(user.lastLogin)}</p>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${getRoleColor(user.role)}`}>
                      <Icon icon={getRoleIcon(user.role)} width="16" height="16" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Right: Edit Button */}
                <Link
                  href={`/dashboard/users/edit/${user._id}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md whitespace-nowrap"
                >
                  <Icon icon="mdi:pencil" width="18" height="18" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Stats & Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Stats */}
            <div className="md:col-span-1">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Stats</h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                    <p className="text-sm text-gray-600 font-medium">Posts</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">5,642</p>
                    <p className="text-sm text-gray-600 font-medium">Followers</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">1,233</p>
                    <p className="text-sm text-gray-600 font-medium">Following</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
                {user.socialLinks && Object.keys(user.socialLinks).some((key) => user.socialLinks[key]) ? (
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(user.socialLinks).map(([platform, url]: [string, any]) => (
                      url && (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${socialColors[platform] || 'text-gray-700 hover:bg-gray-100'}`}
                          title={platform}
                        >
                          <Icon icon={socialIcons[platform]} width="20" height="20" />
                        </a>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No social links added</p>
                )}
              </div>
            </div>

            {/* Right Column: About & Details */}
            <div className="md:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Icon icon="mdi:information" width="20" height="20" />
                  About
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {user.bio || `${user.name} is a ${user.role} on the platform. They joined in ${formatDate(user.createdAt)}.`}
                </p>
              </div>

              {/* Contact & Details */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Icon icon="mdi:phone-outline" width="20" height="20" />
                  Contact & Details
                </h2>
                <div className="space-y-5">
                  {/* Email */}
                  <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                    <div className="text-red-600 mt-1">
                      <Icon icon="mdi:email-outline" width="20" height="20" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Email</p>
                      <a href={`mailto:${user.email}`} className="text-gray-900 font-medium hover:text-red-600 transition break-all">
                        {user.email}
                      </a>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                    <div className="text-blue-600 mt-1">
                      <Icon icon={getRoleIcon(user.role)} width="20" height="20" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Role</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                    <div className={user.isActive ? 'text-green-600' : 'text-red-600'} style={{ marginTop: '4px' }}>
                      <Icon icon={user.isActive ? 'mdi:check-circle' : 'mdi:close-circle'} width="20" height="20" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-start gap-4">
                    <div className="text-purple-600 mt-1">
                      <Icon icon="mdi:calendar-outline" width="20" height="20" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Member Since</p>
                      <p className="text-gray-900 font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
