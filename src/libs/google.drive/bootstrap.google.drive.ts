import { drive_v3, google } from 'googleapis';

export let driveService: drive_v3.Drive;

export const bootstrapGoogleDrive = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  driveService = await google.drive({
    version: 'v3',
    auth,
  });
};
