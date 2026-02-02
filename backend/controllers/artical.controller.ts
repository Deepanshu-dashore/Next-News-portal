import { ArticalService } from "../services/artical.servies";
import { success, error } from "../utlis/response.utlis";
import { authMiddleware } from "../middleware/auth.middleware";
import { generateUniqueSlugWithDateTime } from "../utlis/slug.utlis";
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { Category } from "../models/catergory.model";
import { User } from "../models/user.model";

export class ArticalController {

    // Create article with image upload
    static async createArtical(req: Request) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        try {
            const formData = await req.formData();

            const title = formData.get('title')?.toString().trim();
            const content = formData.get('content')?.toString();
            const excerpt = formData.get('excerpt')?.toString();
            const summary = formData.get('summary')?.toString();
            const categoryId = formData.get('categoryId')?.toString();
            const tagsRaw = formData.get('tags')?.toString();
            const readTimeMinutes = formData.get('readTimeMinutes')?.toString();
            const status = formData.get('status')?.toString() || 'draft';
            const isFeatured = formData.get('isFeatured') === 'true';
            const isEditorPick = formData.get('isEditorPick') === 'true';
            const isBreaking = formData.get('isBreaking') === 'true';
            const region = formData.get('region')?.toString();
            const heroImage = formData.get('heroImage') as File | null;
            const authorId = formData.get('authorId')?.toString() || '';

            // Validation
            if (!title) {
                return error("Title is required", 400);
            }
            if (!content) {
                return error("Content is required", 400);
            }
            if (!excerpt) {
                return error("Excerpt is required", 400);
            }
            if (!summary) {
                return error("Summary is required", 400);
            }
            if (!categoryId) {
                return error("Category is required", 400);
            }

            if (!heroImage || heroImage.size === 0) {
                return error("Hero image is required", 400);
            }

            // Validate image type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(heroImage.type)) {
                return error("Invalid image format", 400);
            }

            // Verify category
            const category = await Category.findById(categoryId);
            if (!category) {
                return error("Invalid category", 400);
            }

            // Verify author
            const author = await User.findById(authorId);
            if (!author) {
                return error("Invalid author", 400);
            }

            // Generate slug
            const slug = generateUniqueSlugWithDateTime(title);

