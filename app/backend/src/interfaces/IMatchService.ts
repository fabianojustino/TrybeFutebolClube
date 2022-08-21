export default interface IMatchService<T>{
  list(): Promise<T[]>,
  create(props: any, inProgress: boolean): Promise<T>,
}
