import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiSaleUpdate = () =>
  applyDecorators(
    ApiResponseData(Sale, HttpStatus.OK),
    ApiAdmin(),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update a sale in db by id. [open for: ADMIN]' }),
  );
