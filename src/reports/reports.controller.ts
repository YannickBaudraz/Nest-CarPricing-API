import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  @Post()
  store(@Body() body: CreateReportDto) {
    console.log(body);
    throw new NotImplementedException();
  }
}
