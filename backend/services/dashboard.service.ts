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
        articlesByCategory,
        contentPerformance: await getContentPerformanceData()
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Failed to fetch dashboard stats');
  }
};

// Get article performance data for the last 7 days
export const getContentPerformanceData = async () => {
  try {
    // Calculate date range for last 7 days
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get articles with their creation dates and view counts
    const articles = await Artical.find(
      { createdAt: { $gte: startDate, $lte: endDate } },
      'title createdAt viewCount publishedAt'
    ).sort({ createdAt: -1 }).lean();

    // Group articles by date and calculate views
    const dateMap = new Map<string, { views: number; articleCount: number }>();

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      dateMap.set(dayName, { views: 0, articleCount: 0 });
    }

    // Populate with actual data
    articles.forEach((article: any) => {
      const createdDate = new Date(article.createdAt);
      const dayName = createdDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (dateMap.has(dayName)) {
        const current = dateMap.get(dayName)!;
        current.views += article.viewCount?.length || 0;
        current.articleCount += 1;
      }
    });

    // Transform to chart format
    const chartData = Array.from(dateMap.entries()).map(([name, data]) => ({
      name,
      views: data.views,
      articles: data.articleCount
    }));

    return chartData;
  } catch (error) {
    console.error('Error fetching content performance data:', error);
    return [];
  }
};
