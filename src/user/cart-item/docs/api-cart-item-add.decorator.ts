import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItem } from '../entities/cart-item.entity';

export const ApiCartItemAdd = () =>
  applyDecorators(
    ApiResponseData(CartItem, HttpStatus.CREATED),
    ApiBearerAuth(),
    ApiOperation({
      summary:
        'Add new cart item to db if not exist otherwise increment quantity. [open for: ME]',
    }),
  );
