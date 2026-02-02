import apiClient from "../axios";
import { transformArticle, transformArticles } from "./transform";

const asyncHandler = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.log('API_ERROR:', error);
    throw error;
  }
};

export interface ArticleAuthor {
  _id: string;
  name: string;
  email: string;
}

export interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary: string;
  content: string;
  heroImageUrl: string;
  categoryId: ArticleCategory;
  authorId: ArticleAuthor;
  tags: string[];
  status: 'draft' | 'published';
  isFeatured?: boolean;
  isEditorPick?: boolean;
  isBreaking?: boolean;
  viewCount: string[];
  readTimeMinutes?: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  region?: string;
}

export interface ArticlesResponse {
  success: boolean;
  message: string;
  data: Article[];
}

export interface SingleArticleResponse {
  success: boolean;
  message: string;
  data: Article;
}

// Get all articles
export const getAllArticles = async (): Promise<ArticlesResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get('/article');
    return response.data;
  });
};

// Get published articles
export const getPublishedArticles = async (): Promise<ArticlesResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get('/article/published');
    return response.data;
  });
};

// Get article by ID
export const getArticleById = async (id: string): Promise<SingleArticleResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/${id}`);
    return response.data;
  });
};

// Get article by slug
export const getArticleBySlug = async (slug: string): Promise<SingleArticleResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/slug/${slug}`);
    return response.data;
  });
};

// Get articles by category
export const getArticlesByCategory = async (categoryId: string): Promise<ArticlesResponse> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/category/${categoryId}`);
    return response.data;
  });
};

// Search articles
export const searchArticles = async (query: string): Promise<any[]> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/search?q=${encodeURIComponent(query)}`);
    return transformArticles(response.data.data);
  });
};

// Helper functions to get specific article groups (transform API data to match frontend needs)
// Helper functions to get specific article groups (using server-side filtering)
export const getFeaturedArticles = async (count: number = 3): Promise<any[]> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/published?featured=true&limit=${count}`);
    return transformArticles(response.data.data);
  });
};

export const getEditorPickArticles = async (count: number = 3): Promise<any[]> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/editors-pick?limit=${count}`);
    return transformArticles(response.data.data);
  });
};

export const getBreakingNews = async (count: number = 5): Promise<any[]> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/published?breaking=true&limit=${count}`);
    return transformArticles(response.data.data);
  });
};

export const getLatestArticles = async (count: number = 5): Promise<any[]> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/published?limit=${count}`);
    return transformArticles(response.data.data);
  });
};

// Trending still needs client-side sort as backend view count sort is complex for now, but we can limit fetch
export const getTrendingArticles = async (count: number = 4): Promise<any[]> => {
  return asyncHandler(async () => {
    const response = await apiClient.get('/article/published');
    const articles = response.data.data
      .sort((a: Article, b: Article) => {
         const viewsA = a.viewCount?.length || 0;
         const viewsB = b.viewCount?.length || 0;
         return viewsB - viewsA;
      })
      .slice(0, count);
    return transformArticles(articles);
  });
};

export const getArticlesByCategorySlug = async (categorySlug: string, count?: number): Promise<any[]> => {
  return asyncHandler(async () => {
    // Note: Ideally we should have a backend route for this, but for now we'll fetch all and filter or add a backend route.
    // Since backend filtering by slug isn't added yet, we'll keep client side filter for slug for minimal risk,
    // OR we could add it to backend. Let's stick to client filter for Slugs to avoid breaking if backend lookup is heavy.
    // Actually, creating a route `article/category/slug/:slug` would be better.
    // but the user asked to fix `article.api.ts`, so let's optimize what we can.
    const response = await apiClient.get('/article/published');
    const filtered = response.data.data.filter(
      (article: Article) => article.categoryId?.slug?.toLowerCase() === categorySlug.toLowerCase()
    );
    const sliced = count ? filtered.slice(0, count) : filtered;
    return transformArticles(sliced);
  });
};

// Get articles by region
export const getArticlesByRegion = async (region: string, count?: number): Promise<any[]> => {
  return asyncHandler(async () => {
    const response = await apiClient.get(`/article/published?region=${encodeURIComponent(region)}${count ? `&limit=${count}` : ''}`);
    return transformArticles(response.data.data);
  });
};

export const getAllCategoryWiseArticles = async (): Promise<any[]> => {
    return asyncHandler(async () => {
        const response = await apiClient.get('/article/category-wise');
        // The endpoint now returns grouped data: { categoryName, articles: [...] }[]
        // We need to transform the articles within each category group
        return response.data.data.map((categoryGroup: any) => ({
            ...categoryGroup,
            articles: transformArticles(categoryGroup.articles)
        }));
    });
};

export const getTopHighlights = async (): Promise<any[]> => {
    return asyncHandler(async () => {
        const response = await apiClient.get('/article/highlights');
        return transformArticles(response.data.data);
    });
};
