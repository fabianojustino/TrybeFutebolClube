import User from '../database/models/user';
import { ILogin, IAuthService } from '../interfaces/IAuth.User.Service';
import { passwordService } from '../services/passwordService'
import Jwt from '../auth/Jwt'
import * as validate from '../validations'

export default class AuthService implements ILogin {

  async login(body: IAuthService) {  
    
    validate.validateLogin(body)
    
    const {email} = body   
    
    const userOne = await User.findOne({ where: { email }});

    const { password } = userOne as any    

    passwordService.checkPassword({password, passwordDb: userOne?.password})

   
    // GERA UM TOKEN
      const token = Jwt.createToken({
        email: userOne?.email,
        password: userOne?.password,
      })      
    

    return token;
  }

}
