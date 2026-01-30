import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const articalSchema = new Schema({

    title: { type: String, required: true },
    content: { type: String, required: true }, 
    excerpt: { type: String, required: true }, 
    summary: { type: String, required: true },
    slug: { type: String, required: true },
    categoryId: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    heroImageUrl: { type: String, required: true },
    tags:{ type: [String], default: [] },
    readTimeMinutes: { type: Number  },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    isFeatured: { type: Boolean, default: false  },
    isEditorPick: { type: Boolean, default: false  },
    publishedAt: { type: Date  },
    viewCount: { type: [String], default: []  },

}
,{timestamps:true});

//  Unique index on slug
articalSchema.index({ slug: 1 }, { unique: true });

// Compound: categoryId + publishedAt
articalSchema.index({ categoryId: 1, publishedAt: -1 });

// Compound: isFeatured + publishedAt
articalSchema.index({ isFeatured: 1, publishedAt: -1 });

//  Full-text search index
articalSchema.index({
  title: 'text',
  summary: 'text',
  excerpt: 'text',
  content: 'text',
});

export const Artical = models.Artical || model('Artical', articalSchema);