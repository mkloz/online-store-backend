import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { User } from '../user.entity';
import { CartItem } from '../../cart/cart-item/cart-item.entity';

export const ApiUser = () =>
  applyDecorators(ApiTags('User'), ApiExtraModels(User, CartItem));
