// import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../services/validations/joiSchemas';

class LoginValidate {
  static validateBody(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | NextFunction | undefined {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  }
}

export default LoginValidate;

// LoginService.login({
//   email: 'admin@admin.com',
//   password: 'secret_admin',
// }).then((res) => console.log(res));
