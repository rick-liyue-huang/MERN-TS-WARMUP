import express from 'express';
import {
  getAuthenticatedUser,
  loginController,
  signUpController,
  logoutController,
} from '../controllers/users';

export const usersRouter = express.Router();

usersRouter
  .post('/signup', signUpController)
  .post('/login', loginController)
  .get('/', getAuthenticatedUser)
  .post('/logout', logoutController);
