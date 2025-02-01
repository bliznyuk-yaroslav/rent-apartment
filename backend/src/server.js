import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import notFoundHandler from './middlewares/notFoundHendler.js';
import errorHandler from './middlewares/errorHandler.js';
import { env } from './utils/env.js';
import apartmentRouter from './routers/apartment.js';
const PORT = Number(env('PORT', 3002));
const allowedOrigins = ['http://localhost:3002'];
const corsOptions = { origin: allowedOrigins, credentials: true };
export const setupServer = () => {
  const app = express();
  app.use(
    pino({
      transpor: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors(corsOptions));
  app.use('/', apartmentRouter);
  app.use(express.json());
  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
