import { Artical } from '../models/articals.model';
import { Video } from '../models/videos.model';
import { User } from '../models/user.model';
import { Category } from '../models/catergory.model';
import connectDB from '../db/connect';

export const getDashboardStats = async () => {
  await connectDB();
  try {
    const [
      totalArticles,
      totalDrafts,
      totalVideos,
      totalUsers,
      recentArticles,
      articlesByCategory,
      activeCategories,
      allArticles
    ] = await Promise.all([
      Artical.countDocuments({ status: 'published' }),
      Artical.countDocuments({ status: 'draft' }),
      Video.countDocuments(),
      User.countDocuments(),
      Artical.find().sort({ createdAt: -1 }).limit(5).populate('authorId', 'name').populate('categoryId', 'name').lean(),
      Artical.aggregate([
        { $group: { _id: '$categoryId', count: { $sum: 1 } } },
        { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'categoryInfo' } },
        { $unwind: '$categoryInfo' },
        { $project: { name: '$categoryInfo.name', value: '$count' } }
      ]),
      Category.countDocuments({ isActive: true }),
      Artical.find({}, 'viewCount')
    ]);

    // Calculate total views from viewCount array length
    const totalViews = allArticles.reduce((acc, curr) => acc + (curr.viewCount?.length || 0), 0);

    return {
      stats: {
        totalArticles,
        totalDrafts,
        totalVideos,
        totalUsers,
        totalViews,
        activeCategories
      },
      recentArticles: recentArticles.map((article: any) => ({
        id: article._id.toString(),
        title: article.title,
        author: article.authorId?.name || 'Unknown',
        category: article.categoryId?.name || 'Uncategorized',
        status: article.status,
        date: new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        image: article.heroImageUrl
      })),
      charts: {
        articlesByCategory
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Failed to fetch dashboard stats');
  }
};
