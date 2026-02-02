import bcrypt from "bcryptjs";
import { UserService } from "../services/user.servies";
import { success, error } from "../utlis/response.utlis";
import { authMiddleware } from "../middleware/auth.middleware";
import { signToken } from "../lib/jwt";
import { User } from "../models/user.model";

export class UserController {

    // User controller methods 
    static async register(req: Request) {
        
        const body = await req.json();

        if(!body.name || !body.email || !body.password){
            return error("Name, Email and Password are required", 400);
        }
        
        if(body.password.length < 6){
            return error("Password must be at least 6 characters long", 400);
        }
        const existingUser = await UserService.findUserByEmail(body.email);
        if (existingUser) {
            return error("Email already in use", 400);
        }
        
        // Ensure role is set, default to 'author' if not provided
        if (!body.role) {
            body.role = 'author';
        }
        
        // Validate role
        if (!['admin', 'author', 'editor'].includes(body.role)) {
            return error("Invalid role. Must be admin, author, or editor", 400);
        }
        
        body["passwordHash"] = await bcrypt.hash(body.password, 10);
        const user = await UserService.registerUser(body);
        
        // Return user with role
        return success({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
        }, 201, "User registered successfully");
    }

    static async login (req: Request) {
        const body = await req.json();
        if(!body.email || !body.password){
            return error("Email and Password are required", 400);
        }
        const user = await UserService.findUserByEmail(body.email);
        if (!user) {
            return error("Invalid email or password", 401);
        }
        
        // Check if user account is active
        if (!user.isActive) {
            return error("Your account has been deactivated. Please contact the administrator.", 403);
        }
        
        const isPasswordValid = await bcrypt.compare(body.password, user.passwordHash);
        if (!isPasswordValid) {
            return error("Invalid email or password", 401);
        }
        
        // Update last login date
        const updatedUser = await UserService.updateLastLogin(user._id.toString());
        
        // Generate JWT token
        const token = signToken({ id: user._id, email: user.email, role: user.role });
        const response = success({ 
            id: user._id.toString(),
            email: user.email, 
            role: user.role,
            name: user.name,
            bio: user.bio,
            profilePicture: user.profilePicture,
            lastLogin: updatedUser?.lastLogin || new Date(),
            token 
        }, 200, "Login successful")
        
        // Set httpOnly cookie for secure token storage
        response.cookies.set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax", // Changed from strict to lax for better compatibility with redirects
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    }

    static async profile(req: Request,  { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);  
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }   
        const user = await UserService.getProfileById((await params).id);
        if (!user) {
            return error("User not found", 404);
        }
        return success(user, 200, "User profile fetched successfully");
    }

    static async getUserById(req: Request,  { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }
        const user = await UserService.getUserById((await params).id);
        if (!user) {
            return error("User not found", 404);
        }
        return success(user, 200, "User fetched successfully");
    }

    static async updateUser(req: Request,  { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }   
        const body = await req.json();
        const updatedUser = await UserService.updateUser((await params).id, body);
        if (!updatedUser) {
            return error("User not found", 404);
        }
        return success(updatedUser, 200, "User updated successfully");
    }

    static async deleteUser(req: Request,  { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }   
        const deletedUser = await UserService.deleteUser((await params).id);
        if (!deletedUser) {
            return error("User not found", 404);
        }
        return success(deletedUser, 200, "User deleted successfully");
    }

    static async deactivateUser(req: Request,  { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }   
        const user = await UserService.getUserById((await params).id);
        if (!user) {
            return error("User not found", 404);
        }
        if(!user.isActive){
            return error("User is already deactivated", 400);
        }
        const deactivatedUser = await UserService.deactivateUser((await params).id);
        if (!deactivatedUser) {
            return error("User not found", 404);
        }
        return success(deactivatedUser, 200, "User deactivated successfully");
    }

    static async toggleUserStatus(req: Request,  { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }   
        const user = await UserService.toggleUserStatus((await params).id);
        if (!user) {
            return error("User not found", 404);
        }
        return success(user, 200, `User ${user.isActive ? 'activated' : 'deactivated'} successfully`);
    }

    static async getAllUsers(req: Request) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }
        const users = await UserService.getAllUsers();
        return success(users, 200, "Users fetched successfully");
    }
}

