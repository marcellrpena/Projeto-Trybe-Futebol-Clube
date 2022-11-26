import * as express from 'express';
import 'express-async-errors';
import LoginController from '../controllers/login.controller';
import validateToken from '../middlewares/auth.middleware';
import loginValidate from '../middlewares/LoginValidate';

const login = express.Router();

login.post(
  '/',
  loginValidate,
  (req: express.Request, res: express.Response) => LoginController.login(req, res),
);
login.get('/validate', validateToken, (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => LoginController.validate(req, res, next));

export default login;
