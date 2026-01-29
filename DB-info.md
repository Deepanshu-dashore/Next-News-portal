# DB & API Info (News Portal)

This project uses **MongoDB** (via **Mongoose**) for persistence (see backend/db/connect.ts).

## 1) Core API surface (recommended)

Base URL (example): `/api/v1`

Auth: **JWT access token** (short-lived) + optional **refresh token** (httpOnly cookie) for session renewal.

### 1.1 Endpoints overview

| Area | Method | Path | Purpose |
|---|---:|---|---|
| Health | GET | `/health` | Service health check |
| Auth | POST | `/auth/register` | Create user account |
| Auth | POST | `/auth/login` | Login (issue tokens) |
| Auth | POST | `/auth/logout` | Revoke refresh token / logout |
| Auth | POST | `/auth/refresh` | Rotate/refresh access token |
| Users | GET | `/users/me` | Get current logged-in user |
| Categories | GET | `/categories` | List categories |
| Categories | POST | `/categories` | Create category (admin/editor) |
| Categories | GET | `/categories/:slug` | Get category by slug |
| Categories | PATCH | `/categories/:id` | Update category (admin/editor) |
| Categories | DELETE | `/categories/:id` | Delete category (admin/editor) |
| Articles | GET | `/articles` | List/filter articles (home/category/search) |
| Articles | POST | `/articles` | Create article (admin/editor) |
| Articles | GET | `/articles/:slug` | Article detail page |
| Articles | PATCH | `/articles/:id` | Update article (admin/editor) |
| Articles | DELETE | `/articles/:id` | Delete article (admin/editor) |
| Articles | POST | `/articles/:id/publish` | Publish/unpublish (optional) |
| Videos | GET | `/videos` | List/filter videos |
| Videos | POST | `/videos` | Create video (admin/editor) |
| Videos | GET | `/videos/:slug` | Video detail (optional) |
| Videos | PATCH | `/videos/:id` | Update video |
| Videos | DELETE | `/videos/:id` | Delete video |
| Newsletter | POST | `/newsletter/subscribe` | Save newsletter subscription |

## 2) Query patterns needed by the UI

From the current UI:

- Home page requires:
  - **featured** articles (top N)
  - **trending** articles (top N by views/comments/score)
  - **latest** articles (sorted by published date)
  - per-category blocks (e.g., Technology, Business, World)
- Category page requires:
  - list of articles for a category (paged)
- Article page requires:
  - fetch article by `slug`
  - editor picks (optional flag) and latest list (sidebar)
- Search page requires:
  - text search across `title`, `summary`, `category`, and optionally `author`
- Videos page requires:
  - list videos by category/topic and sort by recent/popular

Recommended API shapes:

### 2.1 `GET /articles`

Query params:
- `page` (number, default 1)
- `limit` (number, default 10)
- `category` (string, slug or name)
- `q` (string, full-text search)
- `sort` (string: `latest` | `trending` | `featured`)
- `tag` (string)
- `author` (string: authorId or authorSlug)

Response (example):
```json
{
  "data": [
    {
      "id": "...",
      "title": "...",
      "summary": "...",
      "slug": "...",
      "category": {"id":"...","name":"Technology","slug":"tech"},
      "author": {"id":"...","name":"Priya Kapoor","avatar":"/avatars/..."},
      "image": "https://...",
      "publishedAt": "2026-01-29T10:00:00.000Z",
      "readTime": "5",
      "tags": ["ai","health"],
      "source": "Reuters"
    }
  ],
  "meta": {"page": 1, "limit": 10, "total": 123, "hasNext": true}
}
```

### 2.2 `GET /articles/:slug`

Response includes full content:
```json
{
  "data": {
    "id": "...",
    "title": "...",
    "summary": "...",
    "content": "<p>...</p>",
    "slug": "...",
    "category": {"id":"...","name":"Technology","slug":"tech"},
    "author": {"id":"...","name":"Priya Kapoor"},
    "image": "https://...",
    "publishedAt": "2026-01-29T10:00:00.000Z",
    "updatedAt": "2026-01-29T10:10:00.000Z",
    "tags": ["ai"],
    "readTime": "5",
    "source": "...",
    "stats": {"views": 1203, "likes": 34}
  }
}
```

