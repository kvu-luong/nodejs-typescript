import { ObjectId } from 'mongodb';

export type TProductRequest = {
  _id?: string | ObjectId;
  name: string;
  quantity: number;
  description?: string | undefined;
};

export type TListProduct = TProductRequest[];
