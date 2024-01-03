import express, { NextFunction, Request, Response } from 'express';
import { NoteModel } from './models/note';

export const app = express();

app.get('/', async (req, res, next) => {
  try {
    // throw Error('Oops!');
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = 'An unknown error occurred';
  if (error instanceof Error) {
    errorMsg = error.message;
  }
  res.status(500).json({ error: errorMsg });
  next();
});
