import { randomUUID } from 'crypto';
// import { Image } from '../models';
import { uploadImageToDrive } from '../libs/google.drive';

export const uploadImages = async (urls: string[]) => {
  const promises = urls.map(async (url) => {
    const id = randomUUID();
    // await Image.create({ id, url });

    const [base64Type, base64Image] = url.split(';base64,');
    if (!base64Image) {
      console.log('base64 undefined');
      return;
    }
    const imageType = base64Type.split('/').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');

    await uploadImageToDrive(id, imageType, imageBuffer);
    console.log('Image saved successfully');
  });
  await Promise.all(promises);
};
