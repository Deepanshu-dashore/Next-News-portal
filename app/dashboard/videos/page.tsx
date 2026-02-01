'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { Container } from '@/components/ui/Container';
import { DataTable, Column } from '@/src/components/dashboard/DataTable';
import { useVideos, useDeleteVideo } from '@/src/hooks/useVideos';
import { Video } from '@/src/lib/api/video.api';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { DeleteConfirmationModal } from '@/src/components/dashboard/DeleteConfirmationModal';
import { useRouter } from 'next/navigation';

export default function VideosManagementPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<Video | null>(null);
  const router = useRouter();

  const { data: videos, isLoading } = useVideos();
  const deleteMutation = useDeleteVideo();

  const columns: Column<Video>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (video) => (
        <div className="max-w-md">
          <p className="font-bold text-gray-900 truncate">{video.title}</p>
          <p className="text-xs text-gray-500 truncate">{video.description}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (video) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase ${
            video.status === 'published'
              ? 'bg-green-100 text-green-800'
              : video.status === 'draft'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {video.status}
        </span>
      ),
    },
    {
      key: 'durationSeconds',
      label: 'Duration',
      render: (video) => {
        const minutes = Math.floor((video.durationSeconds || 0) / 60);
        const seconds = (video.durationSeconds || 0) % 60;
        return <span className="font-mono text-sm">{`${minutes}:${seconds.toString().padStart(2, '0')}`}</span>;
      },
    },
    {
      key: 'publishedAt',
      label: 'Published At',
      sortable: true,
      render: (video) => (
        <span className="text-sm text-gray-600">
          {video.publishedAt ? new Date(video.publishedAt).toLocaleDateString() : 'Not Available'}
        </span>
      ),
    },
  ];



  const handleEdit = (video: Video) => {
    router.push(`/dashboard/videos/edit/${video.slug}`);
  };

  const handleDelete = async (video: Video) => {
    setDeleteConfirm(video);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      try {
        await deleteMutation.mutateAsync(deleteConfirm._id);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <div>
        {/* Page Header */}
        <AdminHeader title='Video Management' description='Manage all your video content' add={
           <button
              onClick={() => router.push('/dashboard/videos/upload')  }
              className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-emerald-600 to-emerald-800 text-white font-semibold text-sm rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all capitalize tracking-wide cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5.25 4A3.25 3.25 0 0 0 2 7.25v5.56a6.5 6.5 0 0 1 1.5-1.078V7.25c0-.966.784-1.75 1.75-1.75h7.5c.966 0 1.75.784 1.75 1.75v7.5a1.75 1.75 0 0 1-1.578 1.742a6.6 6.6 0 0 1 .06 1.5A3.25 3.25 0 0 0 16 14.75v-.312l3.258 2.25c1.16.8 2.744-.03 2.744-1.44V6.751c0-1.41-1.584-2.242-2.744-1.44L16 7.562V7.25A3.25 3.25 0 0 0 12.75 4zM16 9.384l4.11-2.838a.25.25 0 0 1 .392.206v8.495a.25.25 0 0 1-.392.206L16 12.615zM12 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0M7 18l.001 2.503a.5.5 0 1 1-1 0V18H3.496a.5.5 0 0 1 0-1H6v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1z" strokeWidth={0.5} stroke="currentColor"></path>
                </svg>
              Add Video
            </button>
         } />

        {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase">Total Videos</p>
                  <p className="text-3xl font-black text-gray-900 mt-2">{videos?.data?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase">Published</p>
                  <p className="text-3xl font-black text-green-600 mt-2">
                    {videos?.data?.filter((v: Video) => v.status === 'published').length || 0}
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
                  <p className="text-sm font-bold text-gray-600 uppercase">Draft</p>
                  <p className="text-3xl font-black text-yellow-600 mt-2">
                    {videos?.data?.filter((v: Video) => v.status === 'draft').length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase">Total Views</p>
                  <p className="text-3xl font-black text-purple-600 mt-2">
                    {(videos?.data?.reduce((sum: number, v: Video) => sum + (v?.views?.length || 0), 0) || 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        {/* Form or Table */}
          <DataTable
            data={videos?.data || []}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemKey="_id"
            emptyMessage="No videos found. Click 'Add New Video' to create one."
            isLoading={isLoading}
          />
        

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={!!deleteConfirm}
          itemName={deleteConfirm?.title || ''}
          isLoading={deleteMutation.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      </div>
    </ProtectedRoute>
  );
}
