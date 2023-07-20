import { Injectable } from '@nestjs/common';
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

  async incrementViews(id: number): Promise<Article> {
    const { views } = await this.prisma.article.findUnique({ where: { id } });

    return this.update(id, { views: views + 1 });
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
    return article ? new Article(article) : null;
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
    return art ? new Article(art) : null;
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
    return updated ? new Article(updated) : null;
  }

  async remove(id: number) {
    const art = await this.prisma.article.delete({
      where: { id },
      include: { images: true, sale: true, reviews: true, categories: true },
    });

    return art ? new Article(art) : null;
  }
}
