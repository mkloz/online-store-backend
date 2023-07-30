import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export const ApiOrderCancel = () =>
  applyDecorators(
    ApiResponseData(Order, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Cancels the order. [open for: ADMIN]',
    }),
  );
