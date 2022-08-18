import express, { Express } from 'express';
import 'module-alias/register';
import { logger } from './helpers/logger';
import routes from './routers';
require('dotenv').config();

const app: Express = express();
app.use(express.json());

const port = process.env['PORT'];

app.listen(port, async () => {
  logger.info(`App is running at port: ${port}`);
  routes(app);
});
