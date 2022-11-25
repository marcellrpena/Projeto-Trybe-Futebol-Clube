import * as express from 'express';
import 'express-async-errors';
import LoginController from '../controllers/login.controller';
import loginValidate from '../middlewares/LoginValidate';

const login = express.Router();

login.post(
  '/',
  loginValidate,
  (req: express.Request, res: express.Response) => LoginController.login(req, res),
);

export default login;
