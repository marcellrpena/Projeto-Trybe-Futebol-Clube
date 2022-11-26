import { ITeam } from '../interfaces';
import TeamModel from '../models/TeamsModel';

class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const response = (
      await TeamModel.findAll()).map(({ dataValues }) => dataValues);
    return response;
  }
}

export default TeamService;
