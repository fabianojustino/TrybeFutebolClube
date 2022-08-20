export default interface IUserService<T> {
  list(): Promise<T[]>;
}
