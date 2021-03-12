import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    await app.init();
  });

  it('/api/auth/signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({username:'ccccc1234', password:'ZedZed1234!$'})
      .expect(201)
      ;
  });

  afterAll(()=>{
    app.close();
  });
});
