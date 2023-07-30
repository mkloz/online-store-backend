import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItem } from '../cart-item.entity';

export const ApiCartItemGetOne = () =>
  applyDecorators(
    ApiResponseData(CartItem, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get one cart item from db by id. [open for: ME]',
    }),
  );
