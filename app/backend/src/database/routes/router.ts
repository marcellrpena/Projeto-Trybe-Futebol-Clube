import * as express from 'express';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import login from './login.route';

const routes = express.Router();

routes.use('/login', login);

routes.use(errorsMiddleware);

export default routes;