### 2.3 `POST /auth/login`

Request:
```json
{ "email": "user@site.com", "password": "***" }
```

Response:
```json
{ "accessToken": "<jwt>", "user": {"id":"...","name":"...","role":"reader"} }
```

## 3) MongoDB collections (tables) to create

### 3.1 `users`

Purpose: authentication + author/editor accounts.

Fields:
- `_id` (ObjectId)
- `name` (string, required)
- `email` (string, required, unique, lowercased)
- `passwordHash` (string, required)
- `role` (string enum: `reader` | `author` | `editor` | `admin`, default `reader`)
- `avatarUrl` (string)
- `bio` (string)
- `social` (object: `twitter`, `linkedin`, `website`)
- `isActive` (boolean, default true)
- `createdAt`, `updatedAt` (Date)

Indexes:
- unique: `email`

### 3.2 `categories`

Fields:
- `_id` (ObjectId)
- `name` (string, required) — e.g. "Technology"
- `slug` (string, required, unique) — e.g. "tech"
- `description` (string)
- `isActive` (boolean, default true)
- `createdAt`, `updatedAt`

Indexes:
- unique: `slug`

### 3.3 `articles`

Fields:
- `_id` (ObjectId)
- `title` (string, required)
- `summary` (string, required)
- `content` (string) — HTML/Markdown
- `slug` (string, required, unique)
- `categoryId` (ObjectId ref `categories`, required)
- `authorId` (ObjectId ref `users`, required)
- `heroImageUrl` (string, required)
- `tags` (string[], default [])
- `source` (string) — e.g. Reuters
- `readTimeMinutes` (number) or `readTimeLabel` (string)
- `status` (string enum: `draft` | `published` | `archived`, default `draft`)
- `isFeatured` (boolean, default false)
- `isEditorPick` (boolean, default false)
- `publishedAt` (Date, nullable until published)
- `createdAt`, `updatedAt`

Stats (either embedded or separate collection):
- `views` (number, default 0)
- `likes` (number, default 0)

Indexes:
- unique: `slug`
- compound: `{ categoryId: 1, publishedAt: -1 }`
- compound: `{ isFeatured: 1, publishedAt: -1 }`
- full-text: `title`, `summary`, `content` (for search)

### 3.4 `videos`

Fields:
- `_id` (ObjectId)
- `title` (string, required)
- `slug` (string, unique)
- `description` (string)
- `categoryId` (ObjectId ref `categories`) or `topic` (string)
- `thumbnailUrl` (string, required)
- `videoUrl` (string) or `embedUrl` (string)
- `durationSeconds` (number) or `durationLabel` (string "12:42")
- `views` (number, default 0)
- `publishedAt` (Date)
- `status` (string enum: `draft` | `published`, default `published`)
- `createdAt`, `updatedAt`

Indexes:
- `publishedAt` desc
- `categoryId`

### 3.5 `newsletter_subscriptions`

Fields:
- `_id` (ObjectId)
- `email` (string, required, unique)
- `status` (string enum: `subscribed` | `unsubscribed`, default `subscribed`)
- `source` (string) — e.g. "sidebar-widget"
- `createdAt`, `updatedAt`

Indexes:
- unique: `email`

### 3.6 `refresh_tokens` (for feature updates )

If you use refresh-token rotation:

Fields:
- `_id` (ObjectId)
- `userId` (ObjectId ref `users`, required)
- `tokenHash` (string, required)
- `expiresAt` (Date, required)
- `revokedAt` (Date)
- `createdAt`

Indexes:
- `userId`
- TTL index on `expiresAt`

## 4) Notes / implementation tips

- Keep slugs stable and unique (`articles.slug`, `categories.slug`).
- Use `status: published` filters everywhere for public endpoints.
- Use MongoDB **text index** for search; for better ranking, consider Atlas Search later.
- For trending: compute a score (views + likes + recency) or maintain a daily trending cache.

---

If you want, I can also scaffold the actual Mongoose models + Express/Next route handlers that match this document.