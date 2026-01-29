# NewsWeb - Professional News Portal

A modern, professional news portal built with Next.js 15, featuring a clean newspaper-style design focused on typography and readability.

## 🎯 Project Overview

NewsWeb is a professional news aggregation platform designed with newspaper design principles. It prioritizes **content density**, **readability**, and **performance** over flashy animations.

### Key Features

- ✅ **Clean Newspaper Design** - Typography-first, structured layout
- ✅ **Responsive Layout** - Mobile, tablet, and desktop optimized
- ✅ **Performance Optimized** - Lazy loading, optimized images
- ✅ **SEO Ready** - Proper metadata and semantic HTML
- ✅ **Type-Safe** - Full TypeScript implementation
- ✅ **Component-Based** - Reusable, modular architecture

---

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Image Optimization**: Next.js Image component

### Design Principles

Following professional news design guidelines:

1. **White background dominates** (90%)
2. **Single accent color** - Indigo (#4F46E5)
3. **Typography > Graphics** - Content-first approach
4. **Grid-based layout** - Structured sections
5. **Content density** - News portal, not a blog
6. **No sliders** - Static, fast-loading content
7. **Clean borders** - Sharp newspaper aesthetic

---

## 📁 Project Structure

```
news-portal/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
│
├── src/
│   ├── components/
│   │   ├── ui/                  # Base UI components
│   │   │   ├── Button.tsx       # Button with variants
│   │   │   ├── Badge.tsx        # Category badges
│   │   │   ├── Container.tsx    # Layout container
│   │   │   └── Input.tsx        # Form inputs
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   └── Sidebar.tsx      # Sidebar wrapper
│   │   │
│   │   ├── shared/              # Shared components
│   │   │   ├── Header.tsx       # Sticky navigation
│   │   │   └── Footer.tsx       # Site footer
│   │   │
│   │   ├── news/                # News-specific components
│   │   │   ├── FeaturedCard.tsx # Hero featured article
│   │   │   ├── TrendingCard.tsx # Trending news items
│   │   │   ├── NewsCard.tsx     # Article cards
│   │   │   └── CategoryBlock.tsx# Category sections
│   │   │
│   │   ├── sections/            # Page sections
│   │   │   ├── HeroSection.tsx  # Homepage hero
│   │   │   └── LatestNewsSection.tsx # Latest news feed
│   │   │
│   │   └── widgets/             # Sidebar widgets
│   │       ├── EditorPickWidget.tsx # Editor's picks
│   │       └── NewsletterWidget.tsx # Newsletter signup
│   │
│   ├── lib/
│   │   ├── constants.ts         # App constants (categories, links)
│   │   ├── utils.ts             # Utility functions
│   │   └── mockData.ts          # Sample news data
│   │
│   └── types/
│       └── index.ts             # TypeScript interfaces
│
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

---

## 🎨 Design System

### Color Palette

```typescript
Background:      #F9FAFB  // Light gray
Text Primary:    #111827  // Near black
Text Secondary:  #6B7280  // Medium gray
Border:          #E5E7EB  // Light gray
Accent:          #4F46E5  // Indigo-600
```

### Typography Scale

```css
Heading 1:  text-3xl (30px) - font-bold
Heading 2:  text-2xl (24px) - font-bold
Heading 3:  text-xl (20px)  - font-semibold
Body:       text-base (16px) - font-normal
Small:      text-sm (14px)  - font-normal
Tiny:       text-xs (12px)  - font-normal
```

### Spacing System

```css
Mobile:     p-3, gap-3, mb-6
Desktop:    p-6, gap-8, mb-12
Sections:   mb-8 md:mb-12
```

---

## 🧩 Components Documentation

### UI Components (`src/components/ui/`)

#### **Button**
Reusable button with three variants:
- `primary` - Indigo background, white text
- `secondary` - White background, gray border
- `ghost` - Transparent, hover gray

```tsx
<Button variant="primary" size="md">Subscribe</Button>
<Button variant="secondary" href="/login">Login</Button>
```

#### **Badge**
Category tags with two variants:
- `default` - Gray background
- `accent` - Black background, white text

```tsx
<Badge variant="accent">Technology</Badge>
```

#### **Container**
Responsive layout wrapper with max-width control:
```tsx
<Container size="lg">  {/* max-w-7xl */}
  <YourContent />
</Container>
```

#### **Input**
Styled form input with focus states:
```tsx
<Input type="email" placeholder="Enter email" />
```

---

### Layout Components

#### **Header** (`src/components/shared/Header.tsx`)
Sticky navigation with:
- Logo
- Category navigation (desktop)
- Search toggle
- Login/Subscribe buttons
- Height: 64px (mobile), 80px (desktop)

**Features:**
- Scroll shadow effect
- Collapsible search bar
- Responsive menu

#### **Footer** (`src/components/shared/Footer.tsx`)
4-column footer with:
- Logo and tagline
- Category links
- About/legal links
- Social media icons

#### **Sidebar** (`src/components/layout/Sidebar.tsx`)
Desktop-only sidebar (hidden on mobile):
- Sticky positioning (`top-20`)
- Contains widgets
- 25% width on desktop

---

### News Components (`src/components/news/`)

#### **FeaturedCard**
Large hero article card:
- 16:9 aspect ratio image
- Category badge overlay
- Title (text-3xl)
- Summary (2 lines)
- Author and date metadata

```tsx
<FeaturedCard article={featuredArticle} />
```

#### **NewsCard**
Versatile article card with two variants:

**Default variant:**
- Horizontal layout
- Large thumbnail (w-56)
- Full title and summary
- Category badge
- Author metadata

**Compact variant:**
- Smaller thumbnail (w-24)
- Title only
- Date only

```tsx
<NewsCard article={article} variant="default" />
<NewsCard article={article} variant="compact" />
```

#### **TrendingCard**
Numbered trending article:
- Square number badge
- Small thumbnail
- Title (3 lines max)
- Date

```tsx
<TrendingCard article={article} index={0} />
```

#### **CategoryBlock**
Modular category section:
- Section header with "View All" link
- Featured article (2/3 width)
- Compact articles (1/3 width)

```tsx
<CategoryBlock 
  title="Technology"
  viewAllHref="/category/tech"
  featuredArticle={techArticles[0]}
  articles={techArticles.slice(1, 4)}
/>
```

---

### Page Sections (`src/components/sections/`)

#### **HeroSection**
Homepage hero with:
- Featured article (65% width)
- Trending news sidebar (35% width)
- Black header bar for trending

```tsx
<HeroSection 
  featuredArticle={featured}
  trendingArticles={trending}
/>
```

#### **LatestNewsSection**
Vertical news feed:
- Bold uppercase header
- Stacked article cards
- Border separators

```tsx
<LatestNewsSection articles={latestArticles} />
```

---

### Widgets (`src/components/widgets/`)

#### **EditorPickWidget**
Curated articles sidebar:
- White background card
- Border styling
- Compact article list

```tsx
<EditorPickWidget articles={editorPicks} />
```

#### **NewsletterWidget**
Email subscription form:
- Email input
- Subscribe button
- Simple validation

```tsx
<NewsletterWidget />
```

---

## 🔧 Utilities & Helpers

### **constants.ts**
App-wide constants:
- `categories` - Navigation categories
- `footerLinks` - Footer link groups
- `colors` - Color palette

### **utils.ts**
Utility functions:

```typescript
// Format relative dates
formatDate(dateString: string): string
// "5 hours ago" or "Jan 28, 2026"

// Combine class names
cn(...classes): string

// Truncate text
truncateText(text: string, maxLength: number): string
```

### **mockData.ts**
Sample news data with helper functions:

```typescript
getFeaturedArticle()              // Get hero article
getTrendingArticles(count)        // Get trending articles
getLatestArticles(count)          // Get latest news
getArticlesByCategory(category)   // Filter by category
getEditorPickArticles(count)      // Get editor picks
```

---

## 🎭 TypeScript Interfaces

### **NewsArticle**
```typescript
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  image: string;
  publishedAt: string;
  slug: string;
  tags?: string[];
  source?: string;
}
```

### **CategoryInfo**
```typescript
interface CategoryInfo {
  id: string;
  label: string;
  href: string;
  description?: string;
}
```

---

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd news-portal

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized build
pnpm build

# Start production server
pnpm start
```

