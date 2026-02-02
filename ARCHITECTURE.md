# NewsWeb Architecture

## 🏗️ System Architecture Overview

NewsWeb is a modern, full-stack news portal application built with Next.js 15, React 19, and MongoDB. The architecture follows a monorepo structure with frontend and backend integrated seamlessly.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / Client                         │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
┌──────────────────────────▼──────────────────────────────────┐
│           Next.js 15 (App Router)                            │
│  ┌─────────────────────────────────────────────────────────┐
│  │  React Components (src/components/)                     │
│  │  - UI Components (Button, Card, Input, Badge, etc.)     │
│  │  - News Components (NewsCard, FeaturedCard, etc.)       │
│  │  - Layout Components (Header, Footer, Sidebar)          │
│  │  - Page Components (Dashboard, Category, Article)       │
│  └─────────────────────────────────────────────────────────┘
│  ┌─────────────────────────────────────────────────────────┐
│  │  API Routes (app/api/)                                  │
│  │  - REST endpoints for articles, categories, users       │
│  │  - Authentication & Authorization middleware            │
│  │  - Form handling & validation                           │
│  └─────────────────────────────────────────────────────────┘
│  ┌─────────────────────────────────────────────────────────┐
│  │  Services Layer (src/lib/, backend/services/)           │
│  │  - Article service, Category service, User service      │
│  │  - API client wrapper (axios)                           │
│  │  - Data transformation & mapping                        │
│  └─────────────────────────────────────────────────────────┘
└──────────────────────────┬──────────────────────────────────┘
                           │ MongoDB Queries
┌──────────────────────────▼──────────────────────────────────┐
│                  MongoDB Atlas                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   Articles   │ │  Categories  │ │    Users     │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   Videos     │ │ Subscribers  │ │  Uploads     │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

### Root Level Files
```
news-portal/
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript config
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS setup
├── postcss.config.mjs     # PostCSS configuration
├── eslint.config.mjs      # ESLint configuration
└── pnpm-workspace.yaml    # Workspace config
```

### Frontend Structure (app/ & src/)

```
app/
├── layout.tsx             # Root layout with Header/Footer
├── page.tsx               # Homepage
├── globals.css            # Global Tailwind styles
├── api/
│   ├── article/           # Article API routes
│   ├── category/          # Category API routes
│   ├── dashboard/         # Dashboard API routes
│   ├── user/              # User API routes
│   ├── video/             # Video API routes
│   └── health/            # Health check endpoint
├── article/
│   └── [slug]/            # Article detail page
├── category/
│   └── [slug]/            # Category detail page
├── dashboard/
│   ├── layout.tsx         # Dashboard layout
│   ├── page.tsx           # Dashboard home
│   ├── articles/          # Article management
│   ├── categories/        # Category management
│   ├── users/             # User management
│   ├── videos/            # Video management
│   └── profile/           # User profile
├── author-login/          # Login page
├── videos/                # Videos listing
└── search/                # Search page

src/
├── components/
│   ├── ui/                # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Container.tsx
│   │   └── Dropdown.tsx
│   │
│   ├── layout/            # Layout wrappers
│   │   ├── AppLayoutProvider.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── shared/            # Shared components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Footer.tsx     # Site footer
│   │   └── TopBar.tsx     # Top notification bar
│   │
│   ├── news/              # News-specific components
│   │   ├── NewsCard.tsx
│   │   ├── FeaturedCard.tsx
│   │   ├── TrendingCard.tsx
│   │   └── CategoryBlock.tsx
│   │
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── LatestNewsSection.tsx
│   │   ├── CategoriesSection.tsx
│   │   └── TrendingSection.tsx
│   │
│   ├── widgets/           # Sidebar widgets
│   │   ├── EditorPickWidget.tsx
│   │   ├── NewsletterWidget.tsx
│   │   └── AdWidget.tsx
│   │
│   ├── dashboard/         # Dashboard components
│   │   ├── DashboardStats.tsx
│   │   ├── DashboardCharts.tsx
│   │   ├── ArticleForm.tsx
│   │   ├── ArticlesTable.tsx
│   │   ├── CategoryForm.tsx
│   │   └── UserForm.tsx
│   │
│   ├── auth/              # Auth components
│   │   └── ProtectedRoute.tsx
│   │
│   └── modals/            # Modal components
│       └── DeleteConfirmationModal.tsx
│
├── contexts/              # React Contexts
│   └── AuthContext.tsx    # Authentication state
│
├── hooks/                 # Custom React hooks
│   ├── useArticles.ts
│   ├── useCategories.ts
│   ├── useUsers.ts
│   ├── useVideos.ts
│   └── useUserProfile.ts
│
├── lib/
│   ├── axios.ts           # Axios instance config
│   ├── constants.ts       # App constants
│   ├── utils.ts           # Utility functions
│   ├── cookies.ts         # Cookie management
│   ├── mockData.ts        # Mock/seed data
│   └── api/
│       ├── article.api.ts
│       ├── category.api.ts
│       ├── user.api.ts
│       └── transform.ts   # Data transformation
│
├── providers/
│   └── QueryProvider.tsx  # React Query setup
│
└── types/
    └── index.ts           # TypeScript interfaces
```

