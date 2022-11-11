import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(Error)
export class ErrorFilter<T extends Error> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const message = exception.message || 'Internal Server Error';
    const description = exception.name;
    const statusCode = exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(exception.stack || message, this.constructor.name);

    host
      .switchToHttp()
      .getResponse()
      .status(statusCode)
      .json(HttpException.createBody(message, description, statusCode));
  }
}
