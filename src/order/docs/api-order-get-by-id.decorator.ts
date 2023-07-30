import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export const ApiOrderGetById = () =>
  applyDecorators(
    ApiResponseData(Order, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Return one order of current user by order id. [open for: ME]',
    }),
  );
