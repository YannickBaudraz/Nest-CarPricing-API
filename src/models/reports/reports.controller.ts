import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dto/report.dto';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';
import { EstimateDto } from './dto/estimate.dto';
import { SearchReportsDto } from './dto/search-reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  index(@Query() searchReportsDto: SearchReportsDto) {
    return this.reportsService.findAllBy(searchReportsDto);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  store(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch(':id/approve')
  @UseGuards(AdminGuard)
  @Serialize(ReportDto)
  approve(
    @Param('id', ParseIntPipe) id: number,
    @Body() approveReportDto: ApproveReportDto,
  ) {
    return this.reportsService.changeApproval(1, approveReportDto);
  }

  @Get('estimate')
  @Serialize(EstimateDto)
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query);
  }
}
