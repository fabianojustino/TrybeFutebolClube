import Teams from '../database/models/team';
import Matches from '../database/models/match';
import IMatchService from '../interfaces/IMatchService';

export default class MatchService implements IMatchService<Matches> {
  private _matches: Matches[];

  get matches() {
    return this._matches;
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
}
