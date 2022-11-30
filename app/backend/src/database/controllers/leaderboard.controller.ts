import { Request, Response } from 'express';
import Leaderboards from '../services/leaderboard.service';

export const getHomeLeaderboard = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  const response = await Leaderboards.getHomeLeaderboard();
  return res.status(200).json(response);
};

export const getAwayLeaderboard = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  const response = await Leaderboards.getAwayLeaderboard();
  return res.status(200).json(response);
};
