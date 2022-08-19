import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: STRING,
    allowNull: false,
  } 
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Teams;
