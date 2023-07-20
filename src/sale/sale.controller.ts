import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import {
  ApiSale,
  ApiSaleCreate,
  ApiSaleDelete,
  ApiSaleGetMany,
  ApiSaleGetOne,
  ApiSaleUpdate,
} from './docs';
import { IDDto } from 'src/common/dto/id.dto';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { SaleExistPipe } from './pipes/sale-exist.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';

@ApiSale()
@Controller('sales')
@UseInterceptors(ClassSerializerInterceptor)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RoleAuthGuard)
  @ApiSaleCreate()
  @Roles(Role.ADMIN)
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  @ApiSaleGetMany()
  findAll(@Query() pag: PaginationOptionsDto) {
    return this.saleService.findAll(pag);
  }

  @Get(':id')
  @ApiSaleGetOne()
  findOne(@Param(SaleExistPipe) { id }: IDDto) {
    return this.saleService.findOne(id);
  }

  @Patch(':id')
  @ApiSaleUpdate()
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  update(
    @Param(SaleExistPipe) { id }: IDDto,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.saleService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiSaleDelete()
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  remove(@Param(SaleExistPipe) { id }: IDDto) {
    return this.saleService.remove(id);
  }
}
