import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import IService from '../interfaces/IService';

import TeamService from '../services/team.service';
import Teams from '../database/models/team';

export default class AuthController {
  constructor(private teamServ: IService<Teams>) {
    this.teamServ = new TeamService();
  }

  async list(_req: Request, res: Response) {
    const teams = await this.teamServ.list();
    res.status(StatusCodes.OK).json(teams);
  }

  async getById(req: Request, res: Response) {
    const team = await this.teamServ.getById(Number(req.params.id));
    res.status(StatusCodes.OK).json(team);
  }
}
