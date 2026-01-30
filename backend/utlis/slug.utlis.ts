/**
 * Slug Generator Utility
 * Creates URL-friendly slugs from strings with optional timestamp for uniqueness
 */

/**
 * Convert string to basic slug format
 * @param text - The text to convert to slug
 * @returns URL-friendly slug
 */
export const toSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

/**
 * Generate timestamp string for slug
 * @param format - Format type: 'datetime', 'date', 'time', 'timestamp'
 * @returns Formatted timestamp string
 */
export const generateTimestamp = (format: 'datetime' | 'date' | 'time' | 'timestamp' = 'datetime'): string => {
  const now = new Date();
  
  switch (format) {
    case 'date':
      // Format: 2026-01-30
      return now.toISOString().split('T')[0];
    
    case 'time':
      // Format: 14-30-45
      return now.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    case 'timestamp':
      // Format: Unix timestamp
      return now.getTime().toString();
    
    case 'datetime':
    default:
      // Format: 2026-01-30-14-30-45
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
      return `${date}-${time}`;
  }
};

/**
 * Generate a unique slug with timestamp
 * @param text - The text to convert to slug
 * @param options - Configuration options
 * @returns Unique slug with timestamp
 */
export const generateSlug = (
  text: string,
  options: {
    addTimestamp?: boolean;
    timestampFormat?: 'datetime' | 'date' | 'time' | 'timestamp';
    maxLength?: number;
    prefix?: string;
    suffix?: string;
  } = {}
): string => {
  const {
    addTimestamp = false,
    timestampFormat = 'datetime',
    maxLength = 100,
    prefix = '',
    suffix = ''
  } = options;

  // Convert text to slug
  let slug = toSlug(text);

  // Add prefix if provided
  if (prefix) {
    slug = `${toSlug(prefix)}-${slug}`;
  }

  // Add suffix if provided
  if (suffix) {
    slug = `${slug}-${toSlug(suffix)}`;
  }

  // Add timestamp if requested
  if (addTimestamp) {
    const timestamp = generateTimestamp(timestampFormat);
    slug = `${slug}-${timestamp}`;
  }

  // Trim to max length
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Remove trailing hyphen if any
    slug = slug.replace(/-+$/, '');
  }

  return slug;
};

/**
 * Generate a short unique slug using timestamp
 * @param text - The text to convert to slug
 * @param maxTextLength - Maximum length for the text part
 * @returns Short unique slug
 */
export const generateShortSlug = (text: string, maxTextLength: number = 30): string => {
  const baseSlug = toSlug(text);
  const truncatedSlug = baseSlug.substring(0, maxTextLength).replace(/-+$/, '');
  const timestamp = Date.now().toString(36); // Convert timestamp to base36 for shorter string
  
  return `${truncatedSlug}-${timestamp}`;
};

/**
 * Generate a slug with random string for extra uniqueness
 * @param text - The text to convert to slug
 * @param randomLength - Length of random string to append
 * @returns Slug with random string
 */
export const generateRandomSlug = (text: string, randomLength: number = 6): string => {
  const baseSlug = toSlug(text);
  const randomStr = Math.random().toString(36).substring(2, 2 + randomLength);
  
  return `${baseSlug}-${randomStr}`;
};

/**
 * Validate if a string is a valid slug format
 * @param slug - The slug to validate
 * @returns Boolean indicating if slug is valid
 */
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

/**
 * Generate slug from title with category prefix
 * @param title - The title to convert
 * @param category - Optional category name
 * @returns Slug with category prefix
 */
export const generateCategorySlug = (title: string, category?: string): string => {
  return generateSlug(title, {
    prefix: category,
    addTimestamp: true,
    timestampFormat: 'timestamp',
    maxLength: 80
  });
};

/**
 * Generate slug for video with date
 * @param title - Video title
 * @returns Video slug with date
 */
export const generateVideoSlug = (title: string): string => {
  return generateSlug(title, {
    addTimestamp: true,
    timestampFormat: 'date',
    maxLength: 80
  });
};

/**
 * Generate slug for article with datetime
 * @param title - Article title
 * @returns Article slug with datetime
 */
export const generateArticleSlug = (title: string): string => {
  return generateSlug(title, {
    addTimestamp: true,
    timestampFormat: 'datetime',
    maxLength: 100
  });
};

/**
 * Update existing slug to ensure uniqueness
 * @param baseSlug - The base slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 */
export const ensureUniqueSlug = (baseSlug: string, existingSlugs: string[]): string => {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

/**
 * Generate unique slug with format: slugname-date-time-random4
 * Format: my-slug-20260130-143045-a1b2
 * @param text - The text to convert to slug
 * @returns Unique slug with date, time and 4 random characters
 */
export const generateUniqueSlugWithDateTime = (text: string): string => {
  const now = new Date();
  
  // Convert text to slug (no spaces)
  const baseSlug = toSlug(text);
  
  // Generate date in format: YYYYMMDD (e.g., 20260130)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  
  // Generate time in format: HHMMSS (e.g., 143045)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeStr = `${hours}${minutes}${seconds}`;
  
  // Generate 4 random alphanumeric characters
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let random4 = '';
  for (let i = 0; i < 4; i++) {
    random4 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Combine all parts: slugname-date-time-random4
  return `${baseSlug}-${dateStr}-${timeStr}-${random4}`;
};
