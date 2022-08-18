import express from 'express';
const router = express.Router();
import { Request, Response } from 'express'; // type express
import AuthenMidleware from '../../middleware/validateToken';
import { createUserHandler, loginControllerHandler } from '../../controller/user.controller';
import validateResource from '@middleware/validateResource';
import { UserRequestSchema, LoginRequestSchema } from '../../schema/user.schema';

router.get('/', [AuthenMidleware], (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'product',
  });
});

router.post('/single_product', validateResource(UserRequestSchema), createUserHandler);
router.get('/products', validateResource(LoginRequestSchema), loginControllerHandler);
export default router;
