import express from 'express';
import cors from 'cors';
import z, { ZodError } from 'zod';
import { randomUUID } from 'crypto';
import { connect } from './db';
import { Image } from './models';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.json('Home');
});

app.post('/upload', async (req, res) => {
  try {
    console.log('Images received');
    const imageBody = z.object({
      urls: z.array(z.string()),
    });
    const { urls } = imageBody.parse(req.body);

    const promises = urls.map(async (url) => {
      const imageType = url.split(';base64,').shift();
      if (!imageType?.includes('data:image')) {
        console.log('This is not an image');
        return;
      }

      try {
        await Image.create({ id: randomUUID(), url });
        console.log('Image saved successfully');
      } catch (error) {
        console.log('Error on save image on db', error);
        res.status(500).json({ message: 'Something got wrong' });
      }
    });
    await Promise.all(promises);
    res.status(201).json({ message: 'Image uploaded!' });
  } catch (error) {
    const { errors } = error as ZodError;
    const code = errors?.map((error) => error.code).join(', ');
    console.log('Error on validation', error);
    res.status(400).json({ message: 'Validation error', code });
  }
});

connect().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
