import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    id: String,
    url: String,
  },
  { versionKey: false }
);

export const Image = mongoose.model('image', imageSchema);
