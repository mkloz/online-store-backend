import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';

export const ApiSaleGetOne = () =>
  applyDecorators(
    ApiResponseData(Sale, HttpStatus.OK),
    ApiOperation({
      summary: 'Get one sale from db by id. [open for everyone]',
    }),
  );
