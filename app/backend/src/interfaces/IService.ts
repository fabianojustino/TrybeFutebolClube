export default interface IService<T>{
  list(): Promise<T[]>;
}
