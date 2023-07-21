import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/db/prisma.service';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { Sale } from './entities/sale.entity';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class SaleService {
  private readonly backendUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  static saleNotExistException = new UnprocessableEntityException(
    'Sale not exist',
  );

  public async create({
    article,
    ...createSaleDto
  }: CreateSaleDto): Promise<Sale> {
    const sale = await this.prisma.sale.create({
      data: {
        ...createSaleDto,
        article: { connect: { id: article } },
      },
      include: { article: true },
    });

    if (!sale) throw SaleService.saleNotExistException;

    return new Sale(sale);
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
      route: `${this.backendUrl}/api/sales`,
    };

    return Paginator.paginate(pag, opt);
  }

  public async findOne(id: number): Promise<Sale> {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { article: true },
    });

    if (!sale) throw SaleService.saleNotExistException;

    return new Sale(sale);
  }

  public async update(id: number, dto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.prisma.sale.update({
      where: { id },
      data: dto,
      include: { article: true },
    });

    if (!sale) throw SaleService.saleNotExistException;

    return new Sale(sale);
  }

  public async remove(id: number): Promise<Sale> {
    const sale = await this.prisma.sale.delete({ where: { id } });

    if (!sale) throw SaleService.saleNotExistException;

    return new Sale(sale);
  }
}
