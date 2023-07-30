import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export const ApiOrder = () =>
  applyDecorators(ApiTags('Order'), ApiExtraModels(Order));
