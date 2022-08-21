import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Jwt from '../auth/Jwt';
import Match from '../database/models/match';
import IMatchService from '../interfaces/IMatchService';

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
    const match = await this.matchServ.create(req.body, true);
    res.status(StatusCodes.CREATED).json(match);
  }
}
