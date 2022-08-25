export default interface IMatchService<T> {
  list(): Promise<T[]>;
  create(props: any, inProgress: boolean): Promise<T>;
  finished(id: number, inProgress: boolean): Promise<boolean>;
  update(id: number, homeTeamGolas: number, awayTeamGoals: number): Promise<boolean>;
  checkTeam(team1: number, team2: number): Promise<boolean>;
}
