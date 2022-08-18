import { Request, Response } from 'express';
import { logger } from '../helpers/logger';
import { ProductService } from '../services/product.service';
import { ResponseBuilder } from '../helpers/responseBuilder';
import { TProductRequest } from '../type/product.type';

export const createProductHandler = async (req: Request, res: Response) => {
  const responseInfos = new ResponseBuilder();
  try {
    const { name, quantity, description } = req.body as TProductRequest;
    const productParams = {
      name,
      quantity,
      description,
    };
    const result = await ProductService.createProduct(productParams);
    logger.info('Create Product Success!!! - ' + result.insertedId);

    responseInfos.setCode(200).setMessage('Success').setResult(result).build();
    return res.json(responseInfos);
  } catch (e: any) {
    responseInfos.setCode(400).setMessage(e.message).build();
    return res.json(responseInfos);
  }
};

export const listAllProductHandler = async (_req: Request, res: Response) => {
  const responseInfos = new ResponseBuilder();
  try {
    const products = await ProductService.getAllProduct();
    if (!products) return res.json(responseInfos.setCode(400).setMessage('No data found').build());

    return res.json(responseInfos.setCode(200).setMessage('Success').setResult(products).build());
  } catch (error: any) {
    return res.json(responseInfos.setCode(400).setMessage(error.message).build());
  }
};
