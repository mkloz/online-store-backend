import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Review } from './entities/review.entity';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class ReviewService {
  private readonly backendUrl: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  public async create(
    authorId: number,
    { article, ...createReviewDto }: CreateReviewDto,
  ): Promise<Review> {
    const rew = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        article: { connect: { id: article } },
        author: { connect: { id: authorId } },
      },
      include: { article: true, author: true },
    });

    return rew ? new Review(rew) : null;
  }

  public async findAll(opt: PaginationOptionsDto): Promise<Paginated<Review>> {
    const pag: IPag<Review> = {
      data: (
        await this.prisma.review.findMany({
          take: opt.limit,
          skip: opt.limit * (opt.page - 1),
          include: { article: true, author: true },
        })
      ).map((el) => new Review(el)),
      count: await this.prisma.review.count(),
      route: `${this.backendUrl}/api/reviews`,
    };

    return Paginator.paginate(pag, opt);
  }

  public async findOne(id: number): Promise<Review> {
    const rew = await this.prisma.review.findUnique({
      where: { id },
      include: { article: true, author: true },
    });

    return rew ? new Review(rew) : null;
  }

  public async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const rew = await this.prisma.review.update({
      where: { id },
      data: dto,
      include: { article: true, author: true },
    });

    return rew ? new Review(rew) : null;
  }

  public async remove(id: number): Promise<Review> {
    const rew = await this.prisma.review.delete({
      where: { id },
    });

    return rew ? new Review(rew) : null;
  }
}
