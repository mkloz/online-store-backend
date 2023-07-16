import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Article } from './entities/article.entity';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/common/configs/config.interface';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ConfigService<IConfig>,
  ) {}

  async incrementViews(id: number): Promise<Article> {
    const { views } = await this.prisma.article.findUnique({ where: { id } });

    return this.update(id, { views: views + 1 });
  }

  async create({
    images,
    sale,
    reviews,
    categories,
    ...createArticleDto
  }: CreateArticleDto): Promise<Article> {
    return new Article(
      await this.prisma.article.create({
        data: {
          ...createArticleDto,
          images: {
            connect: images.map((id) => ({ id })),
          },
          sale: sale ? { connect: { id: sale } } : undefined,
          reviews: {
            connect: reviews.map((id) => ({ id })),
          },
          categories: {
            connect: categories.map((id) => ({ id })),
          },
        },
        include: { images: true, sale: true, reviews: true, categories: true },
      }),
    );
  }

  async findAll(opt: PaginationOptionsDto): Promise<Paginated<Article>> {
    const pag: IPag<Article> = {
      data: (
        await this.prisma.article.findMany({
          take: opt.limit,
          skip: opt.limit * (opt.page - 1),
          include: {
            images: true,
            sale: true,
            reviews: true,
            categories: true,
          },
        })
      ).map((el) => new Article(el)),
      count: await this.prisma.article.count(),
      route: `${
        this.cs.get('onlineStore', { infer: true }).backendUrl
      }/api/articles`,
    };

    return Paginator.paginate(pag, opt);
  }

  async findOne(id: number): Promise<Article> {
    return new Article(
      await this.prisma.article.findUnique({
        where: { id },
        include: { images: true, sale: true, reviews: true, categories: true },
      }),
    );
  }

  async update(
    id: number,
    {
      images,
      sale,
      reviews,
      categories,
      ...updateArticleDto
    }: UpdateArticleDto,
  ): Promise<Article> {
    return new Article(
      await this.prisma.article.update({
        where: { id },
        data: {
          ...updateArticleDto,
          images: {
            connect: images.map((id) => ({ id })),
          },
          sale: sale ? { connect: { id: sale } } : undefined,
          reviews: {
            connect: reviews.map((id) => ({ id })),
          },
          categories: {
            connect: categories.map((id) => ({ id })),
          },
        },
        include: { images: true, sale: true, reviews: true, categories: true },
      }),
    );
  }

  async remove(id: number) {
    return new Article(
      await this.prisma.article.delete({
        where: { id },
        include: { images: true, sale: true, reviews: true, categories: true },
      }),
    );
  }
}
