import { NextFunction, Request, Response } from 'express';
import ApiError from '../helpers/api-errors';
import errorMessages from '../helpers/errorMessage';
import codes from '../helpers/statusCode';
import TeamModel from '../models/TeamsModel';

export const equalTeams = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { homeTeam, awayTeam } = req.body.data;
  if (homeTeam === awayTeam) {
    throw new ApiError(errorMessages.equalTeams, codes.UNPROCESSABLE_ENTITY);
  }
  return next();
};

export const teamNotFound = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { homeTeam, awayTeam } = req.body.data;
  const searchHome = await TeamModel.findByPk(homeTeam);
  const searchAway = await TeamModel.findByPk(awayTeam);
  if (!searchHome || !searchAway) {
    throw new ApiError(errorMessages.teamNotFound, codes.NOT_FOUND);
  }
  return next();
};
