import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/TeamsModel'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const GETTEAMBYID = {
  dataValues: {
    "id": 5,
    "teamName": "Cruzeiro"
  }
};

const GETALLMOCK = [
  {
    dataValues: {
      id: 1,
      teamName: "Avaí/Kindermann",
    }
  },
  {
    dataValues: {
      id: 2,
      teamName: "Bahia",
    }
  },
  {
    dataValues: {
      id: 3,
      teamName: "Botafogo",
    }
  },
];

const GETALLMAPPED = [
  {
    id: 1,
    teamName: "Avaí/Kindermann",
  },
  {
    id: 2,
    teamName: "Bahia",
  }
  ,
  {
    id: 3,
    teamName: "Botafogo",
  },
];


describe('testando o endpoint /teams', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(
        GETALLMOCK as TeamModel[]);
  });

  afterEach(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
  })
  it('req: 13 - testando se é possivel retornar todos os times corretamente', async () => {
    await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(GETALLMAPPED)
  });
  beforeEach(async () => {
    sinon
      .stub(TeamModel, "findByPk")
      .resolves(
        GETTEAMBYID as TeamModel);
  });

  afterEach(() => {
    (TeamModel.findByPk as sinon.SinonStub).restore();
  })
  it('req: 17 - testando se é possivel retornar um time pelo ID', async () => {
    await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });

    const response = await chai.request(app).get('/teams/5');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(GETTEAMBYID.dataValues);
  });
  /*   describe('test All fields must be filled', () => {
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
    describe('teste da rota /login/validate', () => {
      let chaiHttpResponse: Response;
      beforeEach(async () => {
        sinon
          .stub(User, "findByPk")
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
        (User.findByPk as sinon.SinonStub).restore();
      });
        it('req: 12- testando se é possivel validar um token correto', async () => {
          const response = await chai.request(app).get('/login/validate').set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjY5NDc2MjA0LCJleHAiOjE2Njk1NjI2MDR9.-Qew0JL4ozVp6FgqkwVJyAMx0QGqaPe8bAj83RQIVvw").send();
          expect(response.body).to.be.deep.equal({ "role": "admin" })
          expect(response.status).to.be.equal(200);
        });
        it('req: 12- testando se não é possível validar caso não exista token', async () => {
          const response = await chai.request(app).get('/login/validate').set('authorization', "").send();
          expect(response.body).to.be.deep.equal({ "message": "Token not found" })
          expect(response.status).to.be.equal(401);
        });
        it('req: 12- testando se não é possível validar caso o token seja invalido', async () => {
          const response = await chai.request(app).get('/login/validate').set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjY5NDc2MjA0LCJleHAiOjE2Njk1NjI2MDR9.-Qew0JL4ozVp6FgqkwVJyAMx0QGqaPe8asdfasdfasdf").send();
          expect(response.body).to.be.deep.equal({ "message": "Expired or invalid token" })
          expect(response.status).to.be.equal(401);
        });
      }); */
});

