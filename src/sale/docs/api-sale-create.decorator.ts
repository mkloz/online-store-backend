import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';

export const ApiSaleCreate = () =>
  applyDecorators(
    ApiResponseData(Sale, HttpStatus.CREATED),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Add new sale to db. [open for: ADMIN]' }),
  );
