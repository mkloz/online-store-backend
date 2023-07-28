import { PaginationOptionsDto } from '@shared/dto';
import { SortReviewDto } from './sort-review.dto';
import { IntersectionType } from '@nestjs/swagger';

export class FindManyDto extends IntersectionType(
  PaginationOptionsDto,
  SortReviewDto,
) {}
