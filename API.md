# NewsWeb - API Documentation

## 📡 API Overview

Complete REST API reference for NewsWeb. All endpoints require proper authentication (except health check and public reads).

**Base URL**: `/api`

**Response Format**: JSON

**Authentication**: JWT in httpOnly cookie (automatically sent)

---

## 🔐 Authentication Endpoints

### POST `/user/login`

Authenticate user with email and password.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "author",
    "bio": "Author bio",
    "avatarUrl": "/avatars/john.jpg"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors**:
- 400: Invalid email/password
- 401: Unauthorized
- 500: Server error

---

### POST `/user/logout`

Logout current user and clear authentication tokens.

**Request**: No body required

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### POST `/user` (Admin Only)

Create new user account.

**Request**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securepass123",
  "role": "author"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "email": "jane@example.com",
    "name": "Jane Smith",
    "role": "author"
  }
}
```

---

## 📰 Article Endpoints

### GET `/article`

Get list of all articles (with filters).

**Query Parameters**:
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `status` (string) - Filter by status: `draft`, `published`, `archived`
- `category` (string) - Filter by category ID
- `search` (string) - Full-text search
- `sort` (string) - Sort by: `latest`, `oldest`, `trending`

**Example**:
```
GET /article?page=1&limit=10&status=published&sort=latest
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "title": "Breaking News",
      "excerpt": "Article excerpt...",
      "slug": "breaking-news-123",
      "category": {
        "id": "507f1f77bcf86cd799439014",
        "name": "Technology",
        "slug": "technology"
      },
      "author": {
        "id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "heroImageUrl": "/uploads/articles/img.jpg",
      "tags": ["tech", "ai"],
      "status": "published",
      "viewCount": [/* array of viewer IDs */],
      "readTimeMinutes": 5,
      "isEditorPick": true,
      "isBreaking": false,
      "publishedAt": "2026-02-02T10:00:00.000Z",
      "createdAt": "2026-02-02T09:30:00.000Z",
      "updatedAt": "2026-02-02T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15
  }
}
```

---

### POST `/article` (Author+)

Create new article.

**Request** (FormData):
```
title: "My New Article"
content: "<p>Article content...</p>"
excerpt: "Short excerpt"
summary: "One sentence summary"
categoryId: "507f1f77bcf86cd799439014"
tags: ["tag1", "tag2"]
readTimeMinutes: 5
status: "draft"
heroImage: <File>
isEditorPick: true
isBreaking: false
region: "India"
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "title": "My New Article",
    "slug": "my-new-article-1706863800000",
    "status": "draft",
    /* ... article data ... */
  }
}
```

**Errors**:
- 400: Missing required fields
- 401: Unauthorized
- 413: File too large

---

### GET `/article/:id`

Get specific article by ID.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    /* full article object */
  }
}
```

---

### GET `/article/slug/:slug`

Get article by slug (for detail pages).

**Example**:
```
GET /article/slug/breaking-news-123
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    /* full article object */
  }
}
```

---

### PATCH `/article/:id` (Author+)

Update existing article.

**Request** (FormData):
```
title: "Updated Title"
content: "<p>Updated content...</p>"
status: "published"
heroImage: <File> (optional)
/* ... other fields ... */
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    /* updated article object */
  }
}
```

---

### DELETE `/article/:id` (Author+)

Delete article (author/editor can delete own, admin any).

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

---

### GET `/article/published`

Get published articles (public).

**Query Parameters**:
- `limit` (number) - Number of articles
- `region` (string) - Filter by region

**Response** (200 OK):
```json
{
  "success": true,
  "data": [ /* published articles */ ]
}
```

---

### GET `/article/category/:categoryId`

Get articles by category.

**Response** (200 OK):
```json
{
  "success": true,
  "data": [ /* articles in category */ ]
}
```

---

### GET `/article/category/slug/:slug`

Get articles by category slug (for category pages).

**Example**:
```
GET /article/category/slug/technology
```

---

## 📂 Category Endpoints

### GET `/category`

Get all categories.

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439014",
      "name": "Technology",
      "slug": "technology",
      "description": "Tech news and updates",
      "isActive": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### POST `/category` (Admin+)

Create new category.

**Request**:
```json
{
  "name": "AI & Machine Learning",
  "slug": "ai-machine-learning",
  "description": "Latest in AI and ML",
  "isActive": true
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439016",
    "name": "AI & Machine Learning",
    "slug": "ai-machine-learning",
    /* ... */
  }
}
```

---

### GET `/category/:id`

Get specific category.

---

### PATCH `/category/:id` (Admin+)

Update category.

**Request**:
```json
{
  "name": "Updated Name",
  "isActive": true
}
```

---

### DELETE `/category/:id` (Admin+)

Delete category.

---

## 👥 User Endpoints

### GET `/user`

Get all users (admin only).

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "author",
      "bio": "Author bio",
      "avatarUrl": "/avatars/john.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/user/profile`

