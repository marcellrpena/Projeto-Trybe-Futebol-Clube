import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        email: 'admin@admin.com',
        id: 1,
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        role: 'admin',
        username: 'Admin',
       } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })
  it('testando se é possível fazer login corretamente', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "teste@teste.com",
      "password": "123456"
    });
    expect(response.status).to.be.equal(200);
  });
});
