import { Controller, Get, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { User } from 'src/user/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiCart } from './docs/api-cart.decorator';
import { ApiCartGetMy } from './docs/api-car-get-my.decorator';

@ApiCart()
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('my')
  @ApiCartGetMy()
  @UseGuards(AuthGuard)
  findOne(@User() user: JwtPayload) {
    return this.cartService.findOne({ userId: user.id });
  }
}
