import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Cart } from '../cart.entity';

export const ApiCartGetMy = () =>
  applyDecorators(
    ApiResponseData(Cart, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Return a cart of current user. [open for: ME]',
    }),
  );
