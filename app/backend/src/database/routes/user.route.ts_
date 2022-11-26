import * as express from 'express';
import 'express-async-errors';
import UserController from '../controllers/user.controller';

const user = express.Router();

user.get(
  '/',
  (req: express.Request, res: express.Response) => UserController,
);

export default user;