### Backend Structure (backend/)

```
backend/
├── controllers/           # Request handlers
│   ├── artical.controller.ts
│   ├── category.controller.ts
│   ├── user.controller.ts
│   └── video.controller.ts
│
├── services/              # Business logic
│   ├── artical.servies.ts
│   ├── category.servies.ts
│   ├── user.servies.ts
│   ├── video.services.ts
│   └── dashboard.service.ts
│
├── models/                # MongoDB schemas
│   ├── articals.model.ts
│   ├── catergory.model.ts
│   ├── user.model.ts
│   └── videos.model.ts
│
├── middleware/
│   └── auth.middleware.ts # Authentication check
│
├── db/
│   └── connect.ts         # MongoDB connection
│
└── utils/
    ├── asyncHandler.utlis.ts
    ├── response.utlis.ts
    └── slug.utlis.ts
```

---

## 🔄 Data Flow Architecture

### 1. Article Fetching Flow

```
User visits Homepage
    ↓
Next.js renders page.tsx
    ↓
Calls getArticlesByCategory() from src/lib/api/article.api.ts
    ↓
API Client (axios) hits /api/article/published
    ↓
API Route (app/api/article/route.ts) calls controller
    ↓
ArticalController.getAllArticals()
    ↓
ArticalService.getAllArticals()
    ↓
MongoDB Query: Artical.find({status: 'published'})
    ↓
Data returned and transformed
    ↓
React component renders NewsCards
```

### 2. Authentication Flow

```
User enters credentials
    ↓
Form submits to /api/user/login
    ↓
Backend validates credentials against MongoDB Users collection
    ↓
JWT token generated and stored in httpOnly cookie
    ↓
User data stored in client-side cookie
    ↓
AuthContext updated with user info
    ↓
User redirected to /dashboard
```

### 3. Dashboard Analytics Flow

```
Dashboard mounts
    ↓
Calls getDashboardStats() from backend/services/dashboard.service.ts
    ↓
Service executes parallel Promise.all() queries:
  - Total published articles
  - Total drafts
  - Total videos
  - Recent articles (5)
  - Articles by category
  - Active categories
    ↓
Data aggregated and returned
    ↓
DashboardStats & DashboardCharts components render
    ↓
Charts display real-time analytics
```

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Login** → User submits email & password
2. **Validation** → Backend checks MongoDB Users collection
3. **Token Generation** → JWT created with user ID & role
4. **Cookie Storage** → httpOnly cookie set (secure, httpOnly, sameSite=lax)
5. **Session** → User data stored in client-side cookie for UI state

### Authorization Levels

```
Guest (Public)
├── View published articles
├── View categories
├── Search articles
└── Subscribe to newsletter

Author
├── All guest permissions
├── Create articles
├── Edit own articles
├── Manage own videos
└── View personal dashboard

Editor
├── All author permissions
├── Edit any article
├── Manage all videos
└── Approve submissions

Admin
└── Full access to all features
```

### Protected Routes

- `/dashboard` → Requires authentication
- `/dashboard/articles` → Requires author/editor/admin
- `/dashboard/users` → Requires admin
- `/api/*` → Most endpoints require authentication

---

## 💾 Database Schema

### Collections

#### Articles (articals)
```javascript
{
  _id: ObjectId,
  title: String,           // Article headline
  content: String,         // Full HTML content
  excerpt: String,         // Short excerpt
  summary: String,         // 1-2 sentence summary
  slug: String,            // URL-friendly (unique)
  categoryId: ObjectId,    // Reference to Category
  authorId: ObjectId,      // Reference to User
  heroImageUrl: String,    // Featured image URL
  tags: [String],          // Search tags
  readTimeMinutes: Number, // Read time estimate
  region: String,          // Geographic region
  status: String,          // 'draft' | 'published' | 'archived'
  isEditorPick: Boolean,   // Featured article flag
  isBreaking: Boolean,     // Breaking news flag
  publishedAt: Date,       // Publication timestamp
  viewCount: [String],     // Array of viewer IDs
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

#### Categories (categories)
```javascript
{
  _id: ObjectId,
  name: String,            // Category name (unique)
  slug: String,            // URL-friendly (unique)
  description: String,     // Category description
  isActive: Boolean,       // Publication flag
  createdAt: Date,
  updatedAt: Date
}
```

#### Users (users)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,           // Email (unique)
  password: String,        // Hashed password
  role: String,            // 'admin' | 'editor' | 'author'
  bio: String,             // Author bio
  avatarUrl: String,       // Profile image
  createdAt: Date,
  updatedAt: Date
}
```

