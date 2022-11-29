import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/MatchesModel'

import { Response } from 'superagent';
import MatchesModel from '../database/models/MatchesModel';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const GETTEAMBYID = {
  dataValues: {
    "id": 5,
    "teamName": "Cruzeiro"
  }
};

const GETALLCLEAR = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamAway": {
      "teamName": "Grêmio"
    },
    "teamHome": {
      "teamName": "São Paulo"
    }
  }
  ,
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": true,
    "teamAway": {
      "teamName": "Santos"
    },
    "teamHome": {
      "teamName": "Internacional"
    }
  },
];

const GETINPROGRESSCLEAR = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamAway": {
      "teamName": "Grêmio"
    },
    "teamHome": {
      "teamName": "São Paulo"
    }
  }
];

const GETINPROGRESSMOCK = [
  {
    dataValues: {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamAway": {
        "teamName": "Grêmio"
      },
      "teamHome": {
        "teamName": "São Paulo"
      }
    }
  },
];

const GETALLMOCK = [
  {
    dataValues: {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamAway": {
        "teamName": "Grêmio"
      },
      "teamHome": {
        "teamName": "São Paulo"
      }
    }
  },
  {
    dataValues: {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": true,
      "teamAway": {
        "teamName": "Santos"
      },
      "teamHome": {
        "teamName": "Internacional"
      }
    }
  },
];


describe('testando o endpoint /matches', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(
        GETALLMOCK as MatchesModel[]);
  });

  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
  it('req: 18,19 - testando se é possivel retornar todas as partidas', async () => {
    await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(GETALLCLEAR);
  });

});

describe('testando o endpoint /matches para requisição por query', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(
        GETINPROGRESSMOCK as MatchesModel[]);
  });

  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
  it('req: 18,19 - testando se é possivel retornar as partidas em progresso', async () => {
    const response = await chai.request(app).get('/matches').query({ inProgress: 'false' });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(GETINPROGRESSCLEAR);
  });
});

describe('testando o endpoint /matches para salvar nova partida', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon.stub(MatchesModel, "update");
    sinon.stub(MatchesModel, "create").resolves({
      dataValues: {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
      }
    } as MatchesModel);
    sinon
      .stub(MatchesModel, "findByPk").resolves(
        {
          dataValues: {
            "id": 1,
            "homeTeam": 16,
            "homeTeamGoals": 2,
            "awayTeam": 8,
            "awayTeamGoals": 2,
            "inProgress": true,
          }
        } as MatchesModel);
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
    (MatchesModel.findByPk as sinon.SinonStub).restore();
    (MatchesModel.create as sinon.SinonStub).restore();
    (MatchesModel.update as sinon.SinonStub).restore();
  })
  it('req: 23 - testando se é possível salvar uma partida com o status de inProgress como true no banco de dados', async () => {
    const { body } = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    const token = body.token;
    const response = await chai.request(app).post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('authorization', token);
    // console.log(response.body);
    // console.log(response.status);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    });
    
  });
  it('req: 24 - testando se é possível salvar uma partida com o status de inProgress como true no banco de dados', async () => {
    const { body } = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    const token = body.token;
    const response = await chai.request(app).patch('/matches/1/finish').send({
      "inProgress": false,
    }).set('authorization', token);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ "message": "Finished" });
  });
  it('req: 25 - Será validado que não é possível inserir uma partida em que o homeTeam e o awayTeam sejam iguais', async () => {
    const { body } = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });
    const token = body.token;
    const response = await chai.request(app).post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('authorization', token);
    // console.log(response.body);
    // console.log(response.status);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    });
    
  });
});