import { getDb } from '../helpers/dbConnect';
import { ModelName } from '../utils/constant';
import { User } from '../type/user.type';
import { ObjectId } from 'mongodb';

// create database,
// update
// delete
export const UserModel = {
  insertOne: async (user: User) => {
    try {
      let db = await getDb();
      let data = db.collection<User>(ModelName.user).insertOne(user);
      return {
        ...user,
        insertedId: (await data).insertedId,
      };
    } catch (e: any) {
      throw new Error(e.message);
    }
  },

  findUserByName: async (name: string) => {
    try {
      let db = await getDb();
      let user = db.collection<User>(ModelName.user).findOne({ name });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  updateTokenVersionById: async (_id: string): Promise<Boolean> => {
    try {
      let db = await getDb();
      const filter = { _id: new ObjectId(_id) };
      const update = { $inc: { tokenVersion: 1 } };
      let result = await db.collection(ModelName.user).updateOne(filter, update);
      if (result.modifiedCount) return true;
      return false;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getUserById: async (_id: string) => {
    const db = await getDb();
    return await db.collection<User>(ModelName.user).findOne({ _id: new ObjectId(_id) });
  },
};
