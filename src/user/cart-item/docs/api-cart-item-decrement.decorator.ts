import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItem } from '../entities/cart-item.entity';

export const ApiCartItemDecrement = () =>
  applyDecorators(
    ApiResponseData(CartItem),
    ApiBearerAuth(),
    ApiOperation({
      summary:
        'Delete cart item if quantity bigger than quantity in db otherwise dectement quantity in db. [open for: ME]',
    }),
  );
