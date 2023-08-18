import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiSaleDelete = () =>
  applyDecorators(
    ApiResponseData(Sale),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Delete one sale from db by id. [open for: ADMIN]',
    }),
  );
