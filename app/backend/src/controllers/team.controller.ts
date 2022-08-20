import { Response, Request } from 'express';
import { ITeam } from '../interfaces/ITeam.Service';
import { StatusCodes } from 'http-status-codes';
import IService from '../interfaces/IService';

import TeamService from '../services/team.service';

export default class AuthController {
  constructor(private teamServ: IService<ITeam>) {
    this.teamServ = new TeamService();
  }

  async list(_req: Request, res: Response) {
    const teams = await this.teamServ.list();
    res.status(StatusCodes.OK).json(teams);
  }
}
