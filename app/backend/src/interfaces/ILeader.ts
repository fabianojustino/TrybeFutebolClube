export default interface ILeader<T> {
  list(): Promise<T[] | unknown | undefined>;
}
