import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Jwt from '../auth/Jwt';
import Match from '../database/models/match';
import IMatchService from '../interfaces/IMatch';

import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchServ: IMatchService<Match>) {
    this.matchServ = new MatchService();
  }

  async list(_req: Request, res: Response) {
    const matches = await this.matchServ.list();
    res.status(StatusCodes.OK).json(matches);
  }

  async create(req: Request, res: Response) {
    const token = req.headers.authorization;

    Jwt.validateToken(token || '');

    await this.matchServ.checkTeam(req.body.homeTeam, req.body.awayTeam);

    const match = await this.matchServ.create(req.body, true);
    res.status(StatusCodes.CREATED).json(match);
  }

  async finished(req: Request, res: Response) {
    // const token = req.headers.authorization;
    const { id } = req.params;
    // Jwt.validateToken(token || '');
    await this.matchServ.finished(Number(id), false);
    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchServ.update(Number(id), homeTeamGoals, awayTeamGoals);
    res
      .status(StatusCodes.OK)
      .json({ message: 'Partida atualizada com sucesso !' });
  }
}
