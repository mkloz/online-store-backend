import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiOrdersGetAll = () =>
  applyDecorators(
    ApiResponseData(Order, HttpStatus.OK),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Return a paginated list of orders. [open for: ADMIN]',
    }),
  );
