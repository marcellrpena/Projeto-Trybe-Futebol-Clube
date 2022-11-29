import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export const getAll = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  const response = await MatchesService.getAll();
  return res.status(200).json(response);
};

export const getByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (Object.keys(req.query).length === 0) return next();
  const response = await MatchesService.getByQuery(req.query);
  return res.status(200).json(response);
};

export const createMatch = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { data } = req.body;
  const response = await MatchesService.createMatches(data);
  return res.status(201).json(response);
};

export const matchUpdateProgress = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  await MatchesService.updateMatchesProgress(Number(id));
  return res.status(200).json({ message: 'Finished' });
};

export const matchUpdateResults = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { data } = req.body;
  await MatchesService.updateMatchesResults(Number(id), data);
  return res.status(200).json({ message: 'Done' });
};
