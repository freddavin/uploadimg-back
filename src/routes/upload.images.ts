import express from 'express';
import z from 'zod';
import { HttpStatusCode, getErrorInfo } from '../libs/core';
import { uploadImages } from '../services';

export const router = express.Router();

router.post('/upload', async (req, res) => {
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
