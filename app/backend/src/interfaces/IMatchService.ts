export default interface IMatchService<T>{
  list(): Promise<T[]>;
}
