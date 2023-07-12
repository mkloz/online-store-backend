import { applyDecorators } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/docs/paginate-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';

export const ApiSaleGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(Sale),
    ApiOperation({
      summary: 'Get paginated list of sales from db. [open for everyone]',
    }),
  );
