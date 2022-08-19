import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import userMock from '../mocks/user/userMock';
import {loginMock, postLoginMock} from '../mocks/login/loginMock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Login', () => {
  beforeEach(() => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
  });

  afterEach(() => {
    // funciona tambem (User.findOne as sinon.SinonStub).restore;
    sinon.restore();
  });

  it('Em caso de sucesso', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send(postLoginMock);
    
    expect(response.status).to.equal(200);
  });
});
