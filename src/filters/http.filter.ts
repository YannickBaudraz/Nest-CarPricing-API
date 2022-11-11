import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    Logger.error(exception.stack || exception.message, this.constructor.name);

    host
      .switchToHttp()
      .getResponse()
      .status(exception.getStatus())
      .json(exception.getResponse());
  }
}
