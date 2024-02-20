import { randomUUID } from 'crypto';
import { Image } from '../models';

export const uploadImages = async (urls: string[]) => {
  const promises = urls.map(async (url) => {
    await Image.create({ id: randomUUID(), url });
    // TODO: integrar Google Drive para salvar fotos
    console.log('Image saved successfully');
  });
  await Promise.all(promises);
};
