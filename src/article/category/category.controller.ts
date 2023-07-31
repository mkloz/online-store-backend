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
import { PaginationOptionsDto } from '@shared/pagination';

import { CategoryExistPipe } from './pipes/category-exist.pipe';
import { NameDto } from '@shared/dto/name.dto';
import { Prefix } from '@utils/prefix.enum';

@ApiCategory()
@Controller(Prefix.CATEGORIES)
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiCategoryGetMany()
  findAll(@Query() pag: PaginationOptionsDto) {
    return this.categoryService.findAll(pag);
  }

  @Get(':name')
  @ApiCategoryGetOne()
  findOneByName(@Param(CategoryExistPipe) name: NameDto) {
    return this.categoryService.findOne(name);
  }
}
