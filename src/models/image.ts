import mongoose from 'mongoose';

interface IImage {
  id: string;
  url: string;
  load?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    id: String,
    url: String,
    load: Boolean,
  },
  { versionKey: false, timestamps: true }
);

export const Image = mongoose.model<IImage>('image', imageSchema);
