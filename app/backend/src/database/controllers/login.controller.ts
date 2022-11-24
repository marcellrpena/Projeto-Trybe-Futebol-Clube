import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const parametros = req.body;
      const response = await LoginService.login(parametros);
      return res.status(response.status).json(response.message);
    } catch (error) {
      const Err = error;
      return res.status(404).json(Err);
    }
  }
}

export default LoginController;
