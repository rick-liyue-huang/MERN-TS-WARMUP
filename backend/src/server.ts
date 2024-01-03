import 'dotenv/config';
import mongoose from 'mongoose';
import env from './utils/validateEnv';
import { app } from './app';

const PORT = env.PORT;

mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log('MongoDB connected!');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
