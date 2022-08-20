import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Teams from './team';

class Match extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
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
  },
  {
    sequelize: db,
    modelName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Match.hasMany(Teams, { foreignKey: 'home_team', as: 'homeTeam' });
Match.hasMany(Teams, { foreignKey: 'away_team', as: 'awayTeam' });

export default Match;
