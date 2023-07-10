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
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { RelationsExistsPipe } from './pipes/relations-exists.pipe';
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

@ApiSale()
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiSaleCreate()
  create(@Body(RelationsExistsPipe) createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  @ApiSaleGetMany()
  findAll(@Query() pag: PaginationOptionsDto) {
    return this.saleService.findAll(pag);
  }

  @Get(':id')
  @ApiSaleGetOne()
  findOne(@Param() { id }: IDDto) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  @ApiSaleUpdate()
  update(@Param() { id }: IDDto, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiSaleDelete()
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
}
