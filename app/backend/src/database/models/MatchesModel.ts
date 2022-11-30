import { NUMBER, BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import { IMatcher } from '../interfaces';
import TeamModel from './TeamsModel';

class MatchesModel extends Model implements IMatcher.IMatcher {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: NUMBER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: NUMBER,
    allowNull: false,
  },
  awayTeam: {
    type: NUMBER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'matches',
  underscored: true,
});

TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
MatchesModel.belongsTo(TeamModel, { as: 'teamHome', foreignKey: 'homeTeam' });
MatchesModel.belongsTo(TeamModel, { as: 'teamAway', foreignKey: 'awayTeam' });

export default MatchesModel;
