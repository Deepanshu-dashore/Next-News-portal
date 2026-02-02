# NewsWeb - Setup & Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** or **pnpm** v8+ (pnpm recommended)
- **MongoDB Atlas Account** ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

### Verify Installation

```bash
node --version     # Should be v18+
npm --version      # or pnpm --version
git --version
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/news-portal.git
cd news-portal
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/news-portal?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Application Environment
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
API_URL=http://localhost:3000

# Optional: Third-party services
# SENDGRID_API_KEY=your-sendgrid-key
# CLOUDINARY_CLOUD_NAME=your-cloudinary-name
```

### 4. Setup MongoDB

#### Option A: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Add a database user (save credentials)
5. Whitelist your IP address
6. Copy connection string and paste in `.env.local`

#### Option B: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows (if installed)
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```
3. Use connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/news-portal
   ```

### 5. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create Initial Data (Optional)

```bash
# Seed database with sample categories and articles
node scripts/seed.js
```

---

## 🗄️ Database Setup

### Initialize Collections

The application will auto-create collections on first run. However, you can manually initialize:

```javascript
// In MongoDB Compass or MongoDB Shell

// Collections will be created with first document insert
// Or run this seed script
```

### Sample Data

Sample categories to create:
- Technology
- Business
- Sports
- World
- Politics
- Health
- Science
- Entertainment

---

## 👤 Create Admin User

### Option 1: Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `news-portal` → `users`
4. Insert document:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$...", // Bcrypt hashed "password123"
  "role": "admin",
  "bio": "Administrator",
  "createdAt": "2026-02-02T00:00:00.000Z",
  "updatedAt": "2026-02-02T00:00:00.000Z"
}
```

### Option 2: Using Application

1. Register via signup form (if enabled)
2. Update role to "admin" in database

### Default Credentials (Development)

```
Email: admin@example.com
Password: admin123
Role: admin
```

---

## 📁 Project Structure Setup

Ensure this structure exists:

```
news-portal/
├── public/
│   ├── uploads/
│   │   └── articles/       # Article images
│   ├── avatars/           # User avatars
│   └── ...
├── app/
├── src/
├── backend/
└── ...
```

Create directories if missing:
```bash
mkdir -p public/uploads/articles
mkdir -p public/avatars
```

---

## 🔑 Authentication Setup

### JWT Configuration

1. Generate a strong JWT secret:
   ```bash
   openssl rand -base64 32
   ```

2. Add to `.env.local`:
   ```
   JWT_SECRET=your-generated-secret-here
   ```

### Authentication Flow

1. User logs in at `/author-login`
2. Backend validates credentials
3. JWT token issued and stored in httpOnly cookie
4. User data stored in client-side cookie
5. User redirected to `/dashboard`

### Testing Authentication

```bash
# Try login with admin credentials
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

---

## 🛠️ Build for Production

### 1. Build the Application

```bash
pnpm build
# or
npm run build
```

### 2. Start Production Server

```bash
pnpm start
# or
npm start
```

### 3. Optimize Environment

Update `.env.production`:
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com
JWT_SECRET=your-production-secret-key
MONGODB_URI=your-production-mongodb-uri
```

---

## 🚢 Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

#### Netlify
```bash
# Build
npm run build

# Deploy
netlify deploy --prod
```

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```

```bash
docker build -t news-portal .
docker run -p 3000:3000 news-portal
```

#### AWS / DigitalOcean / Heroku
See respective platform documentation for Next.js deployment.

---

## 🧪 Testing

### Run Tests

```bash
npm test
# or with coverage
npm test -- --coverage
```

### API Testing

Using Thunder Client or Postman:

1. Import collection from `postman/` directory
2. Set up environment variables
3. Run requests

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solutions**:
1. Check MONGODB_URI in `.env.local`
2. Verify IP whitelist in MongoDB Atlas
3. Check username/password
4. Ensure MongoDB service is running (local)

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

### CORS Issues

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: Check `next.config.ts` and API route headers

### TypeScript Errors

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solution**:
```bash
# Rebuild TypeScript
tsc --noEmit
```

### Image Loading Issues

**Error**: `Image with src "..." is missing required "width" prop`

**Solution**: Check Next.js Image component usage in components

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
mongodump             # Backup MongoDB
mongorestore          # Restore MongoDB backup

# Package Management
pnpm install          # Install dependencies
pnpm update           # Update packages
pnpm add package-name # Add new package
pnpm remove pkg-name  # Remove package
```

---

## 🔐 Security Checklist

Before production deployment:

- [ ] Change JWT_SECRET to a strong value
- [ ] Change MongoDB credentials
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Add rate limiting
- [ ] Enable CORS restrictions
- [ ] Add input validation
- [ ] Set up error logging
- [ ] Enable database backups
- [ ] Configure firewall rules
- [ ] Use environment-specific configs
- [ ] Review authentication flow

---

## 💡 Tips & Best Practices

1. **Always use `.env.local` for secrets** - Never commit `.env` files
2. **Use pnpm** - Faster and more reliable than npm
3. **Test locally first** - Before pushing to production
4. **Monitor logs** - Set up error tracking service
5. **Backup database regularly** - Especially before major changes
6. **Use version control** - Always push to git
7. **Keep dependencies updated** - Run `pnpm update` regularly

---

## 📞 Getting Help

- Check existing [GitHub Issues](https://github.com/yourusername/news-portal/issues)
- Review [Discord Community](https://discord.gg/...) 
- Create new issue with detailed error message
- Include environment info (OS, Node version, etc.)

---

**Happy Coding! 🎉**
