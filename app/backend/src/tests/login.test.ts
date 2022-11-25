import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import LoginValidate from '../database/middlewares/LoginValidate';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('testando o login', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        dataValues: {
          email: 'admin@admin.com',
          id: 1,
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
          role: 'admin',
          username: 'Admin',
        }
      } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })
  it('testando se é possível fazer login corretamente', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    expect(response.status).to.be.equal(200);
  });
  it('testando que não é possível fazer login sem informar um email no front-end', async () => {
    const response = await chai.request(app).post('/login').send({
      "password": "secret_admin",
    });
    expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" })
    expect(response.status).to.be.equal(400);
  });
});
