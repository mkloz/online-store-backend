import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export const ApiOrdersGetAll = () =>
  applyDecorators(
    ApiResponseData(Order, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Return a paginated list of orders. [open for: ADMIN]',
    }),
  );
