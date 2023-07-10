import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/db/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Review } from './entities/review.entity';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { EnvVar, IStore } from 'src/common/config/config';
import { Paginated } from 'src/common/pagination/paginated.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ConfigService,
  ) {}

  create({ article, ...createReviewDto }: CreateReviewDto): Promise<Review> {
    return this.prisma.review.create({
      data: {
        ...createReviewDto,
        article: article ? { connect: { id: article } } : undefined,
      },
      include: { article: true },
    });
  }

  async findAll(opt: PaginationOptionsDto): Promise<Paginated<Review>> {
    const pag: IPag<Review> = {
      data: await this.prisma.review.findMany({
        take: opt.limit,
        skip: opt.limit * (opt.page - 1),
        include: { article: true },
      }),
      count: await this.prisma.review.count(),
      route: `${
        this.cs.get<IStore>(EnvVar.ONLINE_STORE).projectUrl
      }/api/reviews`,
    };

    return Paginator.paginate(pag, opt);
  }

  findOne(id: number): Promise<Review> {
    return this.prisma.review.findUnique({
      where: { id },
      include: { article: true },
    });
  }

  update(
    id: number,
    { article, ...updateReviewDto }: UpdateReviewDto,
  ): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data: {
        ...updateReviewDto,
        article: article ? { connect: { id: article } } : undefined,
      },
      include: { article: true },
    });
  }

  remove(id: number): Promise<Review> {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
