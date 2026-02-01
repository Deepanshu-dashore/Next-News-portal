import apiClient from '@/lib/axios';

export interface Video {
  _id: string;
  title: string;
  slug: string;
  description: string;
  views: string[];
  CategoryId: {
    _id: string;
    name: string;
    slug: string;
  };
  videoUrl: string;
  durationSeconds?: number;
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VideoResponse {
  data: Video[];
  message: string;
  success: boolean;
}

export interface SingleVideoResponse {
  data: Video;
  message: string;
  success: boolean;
}

export interface CreateVideoData {
  title: string;
  slug?: string; // Optional - auto-generated on backend if not provided
  description: string;
  CategoryId: string;
  videoUrl: string;
  durationSeconds?: number;
  publishedAt?: string;
  status?: 'draft' | 'published' | 'archived'|undefined;
  uploadedBy: string;
  tags?: string[];
}

// Video API functions
export const videoApi = {
  // Get all videos
  getAllVideos: async (): Promise<VideoResponse> => {
    const response = await apiClient.get('/video');
    return response.data;
  },

  // Get published videos only
  getPublishedVideos: async (): Promise<VideoResponse> => {
      const response = await apiClient.get('/video/published');
      return response.data;
  },

  // Get video by ID
  getVideoById: async (id: string): Promise<SingleVideoResponse> => {
    const response = await apiClient.get(`/video/${id}`);
    return response.data;
  },

  // Get video by slug
  getVideoBySlug: async (slug: string): Promise<SingleVideoResponse> => {
    const response = await apiClient.get(`/video/slug/${slug}`);
    return response.data;
  },

  // Get videos by category
  getVideosByCategory: async (categoryId: string): Promise<VideoResponse> => {
    const response = await apiClient.get(`/video/category/${categoryId}`);
    return response.data;
  },

  // Search videos
  searchVideos: async (query: string): Promise<VideoResponse> => {
    const response = await apiClient.get(`/video/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Create video (protected)
  createVideo: async (data: CreateVideoData): Promise<SingleVideoResponse> => {
    const response = await apiClient.post('/video', data);
    return response.data;
  },

  // Update video (protected)
  updateVideo: async (id: string, data: Partial<CreateVideoData>): Promise<SingleVideoResponse> => {
    const response = await apiClient.put(`/video/${id}`, data);
    return response.data;
  },

  // Delete video (protected)
  deleteVideo: async (id: string): Promise<SingleVideoResponse> => {
    const response = await apiClient.delete(`/video/${id}`);
    return response.data;
  },
};
