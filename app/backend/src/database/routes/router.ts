import * as express from 'express';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import login from './login.route';
import user from './user.route';

const routes = express.Router();

routes.use('/login', login);
routes.use('/login/validate', login);
routes.use('/user', user);
routes.use(errorsMiddleware);

export default routes;
