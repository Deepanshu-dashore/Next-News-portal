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
      totalVideoDrafts,
      totalVideos,
      totalUsers,
      recentArticles,
      articlesByCategory,
      activeCategories,
      allArticles
    ] = await Promise.all([
      Artical.countDocuments({ status: 'published' }),
      Artical.countDocuments({ status: 'draft' }),
      Video.countDocuments({ status: 'draft' }),
      Video.countDocuments({ status: 'published' }),
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
    const totalViews = allArticles.reduce((acc: number, curr: any) => acc + (curr.viewCount?.length || 0), 0);

    return {
      stats: {
        totalArticles,
        totalDrafts,
        totalVideoDrafts,
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

// Get article upload performance data for the last 7 days
export const getContentPerformanceData = async () => {
  try {
    // Calculate date range for last 7 days
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // End of today
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    startDate.setHours(0, 0, 0, 0); // Start of 7 days ago

    // Get articles uploaded in the last 7 days
    const articles = await Artical.find(
      { createdAt: { $gte: startDate, $lte: endDate } },
      'title createdAt status'
    ).sort({ createdAt: 1 }).lean();

    // Group articles by date and count uploads
    const dateMap = new Map<string, { uploads: number; date: Date }>();

    // Initialize last 7 days with proper date tracking
    for (let i = 6; i >= 0; i--) {
      const date = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000);
      date.setHours(0, 0, 0, 0);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      dateMap.set(dayName, { uploads: 0, date });
    }

    // Count articles uploaded each day
    articles.forEach((article: any) => {
      const createdDate = new Date(article.createdAt);
      const dayName = createdDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Match by day name for the current week
      if (dateMap.has(dayName)) {
        const current = dateMap.get(dayName)!;
        current.uploads += 1;
      }
    });

    // Transform to chart format (showing article uploads per day)
    const chartData = Array.from(dateMap.entries()).map(([name, data]) => ({
      name,
      views: data.uploads, // Using 'views' key for chart compatibility, but represents uploads
      uploads: data.uploads
    }));

    return chartData;
  } catch (error) {
    console.error('Error fetching content performance data:', error);
    return [];
  }
};
