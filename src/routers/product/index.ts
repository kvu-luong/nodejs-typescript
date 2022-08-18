import express from 'express';
const router = express.Router();
import { Request, Response } from 'express'; // type express
import AuthenMidleware from '../../middleware/validateToken';
import { createProductHandler, listAllProductHandler } from '../../controller/product.controller';
import validateResource from '@middleware/validateResource';
import { SingleProductSchema, ListProductSchema } from '../../schema/product.schema';

router.get('/', [AuthenMidleware], (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'product',
  });
});

router.post('/single_product', [AuthenMidleware, validateResource(SingleProductSchema)], createProductHandler);
router.get('/list', [AuthenMidleware, validateResource(ListProductSchema)], listAllProductHandler);
export default router;
