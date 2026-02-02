'use client';

import { CreateVideoData } from '@/src/lib/api/video.api';
import { useState, useEffect } from 'react';
import FormHeader from './FormHeader';
import SubmitButton from './SubmitButton';

interface VideoUploadFormProps {
  onSubmit: (data: VideoUploadFormData) => Promise<void>;
  onCancel: () => void;
  onPreview?: (data: VideoUploadFormData) => void;
    showPreviewButton?: boolean;
  isLoading?: boolean;
  initialData?: VideoUploadFormData;
}

export interface VideoUploadFormData {
  title: string;
  description: string;
  videoUrl: string;
  CategoryId: string;
  tags: string[];
  durationSeconds?: number;
  status: 'draft' | 'published' | 'archived' | undefined;
  uploadedBy?: string;
}

export default function VideoUploadForm({ onSubmit, onCancel, onPreview, showPreviewButton = true, isLoading, initialData }: VideoUploadFormProps) {
  const [formData, setFormData] = useState<VideoUploadFormData>(
    initialData || {
      title: '',
      description: '',
      videoUrl: '',
      CategoryId: '',
      tags: [],
      durationSeconds: 0,
      status: 'draft',
    }
  );

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const result = await response.json();
        if (result.data) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

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

  const handlePreviewClick = () => {
    if (onPreview && validateForm()) {
      onPreview(formData);
    }
  };

  const isPreviewDisabled = (): boolean => {
    return !formData.title.trim() || 
           !formData.description.trim() || 
           !formData.videoUrl.trim() || 
           (!formData.videoUrl.includes('youtube.com') && !formData.videoUrl.includes('youtu.be')) ||
           !formData.CategoryId ||
           (isLoading ?? false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border  border-gray-200 overflow-hidden">

      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Video Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-2.5 border  rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
              errors.title ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
            }`}
            placeholder="Enter video title"
            disabled={isLoading}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600 font-medium">{errors.title}</p>}
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
            className={`w-full px-4 py-2.5 border  rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
            }`}
            placeholder="Enter video description"
            disabled={isLoading}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600 font-medium">{errors.description}</p>}
        </div>

        {/* Video URL */}
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
            YouTube URL <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className={`w-full px-4 py-2.5 border  rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
              errors.videoUrl ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
            }`}
            placeholder="https://youtube.com/embed/..."
            disabled={isLoading}
          />
          {errors.videoUrl && <p className="mt-1 text-sm text-red-600 font-medium">{errors.videoUrl}</p>}
        </div>

        {/* Category, Duration, Status in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              id="category"
              value={formData.CategoryId}
              onChange={(e) => setFormData({ ...formData, CategoryId: e.target.value })}
              className={`w-full px-4 py-3 border  rounded-lg focus:ring-2 focus:ring-red-600/20 outline-none transition-all ${
                errors.CategoryId ? 'border-red-500' : 'border-gray-300 focus:border-red-600'
              }`}
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
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
              onChange={(e) => setFormData({ ...formData, durationSeconds: e.target.value ? parseInt(e.target.value) : 0 })}
              className="w-full px-4 py-2.5 border   border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
              placeholder="Duration in seconds"
              disabled={isLoading}
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
              disabled={isLoading}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Tags</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="flex-1 px-4 py-2.5 border   border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all"
              placeholder="Enter tag and press Enter"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-5 py-2 pl-4 border   bg-red-500 text-sm border-red-500 text-white font-semibold hover:text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path fill="currentColor" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"></path>
                </g>
              </svg>
                Add
            </button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-900 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
          {onPreview && showPreviewButton && (
            <button
              type="button"
              onClick={handlePreviewClick}
              className="px-5 py-2 cursor-pointer text-sm border   border-blue-600 bg-blue-600 font-semibold rounded-lg hover:bg-blue-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isPreviewDisabled()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 16 16">
                <path fill="currentColor" d="M3 4.5a.5.5 0 0 1 .5-.5h9.001a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5zM4 5v1h8.001V5zm5.5 3a.5.5 0 0 0-.5.5v3.005a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V8.5a.5.5 0 0 0-.5-.5zm.5 3.005V9h2v2.005zM3 9a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 3 9m.5 1.5a.5.5 0 0 0 0 1h4a.5.5 0 1 0 0-1zm-2.502-6a2.5 2.5 0 0 1 2.5-2.5h9.005a2.5 2.5 0 0 1 2.5 2.5v7.002a2.5 2.5 0 0 1-2.5 2.5H3.498a2.5 2.5 0 0 1-2.5-2.5zm2.5-1.5a1.5 1.5 0 0 0-1.5 1.5v7.002a1.5 1.5 0 0 0 1.5 1.5h9.005a1.5 1.5 0 0 0 1.5-1.5V4.5a1.5 1.5 0 0 0-1.5-1.5z"></path>
              </svg>
              Preview on Site
            </button>
          )}
          <SubmitButton 
            isLoading={isLoading} 
            icon='streamline-plump:camera-video-solid'
            className='bg-red-600 py-1 hover:bg-red-500 h-10'
            label={initialData ? 'Update Video' : 'Upload Video'} 
            loadingLabel={initialData ? 'Updating...' : 'Uploading...'} 
          />
        </div>
      </div>
    </form>
  );
}
