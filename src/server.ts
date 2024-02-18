import express from 'express';
import cors from 'cors';
import { connect } from './db';
import z, { ZodError } from 'zod';
import { Image } from './models';
import { randomUUID } from 'crypto';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.json('Home');
});

app.post('/upload', async (req, res) => {
  try {
    const imageBody = z.object({
      url: z.string(),
    });
    const { url } = imageBody.parse(req.body);

    try {
      const newImage = await Image.create({ id: randomUUID(), url });
      newImage.save();
      res.status(201).json({ message: 'Image uploaded!' });
    } catch (error) {
      res.status(500).json({ message: 'Something got wrong' });
    }
  } catch (error) {
    const { errors } = error as ZodError;
    const code = errors.map((error) => error.code).join(', ');
    res.status(400).json({ message: 'Validation error', code });
  }
});

connect().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
