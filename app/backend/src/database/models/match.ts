import { INTEGER, Model, BOOLEAN } from 'sequelize';
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
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      primaryKey: true,
    },
    homeTeamGoals: {
      type: INTEGER,
    },
    awayTeam: {
      type: INTEGER,
      primaryKey: true,
    },
    awayTeamGoals: {
      type: INTEGER,
    },
    inProgress: {
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

Match.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

/* Match.belongsTo(Teams, { foreignKey: 'homeTeam' });
Match.belongsTo(Teams, { foreignKey: 'awayTeam' }); */

/* Teams.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' }); */

export default Match;
