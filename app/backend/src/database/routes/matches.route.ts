import * as express from 'express';
import 'express-async-errors';
import * as MatchesController from '../controllers/matches.controller';
import validateToken from '../middlewares/auth.middleware';

// import validateToken from '../middlewares/auth.middleware';

const matches = express.Router();

matches.get('/', MatchesController.getByQuery, MatchesController.getAll);
matches.post('/', validateToken, MatchesController.createMatch);

export default matches;
