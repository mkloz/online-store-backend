import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UnprocessableEntityException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OrderService } from './services/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { IDDto, JwtPayloadDto, PaginationOptionsDto } from '@shared/dto';
import { Roles, User } from '@shared/decorators';
import { OrderStatus, Role } from '@prisma/client';
import { RoleAuthGuard } from '@shared/guards';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CartService } from '@cart/cart.service';
import { Prefix } from '@utils/prefix.enum';
import { OrderMailService } from './services/order-mail.service';
import { UserService } from '@user/services/user.service';
import { ApiOrder } from './docs/api-order.decorator';
import { ApiOrdersGetMy } from './docs/api-orders-get-my.decorator';
import { OrderBelongsToUserGuard } from './order-belongs-to-user.guard';
import { ApiOrderCreate } from './docs/api-order-create.decorator';
import { ApiOrdersGetAll } from './docs/api-orders-get-all.decorator';
import { ApiOrderGetById } from './docs/api-order-get-by-id.decorator';
import { ApiOrderUpdateStatus } from './docs/api-order-update-status.decorator';
import { ApiOrderCancel } from './docs/api-order-cancel.decorator';

@ApiOrder()
@Controller(Prefix.ORDERS)
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
    private readonly orderMailService: OrderMailService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  @ApiOrderCreate()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @User() user: JwtPayloadDto,
  ) {
    const cart = await this.cartService.findOne({ userId: user.id });

    if (!cart?.cartItems?.length) {
      throw new UnprocessableEntityException('Cart is empty');
    }

    return this.orderService.create(createOrderDto, cart);
  }

  @Get('/my')
  @ApiOrdersGetMy()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  findMany(@User() user: JwtPayloadDto, @Query() pag: PaginationOptionsDto) {
    return this.orderService.findMany(pag, { userId: user.id });
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOrdersGetAll()
  @UseGuards(RoleAuthGuard)
  findAll(@Query() pag: PaginationOptionsDto) {
    return this.orderService.findAll(pag);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOrderGetById()
  @UseGuards(OrderBelongsToUserGuard)
  findOne(@Param() { id }: IDDto) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  @ApiOrderUpdateStatus()
  async updateStatus(
    @Param() { id }: IDDto,
    @Query() updateOrderDto: UpdateOrderStatusDto,
  ) {
    const updated = await this.orderService.updateStatus(
      id,
      updateOrderDto.status,
    );
    const customer = await this.userService.getById(updated.userId ?? 0);

    await this.orderMailService.sendOrderStatus(
      customer.email,
      updateOrderDto.status,
      updated.id,
    );
    return updated;
  }

  @Delete(':id/cancel')
  @ApiOrderCancel()
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  async cancel(@Body() dto: CancelOrderDto, @Param() { id }: IDDto) {
    const canceled = await this.orderService.cancel(id, dto);
    const customer = await this.userService.getById(canceled.userId ?? 0);

    await this.orderMailService.sendOrderStatus(
      customer.email,
      OrderStatus.CENCELED,
      canceled.id,
    );
    return canceled;
  }
}
