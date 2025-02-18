import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import notFoundHandler from './middlewares/notFoundHendler.js';
import errorHandler from './middlewares/errorHandler.js';
import { env } from './utils/env.js';
import apartmentRouter from './routers/apartment.js';
import { UPLOAD_DIR } from './constant/index.js';
const PORT = Number(env('PORT', 3000));
const allowedOrigins = [
  'http://localhost:3000',
  'https://rent-apartment-omega.vercel.app',
  'https://rent-apartment-git-main-yaroslavbliznyuks-projects.vercel.app',
  'https://rent-apartment-djtl5inxn-yaroslavbliznyuks-projects.vercel.app'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
export const setupServer = () => {
  const app = express();
  
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/', apartmentRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
