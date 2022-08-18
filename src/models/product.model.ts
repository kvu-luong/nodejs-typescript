import { getDb } from '../helpers/dbConnect';
import { ModelName } from '../utils/constant';
import { TProductRequest } from '../type/product.type';

export const ProductModel = {
  insertOne: async (product: TProductRequest) => {
    try {
      let db = await getDb();
      const filter = { name: product.name };
      const update = { $set: product };
      let data = await db
        .collection<TProductRequest>(ModelName.product)
        .findOneAndUpdate(filter, update, { upsert: true });
      console.log(data, 'product');
      return {
        ...product,
        insertedId: data.value?._id || data.lastErrorObject?.['upserted'],
      };
    } catch (e: any) {
      throw new Error(e.message);
    }
  },

  findAll: async () => {
    const db = await getDb();
    return await db.collection<TProductRequest[]>(ModelName.user).find().toArray();
  },
};
