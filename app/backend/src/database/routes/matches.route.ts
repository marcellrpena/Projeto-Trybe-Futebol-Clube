import * as express from 'express';
import 'express-async-errors';
import MatchesController from '../controllers/matches.controller';

// import validateToken from '../middlewares/auth.middleware';

const matches = express.Router();

matches.get('/', (
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => MatchesController.getAll(_req, res));

/* team.get('/:id', (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => (req, res)); */

export default matches;
