import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';

export const ApiCartGetMy = () =>
  applyDecorators(
    ApiResponseData(Cart, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Return a cart of current user. [open for: ME]',
    }),
  );