---

## ⚙️ Configuration

### **next.config.ts**
Configure external images:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};
```

### **tsconfig.json**
Path aliases configured:

```json
"paths": {
  "@/*": ["./*"],
  "@/components/*": ["src/components/*"],
  "@/lib/*": ["src/lib/*"],
  "@/types": ["src/types"]
}
```

Usage:
```typescript
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types';
```

---

## 📱 Responsive Breakpoints

```css
Mobile:     < 640px   (sm)
Tablet:     640px+    (sm)
Desktop:    1024px+   (lg)
```

### Layout Behavior

| Screen Size | Hero Grid | Main Grid | Sidebar |
|-------------|-----------|-----------|---------|
| Mobile      | 1 col     | 1 col     | Hidden  |
| Tablet      | 1 col     | 1 col     | Hidden  |
| Desktop     | 3 cols    | 4 cols    | Visible |

---

## 🎯 Homepage Structure

```
Header (Sticky)
└── Logo + Navigation + Search + Auth

Hero Section
├── Featured Article (65%)
└── Trending News (35%)

Main Content (75%)
├── Latest News Section
│   └── 5 articles with images
├── Technology Category Block
│   ├── Featured article
│   └── 3 compact articles
├── Business Category Block
└── Sports Category Block

Sidebar (25% - Desktop only)
├── Editor's Pick Widget
└── Newsletter Widget

