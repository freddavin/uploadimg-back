import mongoose from 'mongoose';
import 'dotenv/config';

export const connect = async () => {
  const MONGO_URI = process.env.MONGO_URI || '';
  await mongoose.connect(MONGO_URI, {
    dbName: 'uploadimg',
  });
  console.log(`MongoDB successfully connected`);
};
