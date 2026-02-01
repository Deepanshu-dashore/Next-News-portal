'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import FormHeader from './FormHeader';
import AdminHeader from './AdminHeader';
import { useCategories } from '@/src/hooks/useCategories';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCreateArticle, CreateArticleData } from '@/src/hooks/useArticles';

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string | File | null;
  featuredImagePreview: string; // For preview display
  tags: string[];
  status: 'draft' | 'published';
  publishDate: string;
  region: 'India' | 'World' | 'Custom'|string;
  customRegion: string;
  isBreaking: boolean;
}

interface ArticleFormProps {
  initialData?: Omit<ArticleFormData, 'tags' | 'region' | 'customRegion' | 'isBreaking'> & {
    tags?: string[] | string;
    id?: string;
    region?: string;
    customRegion?: string;
    isBreaking?: boolean;
  };
  isEditing?: boolean;
}

export function ArticleForm({ initialData, isEditing = false }: ArticleFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');
  const { user } = useAuth();
  const createArticle = useCreateArticle();
  const { data: categoriesData = [], isLoading: isLoadingCategories } = useCategories();
  
  // Handle categories data properly - it might be an object or array
  const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);

  const normalizeRegion = (region?: string, customRegion?: string) => {
    if (!region) {
      return { region: 'India' as const, customRegion: '' };
    }
    if (region === 'India' || region === 'World' || region === 'Custom') {
      return { region, customRegion: region === 'Custom' ? (customRegion || '') : '' };
    }
    return { region: 'Custom' as const, customRegion: region };
  };
  
  const [formData, setFormData] = useState<ArticleFormData>(
    initialData ? {
      ...initialData,
      featuredImage: null,
      featuredImagePreview: typeof initialData.featuredImage === 'string' ? (initialData.featuredImage || '') : '',
      tags: typeof initialData.tags === 'string' ? [] : (initialData.tags || []),
      author: user?.name || initialData.author || '',
      ...normalizeRegion((initialData as any).region, (initialData as any).customRegion),
      isBreaking: (initialData as any).isBreaking ?? false,
    } : {
      title: '',
      slug: '',
      excerpt: '',
      description: '',
      content: '',
      category: '',
      author: user?.name || '',
      featuredImage: null,
      featuredImagePreview: '',
      tags: [],
      status: 'draft',
      publishDate: new Date().toISOString().split('T')[0],
      region: 'India',
      customRegion: '',
      isBreaking: false,
    }
  );

  const [tagInput, setTagInput] = useState('');
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
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description/Summary is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    try {
      // Store the actual file object
      setFormData(prev => ({
        ...prev,
        featuredImage: file,
      }));
      
      // Create preview for display
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          featuredImagePreview: event.target?.result as string,
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
      const resolvedRegion = formData.region === 'Custom'
        ? formData.customRegion.trim()
        : formData.region;

      // Transform form data to match CreateArticleData interface
      const createData: CreateArticleData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        description: formData.description,
        content: formData.content,
        categoryId: formData.category,
        authorId: user?.id,
        status: formData.status,
        tags: formData.tags,
        featuredImage: formData.featuredImage || undefined,
        region: resolvedRegion,
        isBreaking: formData.isBreaking,
      };
      await createArticle.mutateAsync(createData);
      router.push('/dashboard/articles');
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

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const key = name as keyof ArticleFormData;
    setFormData(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ArticleFormData['region'];
    setFormData(prev => ({
      ...prev,
      region: value,
      customRegion: value === 'Custom' ? prev.customRegion : '',
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Section */}
     
        <AdminHeader
          title={isEditing ? 'Edit Article' : 'Create New Article'}
          description={isEditing ? 'Update and manage your article' : 'Write and publish a new article to your site'}
          back='Back'
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
            <label className="block text-sm font-bold text-gray-900 mb-3">Article Excerpt *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief excerpt of the article..."
              rows={2}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-none ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.excerpt && <p className="text-red-600 text-xs mt-2">{errors.excerpt}</p>}
            <p className="text-xs text-gray-500 mt-2">{formData.excerpt.length}/150 characters</p>
          </div>

          {/* Description/Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Article Description/Summary *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed summary of the article..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-600 text-xs mt-2">{errors.description}</p>}
            <p className="text-xs text-gray-500 mt-2">{formData.description.length}/400 characters</p>
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
              {formData.featuredImagePreview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={formData.featuredImagePreview}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      featuredImage: null,
                      featuredImagePreview: ''
                    }))}
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
              disabled={isLoadingCategories}
            >
              <option value="">Select a category</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleRegionChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            >
              <option value="India">India</option>
              <option value="World">World</option>
              <option value="Custom">Custom</option>
            </select>
            {formData.region === 'Custom' && (
              <input
                type="text"
                name="customRegion"
                value={formData.customRegion}
                onChange={handleInputChange}
                placeholder="Enter custom region"
                className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
            )}
          </div>

          {/* Author */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">Author is automatically set to your name</p>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Type a tag and press Enter"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
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
                      className="hover:text-red-600 transition cursor-pointer"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
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

          {/* Breaking News Toggle */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-bold text-gray-900 mb-3">Breaking News</label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isBreaking"
                  checked={formData.isBreaking}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-red-600 transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Enable breaking tag</span>
                <p className="text-xs text-gray-500">Show this article in breaking news</p>
              </div>
            </label>
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
