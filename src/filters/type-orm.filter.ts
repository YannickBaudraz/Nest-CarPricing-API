import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { Response } from 'express';

interface ResponseBody {
  statusCode: number;
  message: string;
  error: string;
}

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  private static sendResponse(response: Response, responseBody: ResponseBody) {
    response.status(responseBody.statusCode).json({
      statusCode: responseBody.statusCode,
      message: responseBody.message,
    });
  }

  catch(exception: TypeORMError, host: ArgumentsHost) {
    Logger.error(exception.message, this.constructor.name);

    const response = host.switchToHttp().getResponse<Response>();
    const responseBody: ResponseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      error: 'Internal Server Error',
    };

    switch (exception.constructor) {
      case EntityNotFoundError:
        responseBody.statusCode = HttpStatus.NOT_FOUND;
        responseBody.error = 'Not Found';
        break;
      case QueryFailedError:
        responseBody.statusCode = HttpStatus.BAD_REQUEST;
        responseBody.error = 'Query Failed';
        break;
    }

    TypeOrmFilter.sendResponse(response, responseBody);
  }
}
