import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCartItemDto } from './create-cart-item.dto';

export class UpdateCartItemDto extends OmitType(
  PartialType(CreateCartItemDto),
  ['article'],
) {}
