import connectDB from "../db/connect";
import { Category } from "../models/catergory.model";

export class CategoryService {

    // Category service methods
    static async getAllCategories() {
        await connectDB();
        return await Category.find({});
    }

    static async getActiveCategories() {
        await connectDB();
        return await Category.find({ isActive: true });
    }

    static async getCategoryById(id: string) {
        await connectDB();
        return await Category.findById(id);
    }

    static async getCategoryBySlug(slug: string) {
        await connectDB();
        return await Category.findOne({ slug });
    }

    static async createCategory(data: any) {
        await connectDB();
        return await Category.create(data);
    }

    static async createBulkCategories(dataArray: any[]) {
        await connectDB();
        return await Category.insertMany(dataArray);
    }

    static async updateCategory(id: string, data: any) {
        await connectDB();
        return await Category.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteCategory(id: string) {
        await connectDB();
        return await Category.findByIdAndDelete(id);
    }

    static async toggleCategoryStatus(id: string) {
        await connectDB();
        const category = await Category.findById(id);
        if (!category) return null;
        category.isActive = !category.isActive;
        return await category.save();
    }

    static async deleteAllCategories() {
        await connectDB();
        return await Category.deleteMany({});
    }
}