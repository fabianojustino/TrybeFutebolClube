import User from '../database/models/user';
import { ILogin, IAuthService } from '../interfaces/IAuth.User.Service';
import { passwordService } from '../services/passwordService'
import Jwt from '../auth/Jwt'
import * as validate from '../validations'
import { JwtPayload } from 'jsonwebtoken';

export default class AuthService implements ILogin {
   
  async login(body: IAuthService): Promise<string> {    
    
    validate.validateLogin(body);    
    const {email, password} = body;    
    const userOne = await User.findOne({ where: { email }});
    
    if(!userOne){
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const { password: passwordDb, role } = userOne as any    

    // VERIFICA SE A SENHA INFORMADA É IGUAL A SENHA CODIFICADA SALVA DO BANCO
    passwordService.checkPassword({password, passwordDb})
    
   
    // GERA UM TOKEN
    const token = Jwt.createToken({   
      role,   
      email,
      password,
      })      
      
      
      return token;
    }
    
    
     getUserRole(token: string): string | JwtPayload | null{
      const data = Jwt.validateToken(token);        
      return data;
    }  
  
}
