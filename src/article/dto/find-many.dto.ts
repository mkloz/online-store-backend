import { IntersectionType } from '@nestjs/swagger';
import { PaginationOptionsDto } from '@shared/pagination';
import { FilterOptionsDto } from './filter-options.dto';
import { SearchArticleDto } from './search-article.dto';
import { SortArticleDto } from './sort-article.dto';

export class FindManyArticlesDto extends IntersectionType(
  PaginationOptionsDto,
  FilterOptionsDto,
  SearchArticleDto,
  SortArticleDto,
) {}
