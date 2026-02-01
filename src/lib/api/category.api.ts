import axios from "axios";
import apiClient from "../axios";

const asyncHandler = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.log('API_ERROR:', error);
    throw error;
  }
};

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface SingleCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface CreateCategoryData {
  name: string;
  description: string;
  isActive: boolean;
}

// Get all categories
export const getAllCategories = async (): Promise<CategoryResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get('/category');
    return response.data;
  });
};

// Get active categories
export const getActiveCategories = async (): Promise<CategoryResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get('/category/active');
    return response.data;
  });
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<SingleCategoryResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/category/${id}`);
    return response.data;
  });
};

// Get category by slug
export const getCategoryBySlug = async (slug: string): Promise<SingleCategoryResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/category/slug/${slug}`);
    return response.data;
  });
};

// Create category
export const createCategory = async (data: CreateCategoryData): Promise<SingleCategoryResponse> => {
  console.log('Creating category with data:', data);
  return asyncHandler(async () => {
    const response = await apiClient.post('/category', data);
    return response.data;
  });
};

// Update category
export const updateCategory = async (id: string, data: Partial<CreateCategoryData>): Promise<SingleCategoryResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.put(`/category/${id}`, data);
    return response.data;
  });
};

// Delete category
export const deleteCategory = async (id: string): Promise<SingleCategoryResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.delete(`/category/${id}`);
    return response.data;
  });
};

// Toggle category status
export const toggleCategoryStatus = async (id: string): Promise<SingleCategoryResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.patch(`/category/${id}/toggle`);
    return response.data;
  });
};

// Bulk create categories
export const createBulkCategories = async (categories: CreateCategoryData[]): Promise<CategoryResponse> => {
  console.log('Creating bulk categories:', categories);
  return asyncHandler(async () => {
    const response = await apiClient.post('/category/bulk', { categories });
    return response.data;
  });
};
