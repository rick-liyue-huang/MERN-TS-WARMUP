import mongoose, { InferSchemaType, Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    select: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

type UserType = InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model<UserType>('User', userSchema);
