import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';

export const ApiCart = () =>
  applyDecorators(ApiTags('Cart'), ApiExtraModels(Cart));
