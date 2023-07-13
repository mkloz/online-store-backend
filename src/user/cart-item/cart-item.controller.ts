import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User as UserPayload } from '../user.decorator';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IDDto } from 'src/common/dto/id.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemService } from './cart-item.service';
import { CartItem } from './entities/cart-item.entity';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { CartRelationsExistsPipe } from './pipes/cart-relations-exists.pipe';
import { CartItemExistPipe } from './pipes/cart-item-exist.pipe';
import { CartItemBelongsToUserGuard } from './cart-item-belongs-to-user.guard';
import {
  ApiCartItemAdd,
  ApiCartItemDecrement,
  ApiCartItemGetMany,
  ApiCartItemGetOne,
} from './docs';
import { ApiUser } from '../docs';

@ApiUser()
@Controller('user/me/cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post('add')
  @UseGuards(AuthGuard)
  @ApiCartItemAdd()
  cartAdd(
    @UserPayload()
    user: JwtPayload,
    @Body(CartRelationsExistsPipe) createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.add(user, createCartItemDto);
  }

  @Delete('decrement')
  @ApiCartItemDecrement()
  @UseGuards(AuthGuard)
  cartDecrement(
    @UserPayload() user: JwtPayload,
    @Body(CartRelationsExistsPipe) createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.decrement(user, createCartItemDto);
  }

  @Get('')
  @UseGuards(AuthGuard)
  @ApiCartItemGetMany()
  findAll(
    @UserPayload() user: JwtPayload,
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
