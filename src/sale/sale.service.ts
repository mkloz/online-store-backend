import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/db/prisma.service';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { IConfig } from 'src/common/config/config';
import { ConfigService } from '@nestjs/config';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ConfigService<IConfig>,
  ) {}

  public async create({ article, ...createSaleDto }: CreateSaleDto) {
    return new Sale(
      await this.prisma.sale.create({
        data: {
          ...createSaleDto,
          article: article ? { connect: { id: article } } : undefined,
        },
        include: { article: true },
      }),
    );
  }

  async findAll(opt: PaginationOptionsDto): Promise<Paginated<Sale>> {
    const pag: IPag<Sale> = {
      data: (
        await this.prisma.sale.findMany({
          take: opt.limit,
          skip: opt.limit * (opt.page - 1),
          include: { article: true },
        })
      ).map((el) => new Sale(el)),
      count: await this.prisma.sale.count(),
      route: `${
        this.cs.get('onlineStore', { infer: true }).projectUrl
      }/api/sales`,
    };

    return Paginator.paginate(pag, opt);
  }

  public async findOne(id: number): Promise<Sale> {
    return new Sale(
      await this.prisma.sale.findUnique({
        where: { id },
        include: { article: true },
      }),
    );
  }

  public async update(
    id: number,
    { article, ...updateSaleDto }: UpdateSaleDto,
  ): Promise<Sale> {
    return new Sale(
      await this.prisma.sale.update({
        where: { id },
        data: {
          ...updateSaleDto,
          article: article ? { connect: { id: article } } : undefined,
        },
        include: { article: true },
      }),
    );
  }

  public async remove(id: number): Promise<Sale> {
    return new Sale(await this.prisma.sale.delete({ where: { id } }));
  }
}
