import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiCategory, ApiCategoryGetMany, ApiCategoryGetOne } from './docs';
import { IDDto } from '@shared/dto/id.dto';
import { PaginationOptionsDto } from '@shared/pagination';

import { CategoryExistPipe } from './pipes/category-exist.pipe';

@ApiCategory()
@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
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
