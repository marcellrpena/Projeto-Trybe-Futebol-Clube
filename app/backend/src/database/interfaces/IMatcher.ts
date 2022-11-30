export interface IMatcher {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface IMatcherAll extends IMatcher {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}

export interface IMatcherDataValues {
  dataValues: IMatcher,
}

export interface IMatchesQuery {
  id?: number;
  homeTeam?: number ;
  homeTeamGoals?: number;
  awayTeam?: number;
  awayTeamGoals?: number;
  inProgress?: string;
}
