import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user';

interface SignUpRequestBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUpController: RequestHandler<
  unknown,
  unknown,
  SignUpRequestBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Missing fields');
    }

    const existingUsername = await UserModel.findOne({ username }).exec();

    if (existingUsername) {
      throw createHttpError(
        409,
        'Username already exists, use another username'
      );
    }

    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(409, 'Email already exists, please login instead');
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    // add session
    req.session.userId = newUser._id; // add @types/session.d.ts, and modify the tsconfig.json

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

interface LoginRequestBody {
  username?: string;
  password?: string;
}

export const loginController: RequestHandler<
  unknown,
  unknown,
  LoginRequestBody,
  unknown
> = async (req, res, next) => {
  const { username, password: passwordRaw } = req.body;

  try {
    if (!username || !passwordRaw) {
      throw createHttpError(400, 'Missing fields');
    }

    const existingUser = await UserModel.findOne({ username })
      .select('+password +email') // match with the userModel
      .exec();

    if (!existingUser) {
      throw createHttpError(401, 'Invalid credentials, Username not found');
    }

    const isPasswordCorrect = await bcrypt.compare(
      passwordRaw,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw createHttpError(401, 'Invalid credentials, Password is incorrect');
    }

    // add session
    req.session.userId = existingUser._id;

    res.status(201).json(existingUser);
  } catch (err) {
    next(err);
  }
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, 'Un authenticated user');
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select('+email')
      .exec();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const logoutController: RequestHandler = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.clearCookie('connect.sid');
      res.status(204).send();
    });
  } catch (err) {
    next(err);
  }
};
