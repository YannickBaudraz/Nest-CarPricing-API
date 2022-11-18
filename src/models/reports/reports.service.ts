import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';
import { SearchReportsDto } from './dto/search-reports.dto';
import { EstimateDto } from './dto/estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>,
  ) {}

  findAllBy(searchReportDto: SearchReportsDto) {
    const { userId } = searchReportDto;
    return this.repository.find({ where: { user: { id: userId } } });
  }

  create(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.repository.create(reportDto);
    report.user = user;
    return this.repository.save(report);
  }

  async changeApproval(
    id: number,
    approveReportDto: ApproveReportDto,
  ): Promise<Report> {
    const report = await this.repository.findOneOrFail({
      where: { id },
      relations: ['user'],
    });
    report.approved = approveReportDto.approved;

    return this.repository.save(report);
  }

  async getEstimate(estimateDto: GetEstimateDto): Promise<EstimateDto> {
    const { make, model, latitude, longitude, year, mileage } = estimateDto;
    const estimateResult: { price: number } = await this.repository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', { make })
      .andWhere('model=:model', { model })
      .andWhere('latitude - :latitude BETWEEN -30 AND 30', { latitude })
      .andWhere('longitude - :longitude BETWEEN -50 AND 50', { longitude })
      .andWhere('year - :year BETWEEN -10 AND 10', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();

    if (!estimateResult.price)
      throw new BadRequestException('Not enough data to make an estimate');

    return { price: Math.round(estimateResult.price * 20) / 20 };
  }
}
