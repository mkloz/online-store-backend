import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItem } from '../entities/cart-item.entity';

export const ApiCartItemGetOne = () =>
  applyDecorators(
    ApiResponseData(CartItem, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get one cart item from db by id. [open for: ME]',
    }),
  );
