import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { DbModule } from '@db/db.module';
import { ApiConfigModule } from '@config/api-config.module';
import { SaleExistConstraint } from '@shared/validators';

@Module({
  imports: [ApiConfigModule, DbModule],
  controllers: [SaleController],
  providers: [SaleService, SaleExistConstraint],
})
export class SaleModule {}
