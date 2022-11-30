export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IHomeLeaderboard extends ILeaderboard {
  homeTeamMatches: IMatchGoals[],
}

export interface IAwayleaderboard extends ILeaderboard {
  awayTeamMatches: IMatchGoals[],
}

export interface IFullLeaderboard extends IHomeLeaderboard {
  awayTeamMatches: IMatchGoals[],
}

export interface ILeaderboardDataValues {
  dataValues: IFullLeaderboard;
}
