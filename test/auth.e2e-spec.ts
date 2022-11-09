import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { register } from './auth-helper';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handle a request to /auth/register', () => {
    const expectedEmail = 'yannickbaudrazdev@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: expectedEmail, password: '123456asdf' })
      .expect(201)
      .then((response) => {
        const { id, email } = response.body;
        expect(id).toBeDefined();
        expect(email).toEqual(expectedEmail);
      });
  });

  it('register a new user and get the current user', async () => {
    const expectedEmail = '123456asdf@gmail.com';

    const res = await register(app, expectedEmail, '123456asdf');

    const { body } = await request(app.getHttpServer())
      .get('/users/me')
      .set('Cookie', res.get('Set-Cookie'))
      .expect(200);

    expect(body.email).toEqual(expectedEmail);
  });
});
