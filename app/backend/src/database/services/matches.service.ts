// import ApiError from '../helpers/api-errors';
// import codes from '../helpers/statusCode';
import ApiError from '../helpers/api-errors';
import errorMessages from '../helpers/errorMessage';
import codes from '../helpers/statusCode';
import { IMatcher } from '../interfaces';
import { IMatcherAll, IMatchesQuery } from '../interfaces/IMatcher';
import MatchesModel from '../models/MatchesModel';
import TeamModel from '../models/TeamsModel';

class MatchesService {
  static async getAll(): Promise<IMatcherAll[]> {
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

  static async getByQuery(query: IMatchesQuery): Promise<IMatcherAll[]> {
    const Bool = query.inProgress as string;
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

  static async createMatches(match: IMatcher.IMatcher): Promise<IMatcher.IMatcher> {
    MatchesService.teamNotFound(match);
    const { dataValues } = await MatchesModel.create({ ...match, inProgress: true });
    const newMatch = await MatchesService.getById(dataValues.id) as IMatcher.IMatcher;
    return newMatch;
  }

  private static async teamNotFound(
    data: IMatcher.IMatcher,
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

  private static async getById(id: number): Promise<IMatcher.IMatcher> {
    const { dataValues } = await MatchesModel.findByPk(id) as IMatcher.IMatcherDataValues;
    if (!dataValues) throw new ApiError('Match not found', codes.NOT_FOUND);
    if (dataValues.inProgress !== true) {
      throw new ApiError('Match finished', codes.NOT_FOUND);
    }
    return dataValues;
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
