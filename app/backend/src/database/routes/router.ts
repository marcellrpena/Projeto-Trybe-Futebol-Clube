import * as express from 'express';
import login from './login.route';

const routes = express.Router();

routes.use('/login', login);

export default routes;
