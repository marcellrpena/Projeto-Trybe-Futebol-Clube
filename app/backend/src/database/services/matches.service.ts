import ApiError from '../helpers/api-errors';
import codes from '../helpers/statusCode';
import { IMatcher } from '../interfaces';
import MatchesModel from '../models/MatchesModel';
import TeamModel from '../models/TeamsModel';

class MatchesService {
  static async getAll(): Promise<IMatcher[]> {
    const response = (await MatchesModel.findAll({
      include: [
        {
          model: TeamModel, as: 'teamAway', attributes: ['teamName'],
        },
        {
          model: TeamModel, as: 'teamHome', attributes: ['teamName'],
        },
      ],
    })).map(({ dataValues }) => dataValues);
    return response;
  }

  static async getById(id: number): Promise<IMatcher> {
    const response = await MatchesModel.findByPk(id);
    if (!response) throw new ApiError('team not found', codes.NOT_FOUND);
    return response.dataValues;
  }
}

export default MatchesService;
