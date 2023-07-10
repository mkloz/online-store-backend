import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