Footer
├── Logo + Categories
├── About Links
└── Social Icons
```

---

## 🔍 SEO Optimization

### Metadata
```typescript
export const metadata: Metadata = {
  title: "NewsWeb - Latest News from Around the World",
  description: "Stay informed with breaking news...",
};
```

### Semantic HTML
- `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on all images
- Accessible focus states

---

## 🚀 Performance Optimizations

### Implemented
✅ Next.js Image component (automatic optimization)
✅ Lazy loading images
✅ Minimal JavaScript (static where possible)
✅ No heavy animations
✅ Font optimization (Inter via next/font)
✅ CSS-only hover effects

### Target Metrics
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s

---

## 🎨 Styling Approach

### Tailwind Utility Classes
99% of styling uses Tailwind utilities:

```tsx
<div className="flex items-center gap-4 p-6 bg-white border-2">
```

### Custom CSS (globals.css)
Only for:
- CSS reset
- CSS variables
- Base typography
- Focus states

---

## 📝 Content Guidelines

### Article Images
- Aspect ratio: **16:9**
- Minimum size: 800x450px
- Format: WebP or JPEG
- Quality: 80%

### Text Content
- Headline: 60-80 characters
- Summary: 120-180 characters
- Body line height: 1.7-1.8
- Max content width: 720px

---

## 🔄 Data Flow

```
mockData.ts
    ↓
Helper Functions
    ↓
Homepage (page.tsx)
    ↓
Sections → Components
    ↓
Render UI
```

### Adding New Articles

1. Add to `mockData.ts`:
```typescript
{
  id: '11',
  title: 'Your Article Title',
  summary: 'Brief summary...',
  category: 'Technology',
  author: { name: 'Author Name' },
  image: 'https://...',
  publishedAt: new Date().toISOString(),
  slug: 'your-article-slug',
}
```

2. Data automatically appears on homepage

---

## 🛠️ Customization Guide

### Change Accent Color
1. Update `tailwind.config.ts`:
```typescript
colors: {
  accent: '#4F46E5', // Change this
}
```

2. Update `constants.ts`:
```typescript
accent: '#4F46E5', // Change this
```

### Add New Category
1. Update `constants.ts`:
```typescript
categories: [
  ...
  { id: 'health', label: 'Health', href: '/category/health' },
]
```

2. Category appears in header automatically

### Modify Layout Grid
In `app/page.tsx`:
```typescript
// Change from 4 cols to 3 cols
<div className="grid grid-cols-1 lg:grid-cols-3">
  <div className="lg:col-span-2"> {/* Main */}
  <div className="lg:col-span-1"> {/* Sidebar */}
```

---

## 🧪 Testing Checklist

### Visual Testing
- [ ] Header sticky on scroll
- [ ] Hover states on all cards
- [ ] Images load correctly
- [ ] Search bar toggles
- [ ] Responsive on mobile/tablet/desktop

### Functional Testing
- [ ] All links navigate correctly
- [ ] Date formatting displays properly
- [ ] Categories filter correctly
- [ ] Form inputs work
- [ ] Keyboard navigation

---

## 🐛 Common Issues

### Images not loading
**Solution**: Check `next.config.ts` remote patterns
```typescript
remotePatterns: [
  { hostname: 'images.unsplash.com' }
]
```

### Path alias errors
**Solution**: Restart TypeScript server (VS Code: Cmd/Ctrl + Shift + P → "Restart TS Server")

### Styles not applying
**Solution**: Clear `.next` folder and rebuild
```bash
rm -rf .next
pnpm dev
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [News Design Best Practices](https://www.smashingmagazine.com/category/design/)

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Development

### Project Status
✅ Core features complete
✅ Responsive design implemented
✅ Component library ready
🚧 Article detail page (coming soon)
🚧 Search functionality (coming soon)
🚧 Category pages (coming soon)

### Future Enhancements
- Article detail page with comments
- Search with filters
- Category archive pages
- Author profile pages
- Dark mode toggle
- RSS feed
- Social sharing
- Related articles algorithm

---

## 🤝 Contributing

Contributions welcome! Please follow:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Email: support@newsweb.com
- Documentation: [Full docs here]

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

*Last Updated: January 28, 2026*
"# Next-News-portal" 
