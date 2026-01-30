import { CategoryService } from "../services/category.servies";
import { success, error } from "../utlis/response.utlis";
import { authMiddleware } from "../middleware/auth.middleware";
import { generateSlug, toSlug } from "../utlis/slug.utlis";

export class CategoryController {

    // Category controller methods

    static async createCategory(req: Request) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const body = await req.json();

        // Validate required fields
        if (!body.name) {
            return error("Name is required", 400);
        }

        // Auto-generate slug if not provided
        if (!body.slug) {
            body.slug = toSlug(body.name);
        } else {
            // Ensure provided slug is properly formatted
            body.slug = toSlug(body.slug);
        }

        // Check if slug already exists
        const existingCategory = await CategoryService.getCategoryBySlug(body.slug);
        if (existingCategory) {
            // Make slug unique by adding timestamp
            body.slug = generateSlug(body.name, {
                addTimestamp: true,
                timestampFormat: 'timestamp',
                maxLength: 60
            });
        }

        const category = await CategoryService.createCategory(body);
        return success(category, 201, "Category created successfully");
    }

    static async getAllCategories(req: Request) {
        const categories = await CategoryService.getAllCategories();
        return success(categories, 200, "Categories fetched successfully");
    }

    static async getActiveCategories(req: Request) {
        const categories = await CategoryService.getActiveCategories();
        return success(categories, 200, "Active categories fetched successfully");
    }

    static async getCategoryById(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const category = await CategoryService.getCategoryById((await params).id);
        if (!category) {
            return error("Category not found", 404);
        }
        return success(category, 200, "Category fetched successfully");
    }

    static async getCategoryBySlug(req: Request, { params }: { params: Promise<{ slug: string }> }) {
        const category = await CategoryService.getCategoryBySlug((await params).slug);
        if (!category) {
            return error("Category not found", 404);
        }
        return success(category, 200, "Category fetched successfully");
    }

    static async updateCategory(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const body = await req.json();

        // If slug is being updated, check for duplicates
        if (body.slug) {
            const existingCategory = await CategoryService.getCategoryBySlug(body.slug);
            if (existingCategory && existingCategory._id.toString() !== (await params).id) {
                return error("Category with this slug already exists", 400);
            }
        }

        const updatedCategory = await CategoryService.updateCategory((await params).id, body);
        if (!updatedCategory) {
            return error("Category not found", 404);
        }
        return success(updatedCategory, 200, "Category updated successfully");
    }

    static async deleteCategory(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const deletedCategory = await CategoryService.deleteCategory((await params).id);
        if (!deletedCategory) {
            return error("Category not found", 404);
        }
        return success(deletedCategory, 200, "Category deleted successfully");
    }

    static async toggleCategoryStatus(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const category = await CategoryService.toggleCategoryStatus((await params).id);
        if (!category) {
            return error("Category not found", 404);
        }
        return success(category, 200, `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`);
    }

    static async createBulkCategories(req: Request) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        const body = await req.json();

        if (!Array.isArray(body.categories) || body.categories.length === 0) {
            return error("Categories array is required", 400);
        }

        // Validate each category
        for (const cat of body.categories) {
            if (!cat.name || !cat.slug) {
                return error("Each category must have name and slug", 400);
            }
        }

        const categories = await CategoryService.createBulkCategories(body.categories);
        return success(categories, 201, `${categories.length} categories created successfully`);
    }
}
