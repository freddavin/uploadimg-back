import 'dotenv/config';
import { getErrorInfo } from './libs/core';
import { bootstrapMongo } from './libs/db';
import { app } from './server';
import { bootstrapGoogleDrive } from './libs/google.drive';

const PORT = process.env.PORT || 3000;

const bootstrapAll = async () => {
  await bootstrapMongo();
  await bootstrapGoogleDrive();
};

bootstrapAll().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    const { code, message } = getErrorInfo(error);
    console.log(`[Error] ${code} - ${message}`, { error });
  }
});
