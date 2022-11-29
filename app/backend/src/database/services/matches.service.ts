// import ApiError from '../helpers/api-errors';
// import codes from '../helpers/statusCode';
import ApiError from '../helpers/api-errors';
import errorMessages from '../helpers/errorMessage';
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
    MatchesService.teamNotFound(match);
    const { dataValues } = await MatchesModel.create({ ...match, inProgress: true });
    const newMatch = await MatchesModel.findByPk(dataValues.id);
    return newMatch?.dataValues;
  }

  private static async teamNotFound(
    data: IMatcher,
  ): Promise<void> {
    const { homeTeam, awayTeam } = data;
    const searchHome = await TeamModel.findByPk(homeTeam);
    const searchAway = await TeamModel.findByPk(awayTeam);
    if (!searchHome || !searchAway) {
      throw new ApiError(errorMessages.teamNotFound, codes.NOT_FOUND);
    }
  }

  static async updateMatchesProgress(id: number): Promise<void> {
    MatchesService.getById(id);
    await MatchesModel
      .update({ inProgress: false }, { where: { id } });
  }

  private static async getById(id: number): Promise<void> {
    const checkId = await MatchesModel.findByPk(id);
    if (!checkId) throw new ApiError('Match not found', codes.NOT_FOUND);
    if (checkId.dataValues.inProgress !== true) {
      throw new ApiError('Match finished', codes.NOT_FOUND);
    }
  }

  static async updateMatchesResults(id: number, data: IMatchesQuery): Promise<void> {
    MatchesService.getById(id);
    const { homeTeamGoals, awayTeamGoals } = data;
    await MatchesModel
      .update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
  }
}

export default MatchesService;
