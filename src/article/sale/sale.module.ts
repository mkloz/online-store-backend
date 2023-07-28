import { Module } from '@nestjs/common';
import { SaleService } from './services/sale.service';
import { SaleController } from './sale.controller';
import { DbModule } from '@db/db.module';
import { ApiConfigModule } from '@config/api-config.module';
import { SaleExistConstraint } from '@shared/validators';
import { ScheduleModule } from '@nestjs/schedule';
import { SaleCronService } from './services/sale-cron.service';

@Module({
  imports: [ApiConfigModule, DbModule, ScheduleModule],
  controllers: [SaleController],
  providers: [SaleService, SaleCronService, SaleExistConstraint],
})
export class SaleModule {}
