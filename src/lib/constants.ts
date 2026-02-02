// Design System Constants

// Color System (White Theme - Indigo Accent)
export const colors = {
  background: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  accent: '#4F46E5', // Indigo-600
  accentHover: '#4338CA', // Indigo-700
} as const;

// Categories
export const categories = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'india', label: 'India', href: '/region/india' },
  { id: 'world', label: 'World', href: '/region/world' },
  { id: 'tech', label: 'Technology', href: '/category/tech' },
  { id: 'business', label: 'Business', href: '/category/business' },
  { id: 'sports', label: 'Sports', href: '/category/sports' },
  { id: 'entertainment', label: 'Entertainment', href: '/category/entertainment' },
] as const;

// Footer Links
export const footerLinks = {
  categories: categories.slice(1), // Exclude home
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  ],
} as const;
