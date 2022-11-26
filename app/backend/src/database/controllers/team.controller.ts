import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAll(
    _req: Request,
    res: Response,
  ): Promise<Response> {
    const response = await TeamService.getAll();
    return res.status(200).json('cheguei');
  }
}
