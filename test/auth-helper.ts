import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function register(
  app: INestApplication,
  email: string,
  password: string,
): Promise<request.Response> {
  return request(app.getHttpServer())
    .post('/auth/register')
    .send({ email, password })
    .expect(HttpStatus.CREATED);
}
