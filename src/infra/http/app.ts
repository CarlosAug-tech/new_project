import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '@infra/shared/errors/app-error';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: `error: ${err.message}`,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: `Internal Server Error ${err.message}`,
  });
});

export { app };
