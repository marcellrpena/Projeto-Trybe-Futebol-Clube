import * as express from 'express';
import LoginController from '../controllers/login.controller';
import LoginValidate from '../middlewares/LoginValidate';

const login = express.Router();

login.post(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => (
    LoginValidate.validateBody(req, res, next)
  ),
  (req: express.Request, res: express.Response) => LoginController.login(req, res),
);

export default login;
