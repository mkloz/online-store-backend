import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiSaleCreate = () =>
  applyDecorators(
    ApiResponseData(Sale, HttpStatus.CREATED),
    ApiAdmin(),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Add new sale to db. [open for: ADMIN]' }),
  );
