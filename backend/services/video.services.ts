import connectDB from "../db/connect";
import { Video } from "../models/videos.model";

export class VideoService {

    // Video service methods 

    static async createVideo(data: any) {
        await connectDB();
        return await Video.create(data);
    }

    static async getAllVideos() {
        await connectDB();
        return await Video.find()
            .populate('CategoryId', 'name slug')
            .populate('uploadedBy', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async getVideoById(id: string) {
        await connectDB();
        return await Video.findById(id)
            .populate('CategoryId', 'name slug')
            .populate('uploadedBy', 'name email');
    }

    static async getVideoBySlug(slug: string) {
        await connectDB();
        return await Video.findOne({ slug })
            .populate('CategoryId', 'name slug')
            .populate('uploadedBy', 'name email');
    }

    static async getVideosByCategory(categoryId: string) {
        await connectDB();
        return await Video.find({ CategoryId: categoryId, status: 'published' })
            .populate('CategoryId', 'name slug')
            .populate('uploadedBy', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async updateVideo(id: string, data: any) {
        await connectDB();
        return await Video.findByIdAndUpdate(id, data, { new: true })
            .populate('CategoryId', 'name slug')
            .populate('uploadedBy', 'name email');
    }

    static async deleteVideo(id: string) {
        await connectDB();
        return await Video.findByIdAndDelete(id);
    }

    static async getPublishedVideos() {
        await connectDB();
        return await Video.find({ status: 'published' })
            .populate('CategoryId', 'name slug')
            .populate('uploadedBy', 'name email')
            .sort({ publishedAt: -1 });
    }

    static async searchVideos(query: string) {
        await connectDB();
        return await Video.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $in: [new RegExp(query, 'i')] } }
            ],
            status: 'published'
        })
            .populate('CategoryId', 'name slug')
            .populate('uploadedBy', 'name email')
            .sort({ publishedAt: -1 });
    }
}
