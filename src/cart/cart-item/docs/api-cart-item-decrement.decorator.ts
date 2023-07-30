import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItem } from '../cart-item.entity';

export const ApiCartItemDecrement = () =>
  applyDecorators(
    ApiResponseData(CartItem),
    ApiBearerAuth(),
    ApiOperation({
      summary:
        'Delete cart item if quantity bigger than quantity in db otherwise dectement quantity in db. [open for: ME]',
    }),
  );
