import { ProductModel } from '../models/product.model';
import { TProductRequest } from '../type/product.type';

export const ProductService = {
  createProduct: async (input: TProductRequest) => {
    try {
      const product = { ...input };
      return await ProductModel.insertOne(product);
    } catch (e: any) {
      throw new Error(e);
    }
  },
  getAllProduct: async () => {
    try {
      const user = await ProductModel.findAll();
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
