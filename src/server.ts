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
    console.log('Image received');
    const imageBody = z.object({
      url: z.string(),
    });
    const { url } = imageBody.parse(req.body);

    try {
      const newImage = await Image.create({ id: randomUUID(), url });
      newImage.save();
      console.log('Image saved successfully');

      res.status(201).json({ message: 'Image uploaded!' });
    } catch (error) {
      console.log('Error on save image on db', error);
      res.status(500).json({ message: 'Something got wrong' });
    }
  } catch (error) {
    const { errors } = error as ZodError;
    const code = errors.map((error) => error.code).join(', ');
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
