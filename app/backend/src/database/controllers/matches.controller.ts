import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async getAll(
    _req: Request,
    res: Response,
  ): Promise<Response> {
    const response = await MatchesService.getAll();
    return res.status(200).json(response);
  }
  // static async getById(
  //   req: Request,
  //   res: Response,
  // ): Promise<Response> {
  //   const { id } = req.params;
  //   const response = await .getById(Number(id));
  //   return res.status(200).json(response);
  // }
}
