import { Op } from 'sequelize';
import Teams from '../database/models/team';
import Matches from '../database/models/match';
import IMatchService from '../interfaces/IMatch';
import IMatchProps from '../interfaces/IMatchProps';

export default class MatchService implements IMatchService<Matches> {
  private _matches: Matches[];
  private _match: Matches;
  private _itUpdate: boolean;

  get itUpdate() {
    return this._itUpdate;
  }

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

  async checkTeam(homeTeam: number, awayTeam: number): Promise<boolean> {
    const { count } = await Matches.findAndCountAll({
      where: { id: { [Op.in]: [homeTeam, awayTeam] } },
    });

    if (homeTeam === awayTeam) {
      const e = new Error(
        'It is not possible to create a match with two equal teams',
      );
      e.name = 'UnauthorizedError';
      throw e;
    }

    if (count !== 2) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFoundError';
      throw e;
    }

    this._itUpdate = true;
    return this._itUpdate;
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

  async finished(id: number, status: boolean): Promise<true> {
    const result = await Matches.update(
      { inProgress: status },
      { where: { id } },
    );

    if (!result) {
      throw new Error('Não foi possível alterar o status da partida');
    }

    this._itUpdate = true;
    return this._itUpdate;
  }

  async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<true> {
    const result = await Matches.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );

    if (!result) {
      throw new Error('Não foi possível alterar o status da partida');
    }

    this._itUpdate = true;
    return this._itUpdate;
  }
}
