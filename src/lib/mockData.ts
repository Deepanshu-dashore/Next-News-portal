// Mock Data for Development

import { NewsArticle } from '@/types';

export const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Government Unveils New Economic Reform Plan',
    summary: 'Major policy changes announced to boost economic growth and create new job opportunities across multiple sectors.',
    category: 'Business',
    author: {
      name: 'Rajiv Sharma',
      avatar: '/avatars/author1.jpg',
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    slug: 'government-unveils-new-economic-reform-plan',
  },
  {
    id: '2',
    title: 'Apple Unveils New iPhone 15 with Revolutionary Features',
    summary: 'Tech giant announces latest smartphone with advanced AI capabilities and improved camera system.',
    category: 'Technology',
    author: {
      name: 'Priya Kapoor',
    },
    image: 'https://images.unsplash.com/photo-1592286927505-f068b59e7b1e?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    slug: 'apple-unveils-new-iphone-15',
  },
  {
    id: '3',
    title: 'AI Advances in Healthcare Industry',
    summary: 'Machine learning algorithms are revolutionizing patient diagnosis and treatment planning.',
    category: 'Technology',
    author: {
      name: 'Dr. Amit Patel',
    },
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    slug: 'ai-advances-healthcare-industry',
  },
  {
    id: '4',
    title: 'India Wins Cricket World Cup Final',
    summary: 'Historic victory as team defeats rivals in thrilling championship match.',
    category: 'Sports',
    author: {
      name: 'Sanjay Kumar',
    },
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    slug: 'india-wins-cricket-world-cup',
  },
  {
    id: '5',
    title: 'Climate Summit: World Leaders Commit to Net Zero',
    summary: 'Major agreements reached on reducing carbon emissions and transitioning to renewable energy.',
    category: 'World',
    author: {
      name: 'Maya Singh',
    },
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    slug: 'climate-summit-net-zero-commitment',
  },
  {
    id: '6',
    title: 'Bollywood Star Announces New Movie Project',
    summary: 'Acclaimed actor to lead highly anticipated film directed by award-winning filmmaker.',
    category: 'Entertainment',
    author: {
      name: 'Neha Reddy',
    },
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    slug: 'bollywood-star-new-movie-project',
  },
  {
    id: '7',
    title: '5G Network Expanding Globally',
    summary: 'Next-generation mobile networks reaching more countries with faster speeds and lower latency.',
    category: 'Technology',
    author: {
      name: 'Vikram Joshi',
    },
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    slug: '5g-network-expanding-globally',
  },
  {
    id: '8',
    title: 'Stock Markets Hit Record Highs',
    summary: 'Major indices surge as investors remain optimistic about economic recovery.',
    category: 'Business',
    author: {
      name: 'Arjun Malhotra',
    },
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 15).toISOString(),
    slug: 'stock-markets-record-highs',
  },
  {
    id: '9',
    title: 'Electric Vehicles Sales Surge Worldwide',
    summary: 'Growing adoption of EVs as manufacturers expand production and charging infrastructure improves.',
    category: 'Technology',
    author: {
      name: 'Sneha Gupta',
    },
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 7).toISOString(),
    slug: 'electric-vehicles-sales-surge',
  },
  {
    id: '10',
    title: 'New Space Mission to Mars Announced',
    summary: 'International collaboration aims to establish permanent human presence on red planet.',
    category: 'World',
    author: {
      name: 'Rahul Verma',
    },
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    slug: 'new-space-mission-to-mars',
  },
];

// Helper functions to get specific article groups
export function getFeaturedArticle(): NewsArticle {
  return mockArticles[0];
}

export function getFeaturedArticles(count: number = 3): NewsArticle[] {
  return mockArticles.slice(0, count);
}

export function getTrendingArticles(count: number = 4): NewsArticle[] {
  return mockArticles.reverse().slice(1, 1 + count);
}

export function getLatestArticles(count: number = 5): NewsArticle[] {
  return mockArticles.slice(0, count);
}

export function getArticlesByCategory(category: string, count: number = 4): NewsArticle[] {
  return mockArticles
    .filter(article => article.category.toLowerCase() === category.toLowerCase())
    .slice(0, count);
}

export function getEditorPickArticles(count: number = 3): NewsArticle[] {
  return mockArticles.slice(5, 5 + count);
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return mockArticles.find(article => article.slug === slug);
}
