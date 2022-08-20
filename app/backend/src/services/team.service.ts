import IService from '../interfaces/IService';
import Teams from '../database/models/team';

export default class TeamService implements IService<Teams> {
  private _teams: Teams[];

  get teams() {
    return this._teams;
  }

  async list(): Promise<Teams[]> {
    const teams = await Teams.findAll();
    this._teams = teams;
    return this._teams;
  }
}
