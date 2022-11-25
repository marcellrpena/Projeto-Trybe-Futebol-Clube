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
  beforeEach(async () => {
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

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  })
  it('req: 3 - testando se é possível fazer login corretamente', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    expect(response.status).to.be.equal(200);
  });
  describe('test All fields must be filled', () => {
    it('req: 5 - testando que não é possível fazer login sem informar um EMAIL no front-end', async () => {
      const response = await chai.request(app).post('/login').send({
        "password": "secret_admin",
      });
      expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" })
      expect(response.status).to.be.equal(400);
    });
    it('req: 7 - testando que não é possível fazer login sem informar o PASSWORD no front-end', async () => {
      const response = await chai.request(app).post('/login').send({
        "email": "admin@admin.com",
      });
      expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" })
      expect(response.status).to.be.equal(400);
    });
  });
  describe('Incorrect email or password', () => {
    it('req: 9- testando que não é possível fazer login com um EMAIL INVALIDO', async () => {
      const response = await chai.request(app).post('/login').send({
        "email": "asdfa",
        "password": "secret_admin",
      });
      expect(response.body).to.be.deep.equal({ "message": "Incorrect email or password" })
      expect(response.status).to.be.equal(401);
    });
    /* it('req: 9- testando que não é possível fazer login se o EMAIL não existir no banco de dados', async () => {
      const response = await chai.request(app).post('/login').send({
        "email": "asdfa@adfa.com",
        "password": "secret_admin",
      });
      expect(response.body).to.be.deep.equal({ "message": "Incorrect email or password" })
      expect(response.status).to.be.equal(401); */
    });
    it('req: 11 - testando que não é possível fazer login com um PASSWORD INVALIDO', async () => {
      const response = await chai.request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "sec",
      });
      expect(response.body).to.be.deep.equal({ "message": "Incorrect email or password" })
      expect(response.status).to.be.equal(401);
    });
    it('req: 11 - testando que não é possível fazer login se a senha do usuário não for igual ao do db', async () => {
      const response = await chai.request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "sec",
      });
      expect(response.body).to.be.deep.equal({ "message": "Incorrect email or password" })
      expect(response.status).to.be.equal(401);
    });
  });
});
