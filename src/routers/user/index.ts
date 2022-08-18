import express from 'express';

const router = express.Router();
import { Request, Response } from 'express'; // type express

import { createUserHandler, loginControllerHandler } from '../../controller/user.controller';
import validateResource from '@middleware/validateResource';
import { UserRequestSchema, LoginRequestSchema } from '../../schema/user.schema';

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'user',
  });
});

router.post('/api/users', validateResource(UserRequestSchema), createUserHandler);
router.post('/api/login', validateResource(LoginRequestSchema), loginControllerHandler);
export default router;
