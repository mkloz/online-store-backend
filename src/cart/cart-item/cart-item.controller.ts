import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User as UserPayload } from '@user/user.decorator';
import {
  IDDto,
  JwtPayloadDto,
  PaginationOptionsDto,
  Paginated,
} from '@shared/dto';
import { AuthGuard } from '@shared/guards';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemService } from './cart-item.service';
import { CartItem } from './entities/cart-item.entity';
import { CartItemExistPipe } from './pipes/cart-item-exist.pipe';
import { CartItemBelongsToUserGuard } from './cart-item-belongs-to-user.guard';
import {
  ApiCartItemAdd,
  ApiCartItemDecrement,
  ApiCartItemGetMany,
  ApiCartItemGetOne,
} from './docs';
import { ApiCart } from '../docs/api-cart.decorator';
import { Prefix } from '@utils/prefix.enum';

@ApiCart()
@Controller(Prefix.CART_ITEMS)
@UseInterceptors(ClassSerializerInterceptor)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post('increment')
  @UseGuards(AuthGuard)
  @ApiCartItemAdd()
  cartAdd(
    @UserPayload()
    user: JwtPayloadDto,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.add(user, createCartItemDto);
  }

  @Delete('decrement')
  @ApiCartItemDecrement()
  @UseGuards(AuthGuard)
  cartDecrement(
    @UserPayload() user: JwtPayloadDto,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.decrement(user, createCartItemDto);
  }

  @Get('')
  @UseGuards(AuthGuard)
  @ApiCartItemGetMany()
  findAll(
    @UserPayload() user: JwtPayloadDto,
    @Query() pag: PaginationOptionsDto,
  ): Promise<Paginated<CartItem>> {
    return this.cartItemService.findAll(user, pag);
  }

  @Get(':id')
  @ApiCartItemGetOne()
  @UseGuards(CartItemBelongsToUserGuard)
  findOne(@Param(CartItemExistPipe) { id }: IDDto) {
    return this.cartItemService.findOne(id);
  }
}
