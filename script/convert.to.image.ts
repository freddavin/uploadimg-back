import { writeFileSync } from 'fs';
import { Image } from '../src/models';
import { connect } from '../src/db';

connect()
  .then(async () => {
    console.log('Process start');

    const images = await Image.find({ load: { $ne: true } });
    console.log(`Found ${images.length} images`);
    const promises = images.map(async (image) => {
      console.log('Mapping...');
      const [base64Type, base64Image] = image.url.split(';base64,');
      if (!base64Image) {
        console.log('base64 undefined');
        return;
      }
      const type = base64Type.split('/').pop();
      const buffer = Buffer.from(base64Image, 'base64');
      writeFileSync(`script/images/${image.id}.${type}`, buffer);

      return Image.updateOne({ id: image.id }, { load: true });
    });
    await Promise.all(promises);

    console.log('Process concluded');
  })
  .catch((error) => {
    console.log(error);
  });
