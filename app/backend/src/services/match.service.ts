import Teams from '../database/models/team';
import Matches from '../database/models/match';
import IMatchService from '../interfaces/IMatchService';
import IMatchProps from '../interfaces/IMatchProps';

export default class MatchService implements IMatchService<Matches> {
  private _matches: Matches[];
  private _match: Matches;

  get matches() {
    return this._matches;
  }

  get match() {
    return this._match;
  }

  async list(): Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id', 'home_team'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id', 'away_team'] },
        },
      ],
    });
    this._matches = matches;
    return this._matches;
  }

  async create(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatchProps,
    inProgress: boolean,
  ): Promise<Matches> {
    const match: Matches = await Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    this._match = match;
    return this._match;
  }
}
