interface IToken {
  token?: string
}

interface IAuthService extends IToken{
  email: string | undefined ,
  password: string | undefined,
  passwordDb?: string | undefined,
}

 interface IUser extends IAuthService{
  id?: number,
  username: string,
  role?: string,  
}

 interface ILogin {
  login(credential:IUser): Promise<string>
}

export { IAuthService, IUser, ILogin, IToken }