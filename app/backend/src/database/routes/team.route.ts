import * as express from 'express';
import 'express-async-errors';
import TeamController from '../controllers/team.controller';
// import validateToken from '../middlewares/auth.middleware';

const team = express.Router();

team.get('/', (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => TeamController.getAll(req, res));

team.get('/:id', (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => TeamController.getById(req, res));

export default team;
