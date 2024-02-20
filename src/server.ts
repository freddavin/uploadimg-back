import express from 'express';
import cors from 'cors';
import z from 'zod';
import { connect } from './libs/db';
import { uploadImages } from './services';
import { getErrorInfo } from './libs/core/custom.errors';
import { HttpStatusCode } from './libs/core';

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
      urls: z.array(z.string().startsWith('data:image/')).nonempty(),
    });
    const { urls } = imageBody.parse(req.body);

    await uploadImages(urls);

    res.status(HttpStatusCode.CREATED).json({ message: 'Image uploaded!' });
  } catch (error) {
    const { code, message, statusCode } = getErrorInfo(error);
    console.log(`[Error] ${code} - ${message}`, { error });
    res.status(statusCode).json({ message, code });
  }
});

connect().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    const { code, message } = getErrorInfo(error);
    console.log(`[Error] ${code} - ${message}`, { error });
  }
});
