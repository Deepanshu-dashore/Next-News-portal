'use client';

import { CreateVideoData } from '@/src/lib/api/video.api';
import { useState, useEffect } from 'react';
import FormHeader from './FormHeader';

interface VideoFormProps {
  video?: CreateVideoData | null;
  onSubmit: (data: VideoFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  CategoryId: string;
  tags: string[];
  durationSeconds?: number;
  status: 'draft' | 'published' | 'archived' | undefined;
}

export default function VideoForm({ video, onSubmit, onCancel, isLoading }: VideoFormProps) {
  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    videoUrl: '',
    CategoryId: '',
    tags: [],
    durationSeconds: 0,
    status: 'draft',
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        CategoryId: video.CategoryId || '',
        tags: video.tags || [],
        durationSeconds: video.durationSeconds,
        status: video.status,
      });
    }
  }, [video]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.videoUrl.trim()) {
      newErrors.videoUrl = 'Video URL is required';
    } else if (!formData.videoUrl.includes('youtube.com') && !formData.videoUrl.includes('youtu.be')) {
      newErrors.videoUrl = 'Please enter a valid YouTube URL';
    }

    if (!formData.CategoryId) {
      newErrors.CategoryId = 'Category is required';
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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
      {/* Form Header */}
      <FormHeader
        title={video ? 'Edit Video' : 'Add New Video'}
        description={video ? 'Update video information' : 'Fill in the details to add a new video'}
        colorScheme="red"
      />

      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
              errors.title ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
            }`}
            placeholder="Enter video title"
            disabled={isLoading}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600 font-medium">{errors.title}</p>}
        </div>

        {/* Video URL */}
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            YouTube Video URL <span className="text-red-600">*</span>
          </label>
          <input
            type="url"
            id="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
              errors.videoUrl ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
            }`}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={isLoading}
          />
          {errors.videoUrl && <p className="mt-1 text-sm text-red-600 font-medium">{errors.videoUrl}</p>}
          <p className="mt-2 text-xs text-gray-500">Paste the full YouTube video URL</p>
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
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
            }`}
            placeholder="Enter video description"
            disabled={isLoading}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600 font-medium">{errors.description}</p>}
        </div>

        {/* Grid Layout for smaller fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="CategoryId" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              id="CategoryId"
              value={formData.CategoryId}
              onChange={(e) => setFormData({ ...formData, CategoryId: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
                errors.CategoryId ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
              }`}
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              <option value="tech">Technology</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="business">Business</option>
            </select>
            {errors.CategoryId && <p className="mt-1 text-sm text-red-600 font-medium">{errors.CategoryId}</p>}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Duration (seconds)
            </label>
            <input
              type="number"
              id="duration"
              value={formData.durationSeconds || ''}
              onChange={(e) => setFormData({ ...formData, durationSeconds: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
              placeholder="300"
              min="0"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
              placeholder="Type a tag and press Enter"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              disabled={isLoading}
            >
              Add
            </button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-900 cursor-pointer"
                    disabled={isLoading}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Status <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-4">
            {(['draft', 'published', 'archived'] as const).map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-4 h-4 text-red-600 focus:ring-red-600"
                  disabled={isLoading}
                />
                <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2"
          disabled={isLoading}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-linear-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : video ? (
            'Update Video'
          ) : (
            'Create Video'
          )}
        </button>
      </div>
    </form>
  );
}
