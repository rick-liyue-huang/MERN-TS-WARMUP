import express, { NextFunction, Request, Response } from 'express';
import { notesRouter } from './routes/notes';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/notes', notesRouter);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = 'An unknown error occurred';
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMsg = error.message;
  }

  res.status(statusCode).json({ error: errorMsg });
  next();
});
