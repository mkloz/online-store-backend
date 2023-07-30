import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export const ApiOrderCreate = () =>
  applyDecorators(
    ApiResponseData(Order, HttpStatus.CREATED),
    ApiBearerAuth(),
    ApiOperation({
      summary:
        'Creates a order for current user from cart and clean it. [open for: ME]',
    }),
  );
