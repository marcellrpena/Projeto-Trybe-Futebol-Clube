import { ILBoard } from '../interfaces';
import MatchesModel from '../models/MatchesModel';
import TeamModel from '../models/TeamsModel';

export default class Leaderboards {
  private static teamPoints: number;
  private static goalsFavorTeam: number;
  private static goalsOwnTeam: number;

  private static async leaderboard(team: string): Promise<ILBoard.IFullLeaderboard[]> {
    const attrbMatches = team === 'home' ? ['home', 'away'] : ['away', 'home'];
    const response = await TeamModel.findAll({
      include: [{
        model: MatchesModel,
        as: `${team}TeamMatches`,
        attributes: [`${attrbMatches[0]}_team_goals`, `${attrbMatches[1]}_team_goals`],
        where: { inProgress: false },
      },
      ],
      attributes: [['team_name', 'name']],
    });
    // abaixo é usado o metodo .get({ plain: true}) com isso agrupo as partidas em objetos por nome do time principal
    return response.map((teste) => teste.get({ plain: true }));
  }

  private static async FullLeaderboard(): Promise<ILBoard.IFullLeaderboard[]> {
    const response = await TeamModel.findAll({
      include: [{
        model: MatchesModel,
        as: 'homeTeamMatches',
        attributes: ['home_team_goals', 'away_team_goals'],
        where: { inProgress: false },
      },
      {
        model: MatchesModel,
        as: 'awayTeamMatches',
        attributes: ['away_team_goals', 'home_team_goals'],
        where: { inProgress: false },
      },
      ],
      attributes: [['team_name', 'name']],
    });
    // abaixo é usado o metodo .get({ plain: true}) com isso agrupo as partidas em objetos por nome do time principal
    return response.map((teste) => teste.get({ plain: true }));
  }

  /* metodo genérico que cria desde um Leaderboard geral com partidas dentro  e
     fora de casa e um leaderboard específico para os tipos de partida a
     escolha */

  private static createLeaderboard(team: ILBoard.IMatchGoals[], name: string) {
    return {
      name,
      totalPoints: Leaderboards.totPoints(team),
      totalGames: team.length,
      totalVictories: Leaderboards.totVictories(team),
      totalDraws: Leaderboards.totDraws(team),
      totalLosses: Leaderboards.totLosses(team),
      goalsFavor: Leaderboards.goalsFavor(team),
      goalsOwn: Leaderboards.goalsOwn(team),
      goalsBalance: Leaderboards.goalsFavorTeam - Leaderboards.goalsOwnTeam,
      efficiency: Leaderboards.efficiencyTeam(team),
    };
  }

  static async getHomeLeaderboard(): Promise<ILBoard.ILeaderboard[]> {
    const dataTeams = await Leaderboards.leaderboard('home');
    const homeLeaderboard = dataTeams
      .map(({ name, homeTeamMatches }) => Leaderboards.createLeaderboard(homeTeamMatches, name));
    return Leaderboards.orderTable(homeLeaderboard);
  }

  static async getAwayLeaderboard(): Promise<ILBoard.ILeaderboard[]> {
    const dataTeams = await Leaderboards.leaderboard('away');
    const awayLeaderboard = dataTeams
      .map(({ name, awayTeamMatches }) => Leaderboards.createLeaderboard(awayTeamMatches, name));
    return Leaderboards.orderTable(awayLeaderboard);
  }

  /* com os métodos todos genéricos a única diferença do getter geral abaixo
     para os específicos é que a busca do sequelize com o metodo FullLeaderboard
     mais acima foi feita para times fora e de casa evitando fazer duas chamadas
     assincronas, de resto foi feita apenas a junção das chaves de matches do
     array geral,economizando assim uma chamada assincrona.
      */
  static async getFullLeaderbord(): Promise<ILBoard.ILeaderboard[]> {
    const dataTeams = await Leaderboards.FullLeaderboard();
    const newDataTeams = dataTeams.map(({ name, homeTeamMatches, awayTeamMatches }) => ({
      name,
      teamMatches: [...homeTeamMatches, ...awayTeamMatches],
    }));
    const fullLeaderboard = newDataTeams
      .map(({ name, teamMatches }) => Leaderboards.createLeaderboard(teamMatches, name));
    return Leaderboards.orderTable(fullLeaderboard);
  }

  /* A ordenação da tabela foi dividida em duas etapas */

  private static orderTable(
    leaderboard: ILBoard.ILeaderboard[],
  ): ILBoard.ILeaderboard[] {
    return leaderboard.sort((a, b) => {
      const totPoints = a.totalPoints === b.totalPoints;
      const totVictories = a.totalVictories === b.totalVictories;
      if (totPoints) {
        if (totVictories) return Leaderboards.secondOrder(a, b);
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
  }

  private static secondOrder(
    a: ILBoard.ILeaderboard,
    b: ILBoard.ILeaderboard,
  ): number {
    const goalsBalance = a.goalsBalance === b.goalsBalance;
    const goalsFavor = a.goalsFavor === b.goalsFavor;
    if (goalsBalance) {
      if (goalsFavor) return b.goalsOwn - a.goalsOwn;
      return b.goalsFavor - a.goalsFavor;
    }
    return b.goalsBalance - a.goalsBalance;
  }

  /* todos os metodos abaixo foram feitos para serem genéricos sem a necessidade
  de alterações, ou seja, foram feitas modificações minimas nos getters de tabela
  para se adaptarem aos metodos abaixo */

  private static totPoints(matches: ILBoard.IMatchGoals[]): number {
    const points = matches.reduce((acc, curr) => {
      if (Object.values(curr)[0] < Object.values(curr)[1]) {
        return acc;
      }
      const sum = Object.values(curr)[0] > Object.values(curr)[1] ? 3 : 1;
      return acc + sum;
    }, 0);
    Leaderboards.teamPoints = points;
    return points;
  }

  private static totVictories(matches: ILBoard.IMatchGoals[]): number {
    const victories = matches.reduce((acc, curr) => {
      const sum = Object.values(curr)[0] > Object.values(curr)[1] ? 1 : 0;
      return acc + sum;
    }, 0);
    return victories;
  }

  private static totDraws(matches: ILBoard.IMatchGoals[]): number {
    const draws = matches.reduce((acc, curr) => {
      const sum = Object.values(curr)[0] === Object.values(curr)[1] ? 1 : 0;
      return acc + sum;
    }, 0);
    return draws;
  }

  private static totLosses(matches: ILBoard.IMatchGoals[]): number {
    const losses = matches.reduce((acc, curr) => {
      const sum = Object.values(curr)[0] < Object.values(curr)[1] ? 1 : 0;
      return acc + sum;
    }, 0);
    return losses;
  }

  private static goalsFavor(matches: ILBoard.IMatchGoals[]): number {
    const favor = matches.reduce((acc, curr) => acc + Object.values(curr)[0], 0);
    Leaderboards.goalsFavorTeam = favor;
    return favor;
  }

  private static goalsOwn(matches: ILBoard.IMatchGoals[]): number {
    const own = matches.reduce((acc, curr) => acc + Object.values(curr)[1], 0);
    Leaderboards.goalsOwnTeam = own;
    return own;
  }

  private static efficiencyTeam(matches: ILBoard.IMatchGoals[]): number {
    const points = Leaderboards.teamPoints;
    const games = matches.length;
    return parseFloat(((points / (games * 3)) * 100).toFixed(2));
  }
}
