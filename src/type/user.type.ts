import { ObjectId } from 'mongodb';

export type User = {
  _id?: string | ObjectId;
  name: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  tokenVersion?: number;
};
