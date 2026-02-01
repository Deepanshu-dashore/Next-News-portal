import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/axios';

export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'editor' | 'reader';
  isActive: boolean;
  avatarUrl?: string;
  bio?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: 'admin' | 'author' | 'editor' | 'reader';
  isActive: boolean;
  bio?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'author' | 'editor' | 'reader';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'author' | 'editor' | 'reader';
  isActive?: boolean;
  avatarUrl?: string;
  bio?: string;
}

export function useUsers() {
  const queryClient = useQueryClient();

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.get('/user');
      return response.data.data || [];
    },
  });

  // Get single user by ID
  const getUserById = async (id: string) => {
    const response = await apiClient.get(`/user/${id}`);
    return response.data.data;
  };

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data: UserFormData) => {
      const { confirmPassword, ...submitData } = data;
      const response = await apiClient.post('/user', submitData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UserFormData }) => {
      const { confirmPassword, ...submitData } = data;
      const response = await apiClient.put(`/user/${id}`, submitData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Toggle user active status
  const toggleUserStatusMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(`/user/${id}/toggle-status`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users,
    isLoading,
    error,
    getUserById,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    toggleUserStatus: toggleUserStatusMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    isTogglingStatus: toggleUserStatusMutation.isPending,
  };
}
