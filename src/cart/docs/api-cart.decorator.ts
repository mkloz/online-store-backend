import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Cart } from '../cart.entity';

export const ApiCart = () =>
  applyDecorators(ApiTags('Cart'), ApiExtraModels(Cart));
