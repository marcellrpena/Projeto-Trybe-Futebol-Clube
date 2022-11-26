import * as express from 'express';
import IApiError from '../interfaces/IApiError';

const errorsMiddleware = (
  error: IApiError,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
): express.Response => res.status(error.status || 500).json({ message: error.message });

export default errorsMiddleware;
