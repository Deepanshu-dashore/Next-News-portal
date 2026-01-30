'use client';

import { useState } from 'react';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { Container } from '@/components/ui/Container';
import { DataTable, Column } from '@/src/components/dashboard/DataTable';
import VideoForm, { VideoFormData } from '@/src/components/dashboard/VideoForm';
import { useVideos, useCreateVideo, useUpdateVideo, useDeleteVideo } from '@/src/hooks/useVideos';
import { CreateVideoData, Video } from '@/src/lib/api/video.api';

export default function VideosManagementPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Video | null>(null);

  const { data: videos, isLoading } = useVideos();
  const createMutation = useCreateVideo();
  const updateMutation = useUpdateVideo();
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
      key: 'views',
      label: 'Views',
      sortable: true,
      render: (video) => (
        <span className="font-semibold text-gray-700">{video.views?.length.toLocaleString() || 0}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (video) => (
        <span className="text-sm text-gray-600">
          {new Date(video.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const handleSubmit = async (data: VideoFormData) => {
    try {
      const submitData: CreateVideoData = {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        CategoryId: data.CategoryId,
        tags: data.tags,
        durationSeconds: data.durationSeconds,
        status: data.status,
        slug: data.title.toLowerCase().replace(/\s+/g, '-'),
        uploadedBy: editingVideo?.uploadedBy?._id || '',
      };
      if (editingVideo) {
        await updateMutation.mutateAsync({ id: editingVideo._id, data: submitData });
      } else {
        await createMutation.mutateAsync(submitData);
      }
      setShowForm(false);
      setEditingVideo(null);
    } catch (error) {
      console.error('Error submitting video:', error);
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setShowForm(true);
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

  const handleCancel = () => {
    setShowForm(false);
    setEditingVideo(null);
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <Container>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                Video Management
              </h1>
              <p className="text-gray-600 mt-2">Manage all your video content</p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all uppercase tracking-wide cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Video
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {!showForm && (
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
                    {videos?.data?.reduce((sum: number, v: Video) => sum + (v.views.length || 0), 0).toLocaleString() || 0}
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
        )}

        {/* Form or Table */}
        {showForm ? (
          <VideoForm
            video={editingVideo ? {
              title: editingVideo.title,
              slug: editingVideo.slug,
              description: editingVideo.description,
              CategoryId: typeof editingVideo.CategoryId === 'string' ? editingVideo.CategoryId : editingVideo.CategoryId._id,
              videoUrl: editingVideo.videoUrl,
              durationSeconds: editingVideo.durationSeconds,
              status: editingVideo.status,
              uploadedBy: typeof editingVideo.uploadedBy === 'string' ? editingVideo.uploadedBy : editingVideo.uploadedBy._id,
              tags: editingVideo.tags,
            } as CreateVideoData : null}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        ) : (
          <DataTable
            data={videos?.data || []}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemKey="_id"
            emptyMessage="No videos found. Click 'Add New Video' to create one."
            isLoading={isLoading}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Confirm Delete</h3>
                  <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <span className="font-bold">"{deleteConfirm.title}"</span>?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  disabled={deleteMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </ProtectedRoute>
  );
}
