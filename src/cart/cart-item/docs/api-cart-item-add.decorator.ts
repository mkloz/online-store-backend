import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItem } from '../cart-item.entity';

export const ApiCartItemAdd = () =>
  applyDecorators(
    ApiResponseData(CartItem, HttpStatus.CREATED),
    ApiBearerAuth(),
    ApiOperation({
      summary:
        'Add new cart item to db if not exist otherwise increment quantity. [open for: ME]',
    }),
  );
