import { Schema, model, models,Types } from 'mongoose';

const videoSchema = new Schema({

    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    CategoryId: { type: Types.ObjectId, ref: 'Category', required: true },
    videoUrl: { type: String, required: true },
    durationSeconds: { type: Number  },
    publishedAt: { type: Date  },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    uploadedBy: { type: Types.ObjectId, ref: 'User', required: true },
    tags:{ type: [String], default: [] },

},{timestamps:true});

videoSchema.index({ slug: 1 }, { unique: true });

videoSchema.index({ title: 'text', description: 'text', tags: 'text' });

videoSchema.index({ CategoryId: 1, publishedAt: -1 });

export const Video = models.Video || model('Video', videoSchema);