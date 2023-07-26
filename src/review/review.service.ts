import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '@db/prisma.service';
import { Review } from './entities/review.entity';
import { IPag, Paginator } from '@shared/pagination';
import { ApiConfigService } from '@config/api-config.service';
import { PaginationOptionsDto, Paginated } from '@shared/pagination';

@Injectable()
export class ReviewService {
  private readonly backendUrl: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  static reviewNotExistException = new UnprocessableEntityException(
    'Review not exist',
  );

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

    if (!rew) throw ReviewService.reviewNotExistException;

    return new Review(rew);
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

    if (!rew) throw ReviewService.reviewNotExistException;

    return new Review(rew);
  }

  public async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const rew = await this.prisma.review.update({
      where: { id },
      data: dto,
      include: { article: true, author: true },
    });

    if (!rew) throw ReviewService.reviewNotExistException;

    return new Review(rew);
  }

  public async remove(id: number): Promise<Review> {
    const rew = await this.prisma.review.delete({
      where: { id },
    });

    if (!rew) throw ReviewService.reviewNotExistException;

    return new Review(rew);
  }
}
