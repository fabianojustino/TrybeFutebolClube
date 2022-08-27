export default interface ILeader<T> {
  list(team: string): Promise<T[] | unknown | undefined>;
}
