import * as express from 'express';
import 'express-async-errors';
import * as MatchesController from '../controllers/matches.controller';
import validateToken from '../middlewares/auth.middleware';
import { equalTeams, teamNotFound } from '../middlewares/matchesValidate';

// import validateToken from '../middlewares/auth.middleware';

const matches = express.Router();

matches.get('/', MatchesController.getByQuery, MatchesController.getAll);
matches.post('/', validateToken, equalTeams, teamNotFound, MatchesController.createMatch);
matches.patch('/:id/finish', validateToken, MatchesController.matchUpdateProgress);
matches.patch('/:id', validateToken, MatchesController.matchUpdateResults);

export default matches;
