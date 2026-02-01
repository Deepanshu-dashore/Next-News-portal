import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/src/lib/axios';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'editor' | 'reader';
  isActive: boolean;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  lastLogin?: string;
  totalArticles?: number;
  totalPublishedArticles?: number;
  totalDraftArticles?: number;
  totalVideos?: number;
  totalPublishedVideos?: number;
  totalDraftVideos?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/user/profile/${userId}`);
      return response.data.data as UserProfile;
    },
    enabled: !!userId,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: UpdateProfileData }) => {
      const response = await apiClient.put(`/user/${userId}`, data);
      return response.data.data as UserProfile;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', data._id] });
    },
  });
}
