import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiCategory, ApiCategoryGetMany, ApiCategoryGetOne } from './docs';
import { IDDto } from 'src/common/dto/id.dto';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { CategoryExistPipe } from './pipes/category-exist.pipe';

@ApiCategory()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiCategoryGetMany()
  findAll(@Query() pag: PaginationOptionsDto) {
    return this.categoryService.findAll(pag);
  }

  @Get(':id')
  @ApiCategoryGetOne()
  findOne(@Param(CategoryExistPipe) { id }: IDDto) {
    return this.categoryService.findOne(id);
  }
}
