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

    static async getPublishedArticals() {
        await connectDB();
        return await Artical.find({ status: 'published' })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });
    }   

    static async getFeaturedArticals() {
        await connectDB();
        return await Artical.find({ isFeatured: true, status: 'published' })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async getArticalsByStatus(status: string) {
        await connectDB();
        return await Artical.find({ status })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ createdAt: -1 });
    }

    static async getArticalsByAuthor(authorId: string) {
        await connectDB();
        return await Artical.find({ authorId })
            .populate('categoryId', 'name slug')
            .populate('authorId', 'name email')
            .sort({ createdAt: -1 });
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