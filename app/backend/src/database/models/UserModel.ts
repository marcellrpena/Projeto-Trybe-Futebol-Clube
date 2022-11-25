import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare username: string;
  declare role: string;
}

User.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'users',
  underscored: true,
});

export default User;