Get current logged-in user's profile.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    /* ... user data ... */
  }
}
```

---

### GET `/user/:id`

Get specific user by ID.

---

### PATCH `/user/:id` (User+)

Update user profile.

**Request**:
```json
{
  "name": "Jane Doe",
  "bio": "Updated bio",
  "avatarUrl": "/avatars/jane.jpg"
}
```

---

### DELETE `/user/:id` (Admin+)

Delete user account.

---

## 🎬 Video Endpoints

### GET `/video`

Get all videos.

**Query Parameters**:
- `page` (number)
- `limit` (number)
- `category` (string)
- `sort` (string) - `latest`, `popular`

---

### POST `/video` (Author+)

Create new video.

**Request**:
```json
{
  "title": "Video Title",
  "description": "Video description",
  "videoUrl": "https://youtube.com/watch?v=xyz",
  "CategoryId": "507f1f77bcf86cd799439014",
  "tags": ["tag1", "tag2"],
  "durationSeconds": 300,
  "status": "published"
}
```

---

### GET `/video/:id`

Get specific video.

---

### PATCH `/video/:id` (Author+)

Update video.

---

### DELETE `/video/:id` (Author+)

Delete video.

---

## 📊 Dashboard Endpoints

### GET `/dashboard/stats` (Author+)

Get dashboard analytics.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalArticles": 145,
      "totalDrafts": 23,
      "totalVideos": 42,
      "totalUsers": 8,
      "totalViews": 50320,
      "activeCategories": 8
    },
    "recentArticles": [
      {
        "id": "507f1f77bcf86cd799439013",
        "title": "Recent Article",
        "author": "John Doe",
        "category": "Technology",
        "status": "published",
        "date": "Feb 2",
        "image": "/uploads/articles/img.jpg"
      }
    ],
    "charts": {
      "articlesByCategory": [
        { "name": "Technology", "value": 45 },
        { "name": "Business", "value": 38 },
        /* ... */
      ],
      "contentPerformance": [
        { "name": "Mon", "views": 1200, "articles": 3 },
        { "name": "Tue", "views": 1900, "articles": 2 },
        /* ... */
      ]
    }
  }
}
```

---

## 📧 Newsletter Endpoints

### POST `/subscriber`

Subscribe to newsletter.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Subscription successful",
  "data": {
    "id": "507f1f77bcf86cd799439020",
    "name": "John Doe",
    "email": "john@example.com",
    "subscribedAt": "2026-02-02T10:00:00.000Z"
  }
}
```

**Errors**:
- 409: Email already subscribed
- 400: Invalid email

---

## 🏥 Health Check

### GET `/health`

Check API health status.

**Response** (200 OK):
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-02-02T10:00:00.000Z"
}
```

---

## 🔄 Request/Response Format

### Standard Response Structure

```json
{
  "success": true/false,
  "message": "Human-readable message",
  "data": { /* response data */ },
  "error": "Error message (if error)"
}
```

### Error Responses

**400 Bad Request**:
```json
{
  "success": false,
  "error": "Invalid input parameters",
  "details": { /* validation errors */ }
}
```

**401 Unauthorized**:
```json
{
  "success": false,
  "error": "Authentication required"
}
```

**403 Forbidden**:
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**409 Conflict**:
```json
{
  "success": false,
  "error": "Resource already exists"
}
```

**500 Server Error**:
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 📝 Common Query Examples

### Get published technology articles
```
GET /article?status=published&category=507f1f77bcf86cd799439014&limit=20
```

### Search for articles about AI
```
GET /article?search=artificial%20intelligence&limit=10
```

### Get trending articles
```
GET /article?sort=trending&limit=5
```

### Get recent user uploads
```
GET /article?status=draft&sort=latest
```

---

## 🔑 Authentication Methods

### Cookie-Based (Recommended)
```
- httpOnly cookie automatically sent
- No additional headers needed
- Secure by default
```

### Manual Header (if needed)
```
Authorization: Bearer <jwt-token>
```

---

## 🚦 Rate Limiting

Coming soon! Configure in production:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

---

## 📚 SDK/Client Libraries

### JavaScript/TypeScript

```typescript
import apiClient from '@/src/lib/axios';

// GET
const articles = await apiClient.get('/article?limit=10');

// POST
const newArticle = await apiClient.post('/article', formData);

// PATCH
const updated = await apiClient.patch(`/article/${id}`, data);

// DELETE
await apiClient.delete(`/article/${id}`);
```

### cURL Examples

```bash
# Login
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Get articles
curl http://localhost:3000/api/article

# Create article (with auth)
curl -X POST http://localhost:3000/api/article \
  -F "title=My Article" \
  -F "content=<p>Content</p>" \
  -F "category=tech" \
  -F "heroImage=@image.jpg"
```

---

## 🧪 Testing API

### Using Postman

1. Import collection from `postman/NewsWeb.postman_collection.json`
2. Set environment variables
3. Run requests

### Using ThunderClient (VS Code)

See `thunder-client/` directory

### Using REST Client (VS Code)

See `.http` files in `api/` directory

---

**API Documentation Last Updated**: February 2, 2026

For more details, check [ARCHITECTURE.md](./ARCHITECTURE.md)
