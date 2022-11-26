import { NextFunction, Request, Response } from 'express';
import ApiError from '../helpers/api-errors';
import codes from '../helpers/statusCode';
import { checkToken } from '../utils/jwtUtil';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { status, message } = checkToken(authorization);
  if (!status) {
    const messages = `${message}`;
    console.log('middleware de erro--->', messages);
    throw new ApiError(messages, codes.UNAUTHORIZED);
  }
  req.body = { data: req.body, message };
  next();
};

export default validateToken;
