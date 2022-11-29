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
    console.log(Bool);
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

  static async createMatches(match: IMatcher): Promise<IMatcher> {
    // console.log(match);
    const { dataValues } = await MatchesModel.create({ ...match, inProgress: true });
    const newMatch = await MatchesModel.findByPk(dataValues.id);
    return newMatch?.dataValues;
  }
}

export default MatchesService;
