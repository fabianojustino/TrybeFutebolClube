import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import LeaderService from '../services/leader.service';
import ILeader from '../interfaces/ILeader';
import Match from '../database/models/match';

export default class LeaderController {
  constructor(private leaderServ: ILeader<Match>) {
    this.leaderServ = new LeaderService();
  }

  async list(req: Request, res: Response) {
    const teams = await this.leaderServ.list(req.path);
    res.status(StatusCodes.OK).json(teams);
  }
}
