import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationOptionsDto } from './pagination-options.dto';
export const DEFAULT_ITEMS_LIMIT = 10;
@Injectable()
export class DefaultPagValuePipe
  implements PipeTransform<Partial<PaginationOptionsDto>, PaginationOptionsDto>
{
  transform(value: Partial<PaginationOptionsDto>) {
    const page = value.page ? (value.page >= 1 ? value.page : 1) : 1;
    const limit = value.limit
      ? value.limit >= 0
        ? value.limit
        : 0
      : DEFAULT_ITEMS_LIMIT;

    return { page, limit };
  }
}
