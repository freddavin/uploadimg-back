import { Readable } from 'stream';
import { driveService } from '.';

export const uploadImageToDrive = async (
  id: string,
  type: string = 'jpeg',
  image: Buffer
) => {
  const fileMetadata = {
    name: `${new Date().toISOString()}_${id}`,
    parents: [process.env.FOLDER_ID || ''],
  };

  const media = {
    mimeType: `image/${type}`,
    body: Readable.from(image),
  };

  await driveService.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id',
  });
};
