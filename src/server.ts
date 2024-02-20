import express from 'express';
import cors from 'cors';
import { connect } from './libs/db';
import { getErrorInfo } from './libs/core';
import { router as uploadRoutes } from './routes/upload.images';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(uploadRoutes);

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
