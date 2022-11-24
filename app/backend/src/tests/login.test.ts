import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Rota de Login', () => {
  let chaiHttpResponse: Response;

   // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })
  it('testando se é possível fazer login corretamente', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "teste@teste.com",
      "password": "123456"
    });
    expect(response.status).to.be.equal(200);
  });
  /**
   * Exemplo do uso de stubs com tipos
   */


 

  // 

  // chaiHttpResponse = await chai
});
