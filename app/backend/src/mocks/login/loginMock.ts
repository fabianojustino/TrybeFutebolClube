import { IAuthService, IToken } from '../../interfaces/IAuth.User.Service';

const loginMock: IToken = {
  token: '1234',
};

const postLoginMock: IAuthService = {
  email: 'any_email@fibiano.com',
  password: 'any_password'
}
export {loginMock, postLoginMock};
