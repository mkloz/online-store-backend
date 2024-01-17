import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiOrderDeleteItem = () =>
  applyDecorators(
    ApiResponseData(Order, HttpStatus.OK),
    ApiAdmin(),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deletes item from order. [open for: ADMIN]',
    }),
  );
