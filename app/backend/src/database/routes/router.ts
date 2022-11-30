import * as express from 'express';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import leaderboard from './leaderboard.router';
import login from './login.route';
import matches from './matches.route';
import team from './team.route';
// import user from './user.route.ts_';

const routes = express.Router();

routes.use('/login', login);

routes.use('/teams', team);

routes.use('/matches', matches);

routes.use('/leaderboard', leaderboard);
// routes.use('/user', user);
routes.use(errorsMiddleware);

export default routes;
