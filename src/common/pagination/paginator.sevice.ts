import { Paginated } from './paginated.dto';
import { PaginationOptionsDto } from './pagination-options.dto';

export interface IPag<TData> {
  data: TData[];
  count: number;
  route: string;
}
export class Paginator {
  static paginate<TData extends object>(
    pag: IPag<TData>,
    opt: PaginationOptionsDto,
  ): Paginated<TData> {
    const pageCount = pag.count / opt.limit + 1;

    return {
      items: pag.data,
      links: {
        first: `${pag.route}?limit=${opt.limit}`,
        previous:
          opt.page > 1
            ? `${pag.route}?page=${opt.page - 1}&limit=${opt.limit}`
            : null,
        next:
          opt.page < pageCount
            ? `${pag.route}?page=${opt.page + 1}&limit=${opt.limit}`
            : null,
        last: `${pag.route}?page=${pageCount}&limit=${opt.limit}`,
      },
      meta: {
        itemCount: pag.count,
        totalItems: pag.data.length,
        itemsPerPage: opt.limit,
        currentPage: opt.page,
      },
    };
  }
}
