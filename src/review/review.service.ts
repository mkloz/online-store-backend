import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/db/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Review } from './entities/review.entity';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { IConfig } from 'src/common/config/config';
import { Paginated } from 'src/common/pagination/paginated.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ConfigService<IConfig>,
  ) {}

  public async create({
    article,
    author,
    ...createReviewDto
  }: CreateReviewDto): Promise<Review> {
    return new Review(
      await this.prisma.review.create({
        data: {
          ...createReviewDto,
          article: article ? { connect: { id: article } } : undefined,
          author: author ? { connect: { id: author } } : undefined,
        },
        include: { article: true, author: true },
      }),
    );
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
      route: `${
        this.cs.get('onlineStore', { infer: true }).projectUrl
      }/api/reviews`,
    };

    return Paginator.paginate(pag, opt);
  }

  public async findOne(id: number): Promise<Review> {
    return new Review(
      await this.prisma.review.findUnique({
        where: { id },
        include: { article: true, author: true },
      }),
    );
  }

  public async update(
    id: number,
    { article, author, ...updateReviewDto }: UpdateReviewDto,
  ): Promise<Review> {
    return new Review(
      await this.prisma.review.update({
        where: { id },
        data: {
          ...updateReviewDto,
          article: article ? { connect: { id: article } } : undefined,
          author: author ? { connect: { id: author } } : undefined,
        },
        include: { article: true, author: true },
      }),
    );
  }

  public async remove(id: number): Promise<Review> {
    return new Review(
      await this.prisma.review.delete({
        where: { id },
      }),
    );
  }
}
