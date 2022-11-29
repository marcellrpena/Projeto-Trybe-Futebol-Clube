export default interface IMatcher {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: {
    teamName: string,
  },
  teamAway?: {
    teamName: string,
  }
}

export interface IMatchesQuery {
  id?: number;
  homeTeam?: number ;
  homeTeamGoals?: number;
  awayTeam?: number;
  awayTeamGoals?: number;
  inProgress?: string;
}
