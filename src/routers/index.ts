import { Express, Request, Response } from 'express';
import 'module-alias/register';
import UserRouter from './user';
import ProductRouter from './product';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'health check ok',
    });
  });
  app.use('/', UserRouter);
  app.use('/api/product', ProductRouter);
}

export default routes;
