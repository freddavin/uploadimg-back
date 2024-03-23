import mongoose from 'mongoose';

export const bootstrapMongo = async () => {
  const MONGO_URI = process.env.MONGO_URI || '';
  await mongoose.connect(MONGO_URI, {
    dbName: 'uploadimg',
  });
  // mongoose.set('debug', true);
  console.log(`MongoDB successfully connected`);
};
