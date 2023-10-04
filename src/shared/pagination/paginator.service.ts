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
    extraQuery?: string,
  ): Paginated<TData> {
    const pageCount = Math.ceil(pag.count / opt.limit) | 0;

    extraQuery = `${
      extraQuery ? `&${extraQuery.trim().replace(/^(\?|\&)/, '')}` : ''
    }`;

    return {
      items: pag.data,
      links: {
        first: `${pag.route}?limit=${opt.limit}${extraQuery}`,
        previous:
          opt.page > 1
            ? `${pag.route}?page=${opt.page - 1}&limit=${
                opt.limit
              }${extraQuery}`
            : null,
        next:
          opt.page < pageCount
            ? `${pag.route}?page=${opt.page + 1}&limit=${
                opt.limit
              }${extraQuery}`
            : null,
        last: `${pag.route}?page=${pageCount}&limit=${opt.limit}${extraQuery}`,
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
