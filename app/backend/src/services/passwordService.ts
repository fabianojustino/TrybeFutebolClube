import * as bcript from 'bcryptjs';
import { IAuthService } from '../interfaces/IAuth.User.Service';

const passwordService = {
  encryptPassword: (password: string): string => {
    const salt = bcript.genSaltSync(5);
    const encryptedPassword = bcript.hashSync(password, salt);
    return encryptedPassword;
  },
  checkPassword: ({ password, passwordDb }: IAuthService | any) => {
    const isMatch = bcript.compareSync(password, passwordDb);

    if (!isMatch) {
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }
  },
};

export default passwordService;
