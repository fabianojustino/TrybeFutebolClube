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

// Teams.hasMany(Match, { foreignKey: 'home_team', as: 'teamHome' });
// Teams.hasMany(Match, { foreignKey: 'away_team', as: 'teamAway' });

export default Match;
