import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';

export const ApiSaleGetOne = () =>
  applyDecorators(
    ApiResponseData(Sale, HttpStatus.OK),
    ApiOperation({ summary: 'Get one sale from db by id' }),
  );
