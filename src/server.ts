import express from 'express';
import cors from 'cors';
import { router as uploadRoutes } from './routes/upload.images';

export const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(uploadRoutes);
