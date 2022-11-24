import * as express from 'express';
import LoginController from '../controllers/login.controller';

const login = express.Router();

login.post('/', (req: express.Request, res: express.Response) => LoginController.login(req, res));

export default login;
