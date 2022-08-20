import IService from '../interfaces/IService';
import Teams from '../database/models/team';

export default class TeamService implements IService<Teams> {
  private _team: Teams | null;
  private _teams: Teams[];

  get teams() {
    return this._teams;
  }

  get team() {
    return this._team;
  }

  async list(): Promise<Teams[]> {
    const teams = await Teams.findAll();
    this._teams = teams;
    return this._teams;
  }

  async getById(id: number): Promise<Teams | null> {
    const team = await Teams.findByPk(id);
    this._team = team;
    return this._team;
  }
}
