import { applyDecorators } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/docs/paginate-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItem } from '../entities/cart-item.entity';

export const ApiCartItemGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(CartItem),
    ApiBearerAuth(),
    ApiOperation({
      summary:
        'Get paginated list of cart items from db that belongs to user. [open for ME]',
    }),
  );
