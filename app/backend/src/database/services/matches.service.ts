// import ApiError from '../helpers/api-errors';
// import codes from '../helpers/statusCode';
import ApiError from '../helpers/api-errors';
import codes from '../helpers/statusCode';
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
    const { dataValues } = await MatchesModel.create({ ...match, inProgress: true });
    const newMatch = await MatchesModel.findByPk(dataValues.id);
    return newMatch?.dataValues;
  }

  static async updateMatches(id: number): Promise<void> {
    MatchesService.getById(id);
    const teste = await MatchesModel
      .update({ inProgress: false }, { where: { id } });
    console.log(teste);
  }

  private static async getById(id: number): Promise<void> {
    const checkId = await MatchesModel.findByPk(id);
    if (!checkId) throw new ApiError('Match not found', codes.NOT_FOUND);
  }
}

export default MatchesService;
