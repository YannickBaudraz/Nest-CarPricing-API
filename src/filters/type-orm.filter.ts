import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter<T extends TypeORMError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    Logger.error(exception.message, this.constructor.name);

    let description = 'Internal Server Error';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (exception.constructor) {
      case EntityNotFoundError:
        statusCode = HttpStatus.NOT_FOUND;
        description = 'Not Found';
        break;
      case QueryFailedError:
        statusCode = HttpStatus.BAD_REQUEST;
        description = 'Query Failed';
        break;
    }

    host
      .switchToHttp()
      .getResponse()
      .status(statusCode)
      .json(
        HttpException.createBody(exception.message, description, statusCode),
      );
  }
}
