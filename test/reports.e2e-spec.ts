import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ReportsModule } from '../src/reports/reports.module';
import { CreateReportDto } from '../src/reports/dto/create-report.dto';
import request from 'supertest';

describe('ReportController (e2e)', function () {
  let app: INestApplication;

  beforeEach(async function () {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ReportsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('make a post request to /reports, when the request body is invalid, return a bad request', () => {
    const createReportDto: CreateReportDto = {} as CreateReportDto;
    const expectedErrorMessage = [
      'price must be a number conforming to the specified constraints',
      'price must not be less than 0',
      'price must not be greater than 1000000',
      'make must be a string',
      'model must be a string',
      'year must not be greater than 2022',
      'year must not be less than 1930',
      'year must be a number conforming to the specified constraints',
      'longitude must be a longitude string or number',
      'latitude must be a latitude string or number',
      'mileage must be a number conforming to the specified constraints',
      'mileage must not be less than 0',
      'mileage must not be greater than 1000000',
    ];

    return request(app.getHttpServer())
      .post('/reports')
      .send(createReportDto)
      .expect(HttpStatus.BAD_REQUEST)
      .then((response) =>
        expect(response.body.message).toEqual(expectedErrorMessage),
      );
  });
});
