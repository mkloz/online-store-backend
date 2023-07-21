import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Article } from './entities/article.entity';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class ArticleService {
  private readonly backendUrl: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }
  static articleNotExistException = new UnprocessableEntityException(
    'Article does not exist',
  );

  async incrementViews(id: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({ where: { id } });

    if (!article) throw ArticleService.articleNotExistException;
    const updated = await this.update(id, { views: article.views + 1 });
    if (!updated) throw ArticleService.articleNotExistException;

    return updated;
  }

  async create({
    images,
    categories,
    ...createArticleDto
  }: CreateArticleDto): Promise<Article> {
    const article = await this.prisma.article.create({
      data: {
        ...createArticleDto,
        images: this.prisma.connectArrayIfDefined(images),
        categories: this.prisma.connectArrayIfDefined(categories),
      },
      include: { images: true, sale: true, reviews: true, categories: true },
    });
    if (!article) throw ArticleService.articleNotExistException;

    return new Article(article);
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
      route: `${this.backendUrl}/api/articles`,
    };

    return Paginator.paginate(pag, opt);
  }

  async findOne(id: number): Promise<Article> {
    const art = await this.prisma.article.findUnique({
      where: { id },
      include: { images: true, sale: true, reviews: true, categories: true },
    });
    if (!art) throw ArticleService.articleNotExistException;

    return new Article(art);
  }

  async update(
    id: number,
    { images, categories, ...updateArticleDto }: UpdateArticleDto,
  ): Promise<Article> {
    const updated = await this.prisma.article.update({
      where: { id },
      data: {
        ...updateArticleDto,
        images: this.prisma.setArrayIfDefined(images),
        categories: this.prisma.setArrayIfDefined(categories),
      },
      include: { images: true, sale: true, reviews: true, categories: true },
    });
    if (!updated) throw ArticleService.articleNotExistException;

    return new Article(updated);
  }

  async remove(id: number): Promise<Article> {
    const art = await this.prisma.article.delete({
      where: { id },
      include: { images: true, sale: true, reviews: true, categories: true },
    });
    if (!art) throw ArticleService.articleNotExistException;

    return new Article(art);
  }
}
