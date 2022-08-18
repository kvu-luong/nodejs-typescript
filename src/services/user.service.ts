import { User } from '../type/user.type';
import { UserModel } from '../models/user.model';
import { hashPassword } from '../helpers/encryptPassword';

export const UserService = {
  createUser: async (input: User) => {
    try {
      const user = { ...input, password: await hashPassword(input.password), tokenVersion: 0 };
      return await UserModel.insertOne(user);
    } catch (e: any) {
      throw new Error(e);
    }
  },
  getUserByName: async (name: string) => {
    try {
      const user = await UserModel.findUserByName(name);
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getUserById: async (id: string) => {
    try {
      const user = await UserModel.getUserById(id);
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateTokenVersion: async (id: string) => {
    try {
      const isUpdateSuccess = await UserModel.updateTokenVersionById(id);
      return isUpdateSuccess;
    } catch (error: any) {
      return false;
    }
  },
};
