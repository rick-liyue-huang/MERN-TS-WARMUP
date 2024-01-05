import express from 'express';
import {
  getAuthenticatedUser,
  loginController,
  signUpController,
  logoutController,
} from '../controllers/users';
import { requiresAuth } from '../middlewares/auth';

export const usersRouter = express.Router();

usersRouter
  .post('/signup', signUpController)
  .post('/login', loginController)
  .get('/', requiresAuth, getAuthenticatedUser)
  .post('/logout', logoutController);
