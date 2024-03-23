import 'dotenv/config';
import { getErrorInfo } from './libs/core';
import { bootstrapMongo } from './libs/db';
import { app } from './server';
import { bootstrapGoogleDrive } from './libs/google.drive';
import { drive_v3 } from 'googleapis';

const PORT = process.env.PORT || 3000;

const connectAll = async () => {
  await bootstrapMongo();
  await bootstrapGoogleDrive();
};

connectAll().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    const { code, message } = getErrorInfo(error);
    console.log(`[Error] ${code} - ${message}`, { error });
  }
});
