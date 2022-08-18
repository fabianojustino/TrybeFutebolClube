import  'dotenv/config';
import  { JwtPayload, Secret, SignOptions, sign, verify } from 'jsonwebtoken';
import { IAuthService } from '../interfaces/IAuth.User.Service';


export default class Jwt {

  static createToken(user: IAuthService) {
    const jwtConfig: SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const secret: Secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
  
    const token = sign({ data: user }, secret, jwtConfig);
  
    return token;
  };

   static validateToken(token: string): string | JwtPayload {
    try {   
      const data = verify(token, 'suaSenhaSecreta');
    
      return data;
    } catch (_err) {
      const e = new Error('Invalid token');
      e.name = 'invalidCredential';
      throw e;
    }
  }
  

}

