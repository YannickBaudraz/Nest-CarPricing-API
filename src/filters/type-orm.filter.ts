import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { Response } from 'express';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    let statusCode;
    const message = exception.message;

    switch (exception.constructor) {
      case EntityNotFoundError:
        statusCode = HttpStatus.NOT_FOUND;
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    const response = host.switchToHttp().getResponse<Response>();
    const responseBody = { statusCode, message };
    response.status(responseBody.statusCode).json({
      statusCode: responseBody.statusCode,
      message: responseBody.message,
    });
  }
}
