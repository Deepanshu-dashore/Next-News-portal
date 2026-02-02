import connectDB from "../db/connect";
import { Artical } from "../models/articals.model";

export class ArticalService {
    // Artical service methods

    static async createArtical(data: any) {
        await connectDB();
        return await Artical.create(data);
    }

    static async getAllArticals() {
        await connectDB();
        return await Artical.find()
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async getArticalById(id: string) {
        await connectDB();
        return await Artical.findById(id)
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email');
    }

    static async getArticalBySlug(slug: string) {
        await connectDB();
        return await Artical.findOne({ slug })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email');
    }

    static async getArticalsByCategory(categoryId: string) {
        await connectDB();
        return await Artical.find({ categoryId, status: 'published' })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async getArticalsByCategorySlug(slug: string) {
        await connectDB();
        const Category = (await import('../models/catergory.model')).Category;
        const category = await Category.findOne({ slug });
        if (!category) {
            return [];
        }
        return await Artical.find({ categoryId: category._id, status: 'published' })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async updateArtical(id: string, data: any) {
        await connectDB();
        return await Artical.findByIdAndUpdate(id, data, { new: true })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email');
    }   

    static async deleteArtical(id: string) {
        await connectDB();
        return await Artical.findByIdAndDelete(id);
    }       

    static async getPublishedArticals(filters: any = {}) {
        await connectDB();
        const query: any = { status: 'published' };

        if (filters.isFeatured) query.isFeatured = true;
        if (filters.isEditorPick) query.isEditorPick = true;
        if (filters.isBreaking) query.isBreaking = true;
        if (filters.region) query.region = new RegExp(`^${filters.region}$`, 'i'); // Case insensitive match

        let dbQuery = Artical.find(query)
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });

        if (filters.limit) {
            dbQuery = dbQuery.limit(parseInt(filters.limit));
        }

        return await dbQuery;
    }   

    static async getBreakingNews() {
        await connectDB();
        const breaking = await Artical.find({ isBreaking: true, status: 'published' })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });

        if (!breaking || breaking.length === 0) {
            return await Artical.find({ status: 'published' })
                .populate('categoryId', 'name slug')
                .populate('authorId', 'name email')
                .sort({ publishedAt: -1 })
                .limit(10);
        }
        return breaking;
    }

    static async getBreakingNewsTitles() {
        await connectDB();
        const breaking = await Artical.find({ isBreaking: true, status: 'published' })
            .select('title slug')
            .sort({ publishedAt: -1 });
        
        // Fallback to latest articles if no breaking news found
        if (!breaking || breaking.length === 0) {
            return await Artical.find({ status: 'published' })
                .select('title slug')
                .sort({ publishedAt: -1 })
                .limit(10);
        }
        return breaking;
    }

    static async getRegionalNews() {
        await connectDB();
        return await Artical.find({ region: { $exists: true, $ne: null }, status: 'published' })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async getLatestArticlesTitles(limit = 20) {
        await connectDB();
        return await Artical.find({ status: 'published' })
            .select('title slug')
            .sort({ publishedAt: -1 })
            .limit(limit);
    }

    static async getArticalsByStatus(status: string) {
        await connectDB();
        return await Artical.find({ status })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ createdAt: -1 });
    }

    static async getAllArticalWithCategory(limitPerCategory = 5) {
    await connectDB();

    return await Artical.aggregate([
        
        {
        $match: { status: "published" }
        },
        {
        $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category"
        }
        },
        { $unwind: "$category" },
        {
        $lookup: {
            from: "users", 
            localField: "authorId",
            foreignField: "_id",
            as: "author"
        }
        },
        { $unwind: "$author" },
        {
        $sort: { publishedAt: -1 }
        },
        {
        $group: {
            _id: "$category._id",
            categoryName: { $first: "$category.name" },
            categoryDescription: { $first: "$category.description" },
            articles: {
            $push: {
                _id: "$_id",
                title: "$title",
                slug: "$slug",
                excerpt: "$excerpt",
                heroImageUrl: "$heroImageUrl",
                publishedAt: "$publishedAt",
                readTimeMinutes: "$readTimeMinutes",
                isFeatured: "$isFeatured",
                author: {
                _id: "$author._id",
                name: "$author.name",
                avatarUrl: "$author.avatarUrl"
                }
            }
            }
        }
        },
        {
        $project: {
            categoryName: 1,
            categoryDescription: 1,
            articles: { $slice: ["$articles", limitPerCategory] }
        }
        },
        {
        $sort: { categoryName: 1 }
        }
    ]);
    }

    static async getTopHighlights(limit = 10) {
        await connectDB();
        return await Artical.aggregate([
            { $match: { status: 'published' } },
            { $sort: { publishedAt: -1 } },
            {
                $group: {
                    _id: '$categoryId',
                    article: { $first: '$$ROOT' }
                }
            },
            { $limit: limit },
            { $replaceRoot: { newRoot: '$article' } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            { $unwind: '$author' },
            { $sort: { publishedAt: -1 } }
        ]);
    }


    static async getArticalsByAuthor(authorId: string) {
        await connectDB();
        return await Artical.find({ authorId })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ createdAt: -1 });
    }

    static async getEditorPicks(limit = 4) {
        await connectDB();
        const picks = await Artical.find({ isEditorPick: true, status: 'published' })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 })
            .limit(limit);

        if (!picks || picks.length === 0) {
            return await Artical.find({ status: 'published' })
                .populate('categoryId', 'name slug')
                .populate('authorId', 'name email')
                .sort({ publishedAt: -1 })
                .limit(limit);
        }
        return picks;
    }

    static async searchArticals(query: string) {
        await connectDB();
        return await Artical.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { summary: { $regex: query, $options: 'i' } },
                { excerpt: { $regex: query, $options: 'i' } },
            ],
            $and: [{ status: 'published' }]
        })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1});
    }

}