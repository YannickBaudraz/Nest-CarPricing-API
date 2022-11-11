import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { EstimateDto } from './dto/estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.repository.create(reportDto);
    report.user = user;
    return this.repository.save(report);
  }

  async changeApproval(id: number, approveReportDto: ApproveReportDto) {
    const report = await this.repository.findOneOrFail({ where: { id } });
    report.approved = approveReportDto.approved;

    return this.repository.save(report);
  }

  getEstimate(estimateDto: EstimateDto) {
    const { make, model, latitude, longitude, year, mileage } = estimateDto;
    return this.repository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', { make })
      .andWhere('model=:model', { model })
      .andWhere('latitude - :latitude BETWEEN -5 AND 5', { latitude })
      .andWhere('longitude - :longitude BETWEEN -5 AND 5', { longitude })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawMany();
  }
}
