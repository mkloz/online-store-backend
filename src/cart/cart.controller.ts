import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtPayloadDto } from '@shared/dto';
import { User } from '@user/user.decorator';
import { AuthGuard } from '@shared/guards';
import { ApiCart } from './docs/api-cart.decorator';
import { ApiCartGetMy } from './docs/api-car-get-my.decorator';
import { Prefix } from '@utils/prefix.enum';

@ApiCart()
@Controller(Prefix.CART)
@UseInterceptors(ClassSerializerInterceptor)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('my')
  @ApiCartGetMy()
  @UseGuards(AuthGuard)
  findOne(@User() user: JwtPayloadDto) {
    return this.cartService.findOne({ userId: user.id });
  }
}
