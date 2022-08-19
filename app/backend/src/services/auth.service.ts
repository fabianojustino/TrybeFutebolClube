import User from '../database/models/user';
import { ILogin, IAuthService } from '../interfaces/IAuth.User.Service';
import { passwordService } from '../services/passwordService'
import Jwt from '../auth/Jwt'
import * as validate from '../validations'

export default class AuthService implements ILogin {

  async login(body: IAuthService) {  
    
    validate.validateLogin(body)
    
    const {email, password} = body   
    
    const userOne = await User.findOne({ where: { email }});
    
    if(!userOne){
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const { password: passwordDb } = userOne as any    

    passwordService.checkPassword({password, passwordDb})

   
    // GERA UM TOKEN
      const token = Jwt.createToken({
        email,
        password,
      })      
    

    return token;
  }

}
