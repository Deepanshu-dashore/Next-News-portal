import type { Article } from './article.api';

// Transform API article to frontend article format
export function transformArticle(article: Article) {
  return {
    id: article._id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    summary: article.summary,
    content: article.content,
    image: article.heroImageUrl || '/placeholder-article.jpg',
    heroImageUrl: article.heroImageUrl,
    category: (article.categoryId as any)?.name || (article as any).category?.name || 'Uncategorized',
    categorySlug: (article.categoryId as any)?.slug || (article as any).category?.slug || '',
    author: {
      name: (article.authorId as any)?.name || (article as any).author?.name || 'Unknown Author',
      avatar: '/avatar-placeholder.jpg',
    },
    publishedAt: article.publishedAt || article.createdAt,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    readTime: article.readTimeMinutes || 5,
    views: article.viewCount?.length || 0,
    tags: article.tags || [],
    isFeatured: article.isFeatured || false,
    isEditorPick: article.isEditorPick || false,
    isBreaking: article.isBreaking || false,
    status: article.status,
    region: article.region,
  };
}

// Transform array of articles
export function transformArticles(articles: Article[]) {
  return articles.map(transformArticle);
}
