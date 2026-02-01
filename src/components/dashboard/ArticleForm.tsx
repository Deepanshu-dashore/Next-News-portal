'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormHeader from './FormHeader';
import AdminHeader from './AdminHeader';

interface ArticleFormData {
  title: string;
  slug: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  tags: string;
  description: string;
  status: 'draft' | 'published';
  publishDate: string;
}

interface ArticleFormProps {
  initialData?: ArticleFormData & { id?: string };
  isEditing?: boolean;
}

export function ArticleForm({ initialData, isEditing = false }: ArticleFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');
  
  const [formData, setFormData] = useState<ArticleFormData>(
    initialData || {
      title: '',
      slug: '',
      content: '',
      category: 'technology',
      author: '',
      featuredImage: '',
      tags: '',
      description: '',
      status: 'draft',
      publishDate: new Date().toISOString().split('T')[0],
    }
  );

  const [errors, setErrors] = useState<Partial<ArticleFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    if (slug !== formData.slug) {
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ArticleFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    try {
      // Simulate file upload - in production, upload to server
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          featuredImage: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Submitting article:', formData);
      // Simulate success
      setTimeout(() => {
        router.push('/dashboard/articles');
      }, 500);
    } catch (error) {
      console.error('Error submitting article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof ArticleFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Section */}
     
        <AdminHeader
          title={isEditing ? 'Edit Article' : 'Create New Article'}
          description={isEditing ? 'Update and manage your article' : 'Write and publish a new article to your site'}
          add={<button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>}
        />

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Article Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter article title..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-600 text-xs mt-2">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Article Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the article..."
              rows={2}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-600 text-xs mt-2">{errors.description}</p>}
            <p className="text-xs text-gray-500 mt-2">{formData.description.length}/200 characters</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Article Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your article content here... Supports markdown formatting"
              rows={16}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition font-mono text-sm resize-none ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.content && <p className="text-red-600 text-xs mt-2">{errors.content}</p>}
            <p className="text-xs text-gray-500 mt-2">{formData.content.length} characters</p>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Featured Image</label>
            <div className="space-y-4">
              {formData.featuredImage && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm text-gray-600 font-semibold">
                  {isImageUploading ? 'Uploading...' : 'Click to upload featured image'}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isImageUploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            >
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
            </select>
          </div>

          {/* Author */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Author name"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.author && <p className="text-red-600 text-xs mt-2">{errors.author}</p>}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Comma separated tags"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">Separate tags with commas</p>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Publish Date */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : isEditing ? 'Update Article' : 'Publish Article'}
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 text-sm mb-2">Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Use clear, descriptive titles</li>
              <li>✓ Add relevant tags</li>
              <li>✓ Choose appropriate category</li>
              <li>✓ Preview before publishing</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ArticleForm;
