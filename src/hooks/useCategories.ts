import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as categoryApi from '@/src/lib/api/category.api';
import { CreateCategoryData } from '@/src/lib/api/category.api';

// Query keys
const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: string) => [...categoryKeys.lists(), { filters }] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
  bySlug: (slug: string) => [...categoryKeys.all, 'slug', slug] as const,
};

// Get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: categoryApi.getAllCategories,
  });
};

// Get active categories
export const useActiveCategories = () => {
  return useQuery({
    queryKey: categoryKeys.list('active'),
    queryFn: categoryApi.getActiveCategories,
  });
};

// Get category by ID
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryApi.getCategoryById(id),
    enabled: !!id,
  });
};

// Get category by slug
export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: categoryKeys.bySlug(slug),
    queryFn: () => categoryApi.getCategoryBySlug(slug),
    enabled: !!slug,
  });
};

// Create category mutation
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryData) => categoryApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

// Update category mutation
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCategoryData> }) =>
      categoryApi.updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
    },
  });
};

// Delete category mutation
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

// Toggle category status mutation
export const useToggleCategoryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryApi.toggleCategoryStatus(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
    },
  });
};

// Bulk create categories mutation
export const useBulkCreateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categories: CreateCategoryData[]) => categoryApi.createBulkCategories(categories),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};
