import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import { ITeam } from '../interfaces';

class TeamModel extends Model implements ITeam {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'teams',
  underscored: true,
});

export default TeamModel;
