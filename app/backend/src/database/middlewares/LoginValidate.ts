import { NextFunction, Request, Response } from 'express';
import codes from '../helpers/statusCode';
import { loginSchema } from '../services/validations/joiSchemas';

const loginValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | NextFunction | undefined => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    if (error.message === 'All fields must be filled') {
      return res.status(codes.BADREQUEST).json({ message: error.message });
    }
    if (error.message === 'Incorrect email or password') {
      return res.status(codes.UNAUTHORIZED).json({ message: error.message });
    }
  }
  next();
};

export default loginValidate;
