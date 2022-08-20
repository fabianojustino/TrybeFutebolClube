import { Response, Request } from 'express';
/* import { JwtPayload } from 'jsonwebtoken'; */
// import { StatusCodes } from 'http-status-codes';
// import { IUser } from '../interfaces/IAuth.User.Service';
import AuthService from '../services/auth.service';

export default class AuthController {
  constructor(private authServ: AuthService) {
    this.authServ = new AuthService();
  }

  async login(req: Request, res: Response) {
    await this.authServ.login(req.body);
    res.status(200).json({ token: this.authServ.token });
  }

  getUserRole(req: Request, res: Response) {
    const token = req.headers.authorization as string;
    this.authServ.getUserRole(token);

    const response = {
      role: this.authServ.role,
    };
    res.status(200).json(response);
  }
}
