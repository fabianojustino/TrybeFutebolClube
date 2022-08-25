import { JwtPayload } from 'jsonwebtoken';
import User from '../database/models/user';
import { ILogin, IAuthService, IUser } from '../interfaces/IAuth';
import passwordService from './passwordService';
import Jwt from '../auth/Jwt';
import validate from '../validations';

export default class AuthService implements ILogin {
  private _token: string;
  private _role: string | JwtPayload | null;

  get token() {
    return this._token;
  }

  get role() {
    return this._role;
  }

  constructor() {
    this._role = '';
  }

  async login(body: IAuthService) {
    validate.validateLogin(body);
    const { email, password } = body;
    const userOne = await User.findOne({ where: { email } });

    if (!userOne) {
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const { password: passwordDb, role } = userOne as IUser;

    // VERIFICA SE A SENHA INFORMADA É IGUAL A SENHA CODIFICADA SALVA DO BANCO
    passwordService.checkPassword({ password, passwordDb });

    // GERA UM TOKEN
    const token = Jwt.createToken({
      role,
      email,
      password,
    });

    this._token = token;
  }

  getUserRole(token: string) {
    const { role } = Jwt.validateToken(token);
    this._role = role;
  }
}
