import connectDB from "../db/connect";
import { Artical } from "../models/articals.model";
import { User } from "../models/user.model";
import { Video } from "../models/videos.model";

export class UserService {

    // User service methods 

    static async registerUser(data: any) {
        await connectDB();
        return await User.create(data);
    }

    static async findUserByEmail(email: string) {
        await connectDB();
        return await User.findOne({ email });
    }

    static async getProfileById(id: string) {
        await connectDB();
        const user = await User.findOne({ _id: id }, '-passwordHash').lean();
        const totalPublishedArticles = await Artical.find({ authorId: id, status: 'published' }).countDocuments();
        const totalDraftArticles = await Artical.find({ authorId: id, status: 'draft' }).countDocuments();
        const totalArticles = await Artical.find({ authorId: id }).countDocuments();
        const totalPublishedVideos = await Video.find({ uploadedBy: id, status: 'published' }).countDocuments();
        const totalVideos = await Video.find({ uploadedBy: id }).countDocuments();
        const totalDraftVideos = await Video.find({ uploadedBy: id, status: 'draft' }).countDocuments();
        return { totalPublishedArticles, totalDraftArticles ,...user, totalArticles, totalPublishedVideos, totalVideos, totalDraftVideos };
    }

    static async getUserById(id: string) {
        await connectDB();
        return await User.findById(id);
    }

    static async updateUser(id: string, data: any) {
        await connectDB();
        return await User.findByIdAndUpdate(id, data, { new: true });
    }

    static async getAllUsers() {
        await connectDB();
        return await User.find();
    }

    static async deactivateUser(id: string) {
        await connectDB();
        return await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }

    static async activateUser(id: string) {
        await connectDB();
        return await User.findByIdAndUpdate(id, { isActive: true }, { new: true });
    }

    static async toggleUserStatus(id: string) {
        await connectDB();
        const user = await User.findById(id);
        if (!user) {
            return null;
        }
        user.isActive = !user.isActive;
        return await user.save();
    }

    static async deleteUser(id: string) {
        await connectDB();
        return await User.findByIdAndDelete(id);
    }
}