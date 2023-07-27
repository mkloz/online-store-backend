import { Injectable } from '@nestjs/common';
import { PaginationOptionsDto, Paginated } from '@shared/dto';
import { Category } from './entities/category.entity';
import { PrismaService } from '@db/prisma.service';
import { IPag, Paginator } from '@shared/pagination';
import { ApiConfigService } from '@config/api-config.service';
import { Prisma } from '@prisma/client';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';

@Injectable()
export class CategoryService {
  private readonly backendUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  async findAll(opt: PaginationOptionsDto): Promise<Paginated<Category>> {
    const pag: IPag<Category> = {
      data: (
        await this.prisma.category.findMany({
          take: opt.limit,
          skip: opt.limit * (opt.page - 1),
        })
      ).map((el) => new Category(el)),
      count: await this.prisma.category.count(),
      route: `${this.backendUrl}/${GLOBAL_PREFIX}/${Prefix.CATEGORIES}`,
    };

    return Paginator.paginate(pag, opt);
  }

  async findOne(value: Prisma.CategoryWhereUniqueInput) {
    const cat = await this.prisma.category.findUnique({
      where: value,
    });

    return cat ? new Category(cat) : null;
  }
}
