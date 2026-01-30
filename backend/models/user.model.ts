import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true},
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String},
    bio: { type: String },
    socialLinks: {
        twitter: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
        website : { type: String },
    },
    isActive: { type: Boolean, default: true  },
    role: { type: String, enum: ['reader', 'author', 'editor'], default: 'reader' },
    lastLogin: { type: Date  },

},{timestamps:true});

userSchema.index({ email: 1 }, { unique: true });

export const User = models.User || model('User', userSchema);