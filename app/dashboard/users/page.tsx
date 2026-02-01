'use client';

import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { useUsers } from '@/src/hooks/useUsers';
import Link from 'next/link';
import { useState } from 'react';
import { DataTable, Column } from '@/src/components/dashboard/DataTable';

export default function UsersPage() {
  const router = useRouter();
  const { users, isLoading, deleteUser, isDeleting, toggleUserStatus } = useUsers();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const handleEdit = (user: any) => {
    router.push(`/dashboard/users/edit/${user._id}`);
  };

  const handleDelete = (user: any) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteUser(user._id, {
        onSuccess: () => {
          setSelectedUser(null);
        },
        onError: (error: any) => {
          console.error('Failed to delete user:', error);
        },
      });
    }
  };

  const handleToggleStatus = (user: any) => {
    toggleUserStatus(user._id, {
      onError: (error: any) => {
        console.error('Failed to toggle user status:', error);
      },
    });
  };

  // Filter users based on status
  const filteredUsers = users.filter((user: any) => {
    if (filterStatus === 'active') return user.isActive;
    if (filterStatus === 'inactive') return !user.isActive;
    return true;
  });

  // Count users by role
  const roleStats = {
    total: users.length,
    admin: users.filter((u: any) => u.role === 'admin').length,
    author: users.filter((u: any) => u.role === 'author').length,
    editor: users.filter((u: any) => u.role === 'editor').length,
    reader: users.filter((u: any) => u.role === 'reader').length,
    active: users.filter((u: any) => u.isActive).length,
    inactive: users.filter((u: any) => !u.isActive).length,
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'author':
        return 'bg-blue-100 text-blue-800';
      case 'editor':
        return 'bg-purple-100 text-purple-800';
      case 'reader':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const columns: Column<any>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {item.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (item: any) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(item.role)}`}>
          {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
        </span>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (item: any) => (
        <button
          onClick={() => handleToggleStatus(item)}
          disabled={isDeleting}
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
            item.isActive
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {item.isActive ? 'Active' : 'Inactive'}
        </button>
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (item: any) => (
        <span className="text-gray-600 text-sm">{formatDate(item.createdAt)}</span>
      ),
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['editor', 'admin']}>
      <div className="space-y-8">
        <AdminHeader
          title="Users"
          description="Manage team members, roles, and permissions"
          add={
            <Link
              href="/dashboard/users/new"
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all uppercase tracking-wide cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </Link>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{roleStats.total}</p>
            <p className="text-green-600 text-xs font-semibold mt-2">+2 this week</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Active Users</p>
            <p className="text-3xl font-bold text-gray-900">{roleStats.active}</p>
            <p className="text-green-600 text-xs font-semibold mt-2">{roleStats.total > 0 ? Math.round((roleStats.active / roleStats.total) * 100) : 0}% active</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Admins</p>
            <p className="text-3xl font-bold text-gray-900">{roleStats.admin}</p>
            <p className="text-gray-600 text-xs font-semibold mt-2">Super users</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Authors</p>
            <p className="text-3xl font-bold text-gray-900">{roleStats.author}</p>
            <p className="text-gray-600 text-xs font-semibold mt-2">Content creators</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-3 bg-white rounded-lg shadow p-4">
          <span className="text-gray-700 font-semibold">Filter by Status:</span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              filterStatus === 'all'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Users ({users.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              filterStatus === 'active'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active ({roleStats.active})
          </button>
          <button
            onClick={() => setFilterStatus('inactive')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              filterStatus === 'inactive'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inactive ({roleStats.inactive})
          </button>
        </div>

        {/* Users DataTable */}
        <DataTable
          data={filteredUsers}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          itemKey="_id"
          emptyMessage="No users found. Click 'Add User' to create one."
          isLoading={isLoading}
        />
      </div>
    </ProtectedRoute>
  );
}
