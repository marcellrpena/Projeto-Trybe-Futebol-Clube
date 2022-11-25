import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  static async login(req: Request, res: Response): Promise<Response> {
    const parametros = req.body;
    const response = await LoginService.login(parametros);
    return res.status(response.status).json(response.message);
  }
}

export default LoginController;
