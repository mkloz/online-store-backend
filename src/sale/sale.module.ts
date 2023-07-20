import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { DbModule } from 'src/db/db.module';
import { ApiConfigModule } from 'src/config/api-config.module';
import { SaleExistConstraint } from './validators/sale-exist.validator';

@Module({
  imports: [ApiConfigModule, DbModule],
  controllers: [SaleController],
  providers: [SaleService, SaleExistConstraint],
})
export class SaleModule {}
