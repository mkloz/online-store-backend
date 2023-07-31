import { PrismaService } from '@db/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SaleCronService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async deleteOutdatedSales(): Promise<void> {
    await this.prisma.sale.deleteMany({
      where: {
        activeTill: {
          lte: new Date(),
        },
      },
    });
  }
}
