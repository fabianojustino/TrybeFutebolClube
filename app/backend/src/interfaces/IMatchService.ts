export default interface IMatchService<T> {
  list(): Promise<T[]>;
  create(props: any, inProgress: boolean): Promise<T>;
  update(id: number, inProgress: boolean): Promise<boolean>;
  checkTeam(team1: number, team: number): Promise<boolean>;
}