#### Videos (videos)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  videoUrl: String,        // Video URL/ID
  CategoryId: ObjectId,    // Reference to Category
  tags: [String],
  durationSeconds: Number,
  authorId: ObjectId,      // Reference to User
  status: String,          // 'draft' | 'published'
  viewCount: Number,       // View counter
  createdAt: Date,
  updatedAt: Date
}
```

#### Subscribers (subscribers)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,           // Email (unique)
  subscribedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints Structure

### Base URL
```
Development: http://localhost:3000/api
Production: https://newsweb.com/api
```

### Articles Endpoints
- `GET /article` - List all articles
- `POST /article` - Create article
- `GET /article/[id]` - Get article by ID
- `PATCH /article/[id]` - Update article
- `DELETE /article/[id]` - Delete article
- `GET /article/slug/[slug]` - Get article by slug
- `GET /article/published` - Get published articles
- `GET /article/category/[categoryId]` - Articles by category
- `GET /article/category/slug/[slug]` - Articles by category slug
- `GET /article/search` - Full-text search

### Category Endpoints
- `GET /category` - List all categories
- `POST /category` - Create category
- `GET /category/[id]` - Get category by ID
- `PATCH /category/[id]` - Update category
- `DELETE /category/[id]` - Delete category
- `GET /category/slug/[slug]` - Get category by slug

### User Endpoints
- `GET /user` - List users
- `POST /user` - Create user
- `GET /user/[id]` - Get user by ID
- `PATCH /user/[id]` - Update user
- `DELETE /user/[id]` - Delete user
- `POST /user/login` - Login
- `POST /user/logout` - Logout
- `GET /user/profile` - Current user profile

### Video Endpoints
- `GET /video` - List all videos
- `POST /video` - Create video
- `GET /video/[id]` - Get video by ID
- `PATCH /video/[id]` - Update video
- `DELETE /video/[id]` - Delete video

### Dashboard Endpoints
- `GET /dashboard/stats` - Dashboard analytics

### Health Check
- `GET /health` - Service health check

---

## 🔄 State Management

### Global State Management

1. **AuthContext** - User authentication state
   - Manages user login/logout
   - Stores JWT token & user info
   - Handles session persistence

2. **React Query** - Server state management
   - Caches API responses
   - Manages loading/error states
   - Auto-refetch & invalidation

3. **Local Component State** - UI state
   - Form inputs
   - Modal visibility
   - Filter/sort selections

---

## 🚀 Build & Deployment Flow

### Development
```
npm run dev
  ↓
Next.js dev server starts on :3000
  ↓
Hot reload enabled
  ↓
Watches for file changes
```

### Production Build
```
npm run build
  ↓
TypeScript compilation
  ↓
Next.js optimization & bundling
  ↓
Static generation for pages
  ↓
Build artifacts in .next/
  ↓
npm start
  ↓
Production server on :3000
```

---

## 🛠️ Technology Stack Details

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: React Query 5, React Context
- **HTTP Client**: Axios 1
- **UI Components**: Custom built + Recharts (charts)
- **Icons**: Iconify React
- **Notifications**: React Hot Toast
- **File Upload**: React Dropzone

### Backend (Integrated)
- **Runtime**: Node.js (via Next.js)
- **Database**: MongoDB + Mongoose 9
- **Authentication**: JWT + Bcrypt
- **File Handling**: Multer 2
- **Validation**: Custom validators

### DevTools
- **Linter**: ESLint 9
- **Package Manager**: pnpm
- **Build Tool**: Next.js (Webpack)
- **Testing**: (To be added)

---

## 📊 Performance Optimization

1. **Image Optimization**
   - Next.js Image component
   - Automatic format conversion
   - Lazy loading by default

2. **Code Splitting**
   - Route-based code splitting
   - Dynamic imports for components
   - Separate bundles per route

3. **Caching Strategy**
   - React Query caching
   - Browser cache headers
   - MongoDB query optimization

4. **Database Optimization**
   - Indexed fields (slug, status, categoryId)
   - Lean queries (`.lean()`)
   - Aggregation pipelines

---

## 🔗 External Services

### Third-Party Integrations

1. **Image CDN**
   - Unsplash (sample images)
   - Custom image uploads to `/public/uploads/`

2. **Font Service**
   - Google Fonts (Inter)

3. **Email Service** (Newsletter)
   - Currently POST to `/subscriber` endpoint
   - Can be integrated with SendGrid/Mailgun

---

## 📝 Configuration Files

### Environment Variables (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### TypeScript (tsconfig.json)
- Strict mode enabled
- Path aliases configured (@/*)
- Module resolution optimized

### Tailwind (tailwind.config.ts)
- Custom color palette
- Extended spacing
- Custom CSS variables

---

This architecture provides a scalable, maintainable foundation for a professional news portal with clear separation of concerns and modular component design.
