import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiOrderUpdateStatus = () =>
  applyDecorators(
    ApiResponseData(Order, HttpStatus.OK),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Updates a order status. [open for: ADMIN]',
    }),
  );
