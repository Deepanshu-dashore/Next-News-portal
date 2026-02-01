import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import apiClient from '@/src/lib/axios';

export interface ArticleData {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  categoryId: {
    _id: string;
    name: string;
    slug: string;
  };
  authorId?: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'draft' | 'published';
  tags?: string[];
  featuredImage?: string;
  views?: number;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
}

interface ArticlesResponse {
  data: ArticleData[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}

 export interface CreateArticleData {
  title: string;
  slug?: string;    
  excerpt?: string;
  description?: string;
  content: string;
  categoryId: string;
  authorId?: string;
  status?: 'draft' | 'published';
  tags?: string[];
  featuredImage?: string | File;
  publishedAt?: string;
  region?: string;
  isBreaking?: boolean;
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateArticleData) => {
      const formData = new FormData();
      
      // Append all fields to FormData
      formData.append('title', data.title);
      formData.append('slug', data.slug || '');
      formData.append('excerpt', data.excerpt || '');
      formData.append('summary', data.description || '');
      formData.append('content', data.content);
      formData.append('categoryId', data.categoryId);
      formData.append('authorId', data.authorId || '');
      formData.append('status', data.status || 'draft');
      formData.append('region', data.region || '');
      formData.append('isBreaking', String(data.isBreaking || false));
      
      // Append tags as JSON string or individual items
      if (data.tags && data.tags.length > 0) {
        formData.append('tags', JSON.stringify(data.tags));
      } else {
        formData.append('tags', JSON.stringify([]));
      }
      
      // Append featured image if it's a file
      if (data.featuredImage) {
        if (data.featuredImage instanceof File) {
          formData.append('heroImage', data.featuredImage);
        } else if (typeof data.featuredImage === 'string' && data.featuredImage.startsWith('data:')) {
          // Convert base64 to blob
          const arr = data.featuredImage.split(',');
          const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
          const bstr = atob(arr[1]);
          const n = bstr.length;
          const u8arr = new Uint8Array(n);
          for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
          }
          const blob = new Blob([u8arr], { type: mime });
          formData.append('heroImage', blob, 'featured-image.jpg');
        }
      }
      
      // Add publishedAt if provided
      if (data.publishedAt) {
        formData.append('publishedAt', data.publishedAt);
      }
      
      return apiClient.post('/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });
}

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await apiClient.get('/article');
      const data = response.data as ArticlesResponse;
      return data.data || [];
    },
  });
}

export function usePublishedArticles() {
  return useQuery({
    queryKey: ['articles', 'published'],
    queryFn: async () => {
      const response = await apiClient.get('/article/published');
      const data = response.data as ArticlesResponse;
      return data.data || [];
    },
  });
}

export function useArticleById(id: string) {
  return useQuery({
    queryKey: ['articles', id],
    queryFn: async () => {
      const response = await apiClient.get(`/article/${id}`);
      return response.data.data as ArticleData;
    },
    enabled: !!id,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ['articles', 'slug', slug],
    queryFn: async () => {
      const response = await apiClient.get(`/article/slug/${slug}`);
      return response.data.data as ArticleData;
    },
    enabled: !!slug,
  });
}

export function useArticlesByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['articles', 'category', categoryId],
    queryFn: async () => {
      const response = await apiClient.get(`/article/category/${categoryId}`);
      const data = response.data as ArticlesResponse;
      return data.data || [];
    },
    enabled: !!categoryId,
  });
}

export function useFeaturedArticles() {
  return useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: async () => {
      const response = await apiClient.get('/article/featured');
      const data = response.data as ArticlesResponse;
      return data.data || [];
    },
  });
}

export function useSearchArticles(query: string) {
  return useQuery({
    queryKey: ['articles', 'search', query],
    queryFn: async () => {
      const response = await apiClient.get(`/article/search?q=${encodeURIComponent(query)}`);
      const data = response.data as ArticlesResponse;
      return data.data || [];
    },
    enabled: query.length >= 3,
  });
}
