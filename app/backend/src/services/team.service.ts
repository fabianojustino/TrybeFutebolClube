import IService from '../interfaces/IService';
import Teams from '../database/models/team';

export default class TeamService implements IService<Teams> {

  async list(): Promise<Teams[]> {    
    const teams = await Teams.findAll();  
    return teams;
  }
}