            // Upload image
            const buffer = Buffer.from(await heroImage.arrayBuffer());

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'articles');
            await mkdir(uploadDir, { recursive: true });

            const extension = heroImage.type.split('/')[1];
            const filename = `article-${Date.now()}.${extension}`;
            const filepath = join(uploadDir, filename);

            await writeFile(filepath, buffer);
            const heroImageUrl = `/uploads/articles/${filename}`;

            // Safe tags parsing
            let parsedTags: string[] = [];
            if (tagsRaw) {
                try {
                    parsedTags = JSON.parse(tagsRaw);
                    if (!Array.isArray(parsedTags)) parsedTags = [];
                } catch {
                    parsedTags = tagsRaw.split(',').map(t => t.trim());
                }
            }

            const articalData = {
                title,
                content,
                excerpt,
                summary,
                slug,
                categoryId,
                authorId,
                heroImageUrl,
                tags: parsedTags,
                readTimeMinutes: readTimeMinutes ? Number(readTimeMinutes) : undefined,
                status,
                isFeatured,
                isEditorPick,
                isBreaking,
                region,
                publishedAt: status === 'published' ? new Date() : undefined,
            };

            const artical = await ArticalService.createArtical(articalData);

            return success(artical, 201, "Article created successfully");

        } catch (err: any) {
            console.error('Create article error:', err);
            return error("Failed to create article", 500);
        }
    }


    // Get all articals
    static async getAllArticals(req: Request) {
        try {
            const articals = await ArticalService.getAllArticals();
            return success(articals, 200, "Articles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch articles", 500);
        }
    }

    // Get artical by ID
    static async getArticalById(req: Request, { params }: { params: Promise<{ id: string }> }) {
        try {
            const artical = await ArticalService.getArticalById((await params).id);
            if (!artical) {
                return error("Article not found", 404);
            }
            return success(artical, 200, "Article fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch article", 500);
        }
    }

    // Get artical by slug
    static async getArticalBySlug(req: Request, { params }: { params: Promise<{ slug: string }> }) {
        try {
            const artical = await ArticalService.getArticalBySlug((await params).slug);
            if (!artical) {
                return error("Article not found", 404);
            }
            return success(artical, 200, "Article fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch article", 500);
        }
    }

    // Get articals by category
    static async getArticalsByCategory(req: Request, { params }: { params: Promise<{ categoryId: string }> }) {
        try {
            const articals = await ArticalService.getArticalsByCategory((await params).categoryId);
            return success(articals, 200, "Articles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch articles", 500);
        }
    }

    // Get articals by category slug
    static async getArticalsByCategorySlug(req: Request, { params }: { params: Promise<{ slug: string }> }) {
        try {
            const articals = await ArticalService.getArticalsByCategorySlug((await params).slug);
            return success(articals, 200, "Articles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch articles", 500);
        }
    }

    // Get all articles with category (Dynamic Category Load)
    static async getAllArticalWithCategory(req: Request) {
        try {
            const articals = await ArticalService.getAllArticalWithCategory();
            return success(articals, 200, "Category-wise articles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch category-wise articles", 500);
        }
    }

    // Get top highlights (one per category)
    static async getTopHighlights(req: Request) {
        try {
            const articals = await ArticalService.getTopHighlights();
            return success(articals, 200, "Top highlights fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch top highlights", 500);
        }
    }

    // Get editor's pick articles
    static async getEditorPicks(req: Request) {
        try {
            const url = new URL(req.url);
            const limit = parseInt(url.searchParams.get('limit') || '4');
            const articals = await ArticalService.getEditorPicks(limit);
            return success(articals, 200, "Editor's pick articles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch editor's pick articles", 500);
        }
    }

    // Get breaking news titles (for ticker)
    static async getBreakingNewsTitles(req: Request) {
        try {
            const articals = await ArticalService.getBreakingNewsTitles();
            return success(articals, 200, "Breaking news titles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch breaking news titles", 500);
        }
    }

    // Get latest titles (for footer)
    static async getLatestArticlesTitles(req: Request) {
        try {
            const url = new URL(req.url);
            const limit = parseInt(url.searchParams.get('limit') || '20');
            const articals = await ArticalService.getLatestArticlesTitles(limit);
            return success(articals, 200, "Latest article titles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch latest article titles", 500);
        }
    }

    // Get published articals with filters
    static async getPublishedArticals(req: Request) {
        try {
            const url = new URL(req.url);
            const filters = {
                isFeatured: url.searchParams.get('featured') === 'true',
                isEditorPick: url.searchParams.get('editorPick') === 'true',
                isBreaking: url.searchParams.get('breaking') === 'true' || url.searchParams.get('isBreaking') === 'true',
                region: url.searchParams.get('region'),
                limit: url.searchParams.get('limit'),
            };

            const articals = await ArticalService.getPublishedArticals(filters);
            return success(articals, 200, "Published articles fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to fetch articles", 500);
        }
    }


    // Search articals
    static async searchArticals(req: Request) {
        try {
            const url = new URL(req.url);
            const query = url.searchParams.get('q');
            
            if (!query) {
                return error("Search query is required", 400);
            }

            const articals = await ArticalService.searchArticals(query);
            return success(articals, 200, "Search results fetched successfully");
        } catch (err: any) {
            return error(err.message || "Failed to search articles", 500);
        }
    }

    // Update artical with optional image upload
    static async updateArtical(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        try {
            const formData = await req.formData();
            const articalId = (await params).id;
            
            const updateData: any = {};

            // Get text fields
            const title = formData.get('title') as string;
            const content = formData.get('content') as string;
            const excerpt = formData.get('excerpt') as string;
            const summary = formData.get('summary') as string;
            const categoryId = formData.get('categoryId') as string;
            const tags = formData.get('tags') as string;
            const readTimeMinutes = formData.get('readTimeMinutes') as string;
            const status = formData.get('status') as string;
            const isFeatured = formData.get('isFeatured');
            const isEditorPick = formData.get('isEditorPick');
            const isBreaking = formData.get('isBreaking');
            const region = formData.get('region') as string;
            const heroImage = formData.get('heroImage') as File;

            // Update fields if provided
            if (title) updateData.title = title;
            if (content) updateData.content = content;
            if (excerpt) updateData.excerpt = excerpt;
            if (summary) updateData.summary = summary;
            if (categoryId) updateData.categoryId = categoryId;
            if (tags) updateData.tags = JSON.parse(tags);
            if (readTimeMinutes) updateData.readTimeMinutes = parseInt(readTimeMinutes);
            if (status) updateData.status = status;
            if (isFeatured !== null) updateData.isFeatured = isFeatured === 'true';
            if (isEditorPick !== null) updateData.isEditorPick = isEditorPick === 'true';
            if (isBreaking !== null) updateData.isBreaking = isBreaking === 'true';
            if (region) updateData.region = region;

            // Handle image upload if new image provided
            if (heroImage && heroImage.size > 0) {
                // Get existing article to delete old image
                const existingArtical = await ArticalService.getArticalById(articalId);
                if (existingArtical && existingArtical.heroImageUrl) {
                    // Delete old image file
                    const oldImagePath = join(process.cwd(), 'public', existingArtical.heroImageUrl);
                    if (existsSync(oldImagePath)) {
                        try {
                            await unlink(oldImagePath);
                        } catch (err) {
                            console.error('Error deleting old image:', err);
                        }
                    }
                }

                const bytes = await heroImage.arrayBuffer();
                const buffer = Buffer.from(bytes);
                
                const uploadDir = join(process.cwd(), 'public', 'uploads', 'articles');
                await mkdir(uploadDir, { recursive: true });
                
                const timestamp = Date.now();
                const fileExtension = heroImage.name.split('.').pop();
                const filename = `article-${timestamp}.${fileExtension}`;
                const filepath = join(uploadDir, filename);
                
                await writeFile(filepath, buffer);
                updateData.heroImageUrl = `/uploads/articles/${filename}`;
            }

            // Update published date if status changes to published
            if (status === 'published' && updateData.publishedAt === undefined) {
                updateData.publishedAt = new Date();
            }

            const updatedArtical = await ArticalService.updateArtical(articalId, updateData);
            if (!updatedArtical) {
                return error("Article not found", 404);
            }

            return success(updatedArtical, 200, "Article updated successfully");
        } catch (err: any) {
            console.error('Update article error:', err);
            return error(err.message || "Failed to update article", 500);
        }
    }

    // Delete artical
    static async deleteArtical(req: Request, { params }: { params: Promise<{ id: string }> }) {
        const authenticated = authMiddleware(req);
        if (!authenticated) {
            return error("Unauthorized request", 401);
        }

        try {
            const deletedArtical = await ArticalService.deleteArtical((await params).id);
            if (!deletedArtical) {
                return error("Article not found", 404);
            }
            return success(deletedArtical, 200, "Article deleted successfully");
        } catch (err: any) {
            return error(err.message || "Failed to delete article", 500);
        }
    }
}
