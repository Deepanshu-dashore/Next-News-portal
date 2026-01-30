import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { videoApi, Video, VideoResponse, SingleVideoResponse, CreateVideoData } from '@/lib/api/video.api';

// Query keys for caching
export const videoKeys = {
  all: ['videos'] as const,
  lists: () => [...videoKeys.all, 'list'] as const,
  list: (filters: string) => [...videoKeys.lists(), { filters }] as const,
  details: () => [...videoKeys.all, 'detail'] as const,
  detail: (id: string) => [...videoKeys.details(), id] as const,
  bySlug: (slug: string) => [...videoKeys.all, 'slug', slug] as const,
  byCategory: (categoryId: string) => [...videoKeys.all, 'category', categoryId] as const,
  search: (query: string) => [...videoKeys.all, 'search', query] as const,
  published: () => [...videoKeys.all, 'published'] as const,
};

// Get all videos
export const useVideos = (options?: Omit<UseQueryOptions<VideoResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: videoKeys.lists(),
    queryFn: videoApi.getAllVideos,
    ...options,
  });
};

// Get published videos
export const usePublishedVideos = (options?: Omit<UseQueryOptions<VideoResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: videoKeys.published(),
    queryFn: videoApi.getPublishedVideos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Get video by ID
export const useVideo = (id: string, options?: Omit<UseQueryOptions<SingleVideoResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: videoKeys.detail(id),
    queryFn: () => videoApi.getVideoById(id),
    enabled: !!id,
    ...options,
  });
};

// Get video by slug
export const useVideoBySlug = (slug: string, options?: Omit<UseQueryOptions<SingleVideoResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: videoKeys.bySlug(slug),
    queryFn: () => videoApi.getVideoBySlug(slug),
    enabled: !!slug,
    ...options,
  });
};

// Get videos by category
export const useVideosByCategory = (categoryId: string, options?: Omit<UseQueryOptions<VideoResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: videoKeys.byCategory(categoryId),
    queryFn: () => videoApi.getVideosByCategory(categoryId),
    enabled: !!categoryId,
    ...options,
  });
};

// Search videos
export const useSearchVideos = (query: string, options?: Omit<UseQueryOptions<VideoResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: videoKeys.search(query),
    queryFn: () => videoApi.searchVideos(query),
    enabled: !!query && query.length > 0,
    ...options,
  });
};

// Create video mutation
export const useCreateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVideoData) => videoApi.createVideo(data),
    onSuccess: () => {
      // Invalidate and refetch video queries
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      queryClient.invalidateQueries({ queryKey: videoKeys.published() });
    },
  });
};

// Update video mutation
export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateVideoData> }) => 
      videoApi.updateVideo(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific video and lists
      queryClient.invalidateQueries({ queryKey: videoKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      queryClient.invalidateQueries({ queryKey: videoKeys.published() });
    },
  });
};

// Delete video mutation
export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => videoApi.deleteVideo(id),
    onSuccess: () => {
      // Invalidate all video queries
      queryClient.invalidateQueries({ queryKey: videoKeys.all });
    },
  });
};
