// import ApiError from '../helpers/api-errors';
// import codes from '../helpers/statusCode';
import { IMatcher } from '../interfaces';
import { IMatchesQuery } from '../interfaces/IMatcher';
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

  static async getByQuery(query: IMatchesQuery): Promise<IMatcher[]> {
    const Bool = query.inProgress || '';
    const inProgress = Bool.toLowerCase() === 'true';
    const response = (await MatchesModel.findAll({
      include: [
        {
          model: TeamModel, as: 'teamAway', attributes: ['teamName'],
        },
        {
          model: TeamModel, as: 'teamHome', attributes: ['teamName'],
        },
      ],
      where: { inProgress },
    })).map(({ dataValues }) => dataValues);
    return response;
  }
}
export default MatchesService;
