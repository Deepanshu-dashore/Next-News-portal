// TypeScript Types

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  image: string;
  publishedAt: string;
  slug: string;
  tags?: string[];
  source?: string;
  readTime?: string;
}

export interface CategoryInfo {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}
