import connectDB from "../db/connect";
import { User } from "../models/user.model";

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

    static async deleteUser(id: string) {
        await connectDB();
        return await User.findByIdAndDelete(id);
    }
}