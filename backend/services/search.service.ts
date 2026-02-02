import { Artical } from '../models/articals.model';
import { Video } from '../models/videos.model';
import { Category } from '../models/catergory.model';
import connectDB from '../db/connect';

export const globalSearch = async (query: string) => {
  await connectDB();
  if (!query || query.trim().length === 0) {
    return { articles: [], videos: [], categories: [] };
  }

  const searchRegex = { $regex: query, $options: 'i' };

  try {
    const [articles, videos, categories] = await Promise.all([
      Artical.find({
        $or: [
          { title: searchRegex },
          { summary: searchRegex },
          { tags: searchRegex }
        ]
      })
      .populate('authorId', 'name')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),

      Video.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { tags: searchRegex }
        ]
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),

      Category.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex }
        ]
      })
      .limit(10)
      .lean()
    ]);

    return {
      articles: articles.map((doc: any) => ({
        ...doc,
        id: doc._id.toString(),
        createdAt: doc.createdAt.toISOString()
      })),
      videos: videos.map((doc: any) => ({
        ...doc,
        id: doc._id.toString(),
        createdAt: doc.createdAt.toISOString()
      })),
      categories: categories.map((doc: any) => ({
        ...doc,
        id: doc._id.toString(),
        createdAt: doc.createdAt.toISOString()
      }))
    };
  } catch (error) {
    console.error('Global Search Error:', error);
    throw new Error('Search failed');
  }
};
