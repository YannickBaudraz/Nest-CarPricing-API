import { AppService } from './app.service';

describe('AppService', function () {
  let service: AppService;

  beforeEach(async function () {
    service = new AppService();
  });

  it('should say hello', function () {
    expect(service.getHello()).toEqual('Hello World!');
  });
});
