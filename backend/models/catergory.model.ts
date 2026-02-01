import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  slug: { type: String},
},{ timestamps:true });

CategorySchema.index({ slug: 1 }, { unique: true });

export const Category = models.Category || model('Category', CategorySchema);
