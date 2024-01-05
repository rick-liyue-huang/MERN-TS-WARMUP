import express, { NextFunction, Request, Response } from 'express';
import { notesRouter } from './routes/notes';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import { usersRouter } from './routes/users';
import session from 'express-session';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';
import { requiresAuth } from './middlewares/auth';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 6, // 6 hours // !cookie are the key to your session, and session in the database, so we can delete the session in the database by deleting the cookie to force the user logout
    },
    rolling: true, // cookie will be refreshed automatically when user interacts with the website
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use('/api/notes', requiresAuth, notesRouter);
app.use('/api/users', usersRouter);

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
