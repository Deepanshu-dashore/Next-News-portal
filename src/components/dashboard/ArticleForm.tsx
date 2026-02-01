'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import FormHeader from './FormHeader';
import AdminHeader from './AdminHeader';
import { useCategories } from '@/src/hooks/useCategories';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCreateArticle, useUpdateArticle, CreateArticleData } from '@/src/hooks/useArticles';

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
  articleId?: string;
}

export function ArticleForm({ initialData, isEditing = false, articleId }: ArticleFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
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
  const contentEditorRef = useRef<HTMLDivElement>(null);

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

  // Sync contentEditable with formData only if content was changed from outside
  useEffect(() => {
    if (contentEditorRef.current) {
      if (contentEditorRef.current.innerHTML !== formData.content) {
        contentEditorRef.current.innerHTML = formData.content || "";
      }
    }
  }, [formData.content]); // Re-run if content changes

  // Set default paragraph separator on mount
  useEffect(() => {
    if (contentEditorRef.current) {
      document.execCommand("defaultParagraphSeparator", false, "p");
    }
  }, []);

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
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading(isEditing ? 'Updating article...' : 'Creating article...');
    
    try {
      const resolvedRegion = formData.region === 'Custom'
        ? formData.customRegion.trim()
        : formData.region;

      // Transform form data to match CreateArticleData interface
      const articleData: CreateArticleData = {
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

      if (isEditing && articleId) {
        // Update existing article
        await updateArticle.mutateAsync({ id: articleId, data: articleData });
        toast.success('Article updated successfully!', { id: loadingToast });
      } else {
        // Create new article
        await createArticle.mutateAsync(articleData);
        toast.success('Article created successfully!', { id: loadingToast });
      }
      
      router.push('/dashboard/articles');
    } catch (error: any) {
      console.error('Error submitting article:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong';
      toast.error(isEditing ? `Failed to update article: ${errorMessage}` : `Failed to create article: ${errorMessage}`, { 
        id: loadingToast 
      });
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
            <div className="space-y-0">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-t-lg bg-gray-50 sticky top-0 z-20">
                {["bold", "italic", "underline"].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand(cmd, false, "");
                    }}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 capitalize font-medium"
                    title={cmd}
                  >
                    {cmd === "bold" ? (
                      <strong>B</strong>
                    ) : cmd === "italic" ? (
                      <em>I</em>
                    ) : (
                      <u>U</u>
                    )}
                  </button>
                ))}
                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                {/* Headings & Paragraph */}
                <div className="flex items-center gap-1">
                  {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        document.execCommand("formatBlock", false, tag);
                      }}
                      className="px-2 h-8 flex items-center justify-center text-xs font-bold border border-transparent rounded hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all text-gray-600 uppercase"
                      title={`Heading ${tag.replace("h", "")}`}
                    >
                      {tag}
                    </button>
                  ))}

                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand("formatBlock", false, "p");
                    }}
                    className="px-2 h-8 flex items-center justify-center text-xs font-bold border border-transparent rounded hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all text-gray-600 uppercase"
                    title="Paragraph"
                  >
                    P
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand("formatBlock", false, "blockquote");
                    }}
                    className="px-2 h-8 flex items-center justify-center text-xs font-bold border border-transparent rounded hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all text-gray-600 uppercase"
                    title="Quote"
                  >
                    " "
                  </button>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (contentEditorRef.current) {
                      contentEditorRef.current.focus();
                      document.execCommand("insertUnorderedList", false, "");
                    }
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200"
                  title="Bullet List"
                >
                  • List
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (contentEditorRef.current) {
                      contentEditorRef.current.focus();
                      document.execCommand("insertOrderedList", false,  "");
                    }
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200"
                  title="Ordered List"
                >
                  1. List
                </button>
              </div>

              {/* Content Editable Area */}
              <div
                ref={contentEditorRef}
                contentEditable
                onInput={(e) => {
                  const html = (e.target as HTMLDivElement).innerHTML;
                  setFormData((prev) => ({ ...prev, content: html }));
                }}
                className="w-full min-h-[400px] border border-gray-300 rounded-b-lg p-6 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent prose max-w-none bg-white shadow-inner [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:bg-gray-50 [&_blockquote]:border-l-[4px] [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:pr-5 [&_blockquote]:py-5 [&_blockquote]:rounded-r [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h5]:text-base [&_h5]:font-bold [&_h6]:text-sm [&_h6]:font-bold [&_p]:my-4 [&_p]:leading-relaxed"
                style={{ whiteSpace: "pre-wrap" }}
                data-placeholder="Start typing your blog content here..."
                suppressContentEditableWarning
              />
              <input
                type="hidden"
                name="content"
                value={formData.content}
                required
              />
            </div>
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
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> (or
                      drag and drop)
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="featuredImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
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
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : isEditing ? 'Update Article' : 'Publish Article'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const previewData = {
                    ...formData,
                    featuredImage: formData.featuredImagePreview,
                  };
                  const encoded = encodeURIComponent(JSON.stringify(previewData));
                  window.open(`/preview?data=${encoded}`, '_blank');
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
            </div>
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
