export default interface IService<T>{
  list(): Promise<T[]>;
  getById(id: number): Promise<T | null>
}
