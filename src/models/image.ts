import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    id: String,
    url: String,
  },
  { versionKey: false, timestamps: true }
);

export const Image = mongoose.model('image', imageSchema);
