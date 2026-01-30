import axios from '@/src/lib/axios';

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
  slug?: string;
  isActive: boolean;
}

// Get all categories
export const getAllCategories = async (): Promise<CategoryResponse> => {
  const response = await axios.get('/category');
  return response.data;
};

// Get active categories
export const getActiveCategories = async (): Promise<CategoryResponse> => {
  const response = await axios.get('/category/active');
  return response.data;
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<SingleCategoryResponse> => {
  const response = await axios.get(`/category/${id}`);
  return response.data;
};

// Get category by slug
export const getCategoryBySlug = async (slug: string): Promise<SingleCategoryResponse> => {
  const response = await axios.get(`/category/slug/${slug}`);
  return response.data;
};

// Create category
export const createCategory = async (data: CreateCategoryData): Promise<SingleCategoryResponse> => {
  const response = await axios.post('/category', data);
  return response.data;
};

// Update category
export const updateCategory = async (id: string, data: Partial<CreateCategoryData>): Promise<SingleCategoryResponse> => {
  const response = await axios.put(`/category/${id}`, data);
  return response.data;
};

// Delete category
export const deleteCategory = async (id: string): Promise<SingleCategoryResponse> => {
  const response = await axios.delete(`/category/${id}`);
  return response.data;
};

// Toggle category status
export const toggleCategoryStatus = async (id: string): Promise<SingleCategoryResponse> => {
  const response = await axios.patch(`/category/${id}/toggle`);
  return response.data;
};
