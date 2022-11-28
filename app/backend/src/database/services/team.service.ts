import ApiError from '../helpers/api-errors';
import codes from '../helpers/statusCode';
import { ITeam } from '../interfaces';
import TeamModel from '../models/TeamsModel';

class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const response = (
      await TeamModel.findAll()).map(({ dataValues }) => dataValues);
    return response;
  }

  static async getById(id: number): Promise<ITeam> {
    const response = await TeamModel.findByPk(id);
    if (!response) throw new ApiError('team not found', codes.NOT_FOUND);
    return response.dataValues;
  }
}

export default TeamService;
