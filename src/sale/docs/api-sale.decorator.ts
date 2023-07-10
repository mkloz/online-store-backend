import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';

export const ApiSale = () =>
  applyDecorators(ApiTags('Sale'), ApiExtraModels(Sale));
