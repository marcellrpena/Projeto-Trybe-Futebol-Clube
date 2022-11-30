import * as express from 'express';
import 'express-async-errors';
import * as LeaderboardController from '../controllers/leaderboard.controller';
// import validateToken from '../middlewares/auth.middleware';
// import { equalTeams, teamNotFound } from '../middlewares/matchesValidate';

// import validateToken from '../middlewares/auth.middleware';

const leaderboard = express.Router();

leaderboard.get('/home', LeaderboardController.getHomeLeaderboard);
leaderboard.get('/away', LeaderboardController.getAwayLeaderboard);

export default leaderboard;
