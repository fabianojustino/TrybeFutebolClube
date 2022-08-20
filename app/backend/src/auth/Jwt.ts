import  'dotenv/config';
import  { JwtPayload, Secret, SignOptions, sign, verify } from 'jsonwebtoken';
import { IUser } from '../interfaces/IAuth.User.Service';


export default class Jwt {


  static createToken(user: IUser) {
    const jwtConfig: SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const secret: Secret =process.env.JWT_SECRET || 'jwt_secret';
  
    const token = sign({ data: user }, secret, jwtConfig);
  
    return token;
  };

   static validateToken(token: string): string | null | JwtPayload  {
    try {   
      const {data} = verify(token, 'jwt_secret') as any;                  
      return data;    
      
    } catch (_err) {
      const e = new Error('Invalid token');
      e.name = 'ValidationError';
      throw e;
    }
  }
  

}

