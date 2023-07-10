import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/db/prisma.service';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { EnvVar, IStore } from 'src/common/config/config';
import { ConfigService } from '@nestjs/config';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ConfigService,
  ) {}

  create({ article, ...createSaleDto }: CreateSaleDto) {
    return this.prisma.sale.create({
      data: {
        ...createSaleDto,
        article: article ? { connect: { id: article } } : undefined,
      },
      include: { article: true },
    });
  }

  async findAll(opt: PaginationOptionsDto): Promise<Paginated<Sale>> {
    const pag: IPag<Sale> = {
      data: await this.prisma.sale.findMany({
        take: opt.limit,
        skip: opt.limit * (opt.page - 1),
        include: { article: true },
      }),
      count: await this.prisma.sale.count(),
      route: `${this.cs.get<IStore>(EnvVar.ONLINE_STORE).projectUrl}/api/sale`,
    };

    return Paginator.paginate(pag, opt);
  }

  findOne(id: number): Promise<Sale> {
    return this.prisma.sale.findUnique({
      where: { id },
      include: { article: true },
    });
  }

  update(
    id: number,
    { article, ...updateSaleDto }: UpdateSaleDto,
  ): Promise<Sale> {
    return this.prisma.sale.update({
      where: { id },
      data: {
        ...updateSaleDto,
        article: article ? { connect: { id: article } } : undefined,
      },
      include: { article: true },
    });
  }

  remove(id: number) {
    return this.prisma.sale.delete({ where: { id } });
  }
}
