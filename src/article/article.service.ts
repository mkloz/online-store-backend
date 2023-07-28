import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '@db/prisma.service';
import { Article } from './entities/article.entity';
import { IPag, Paginator } from '@shared/pagination';
import { ApiConfigService } from '@config/api-config.service';
import { Paginated } from '@shared/pagination';
import { FilterOptionsDto } from './dto/filter-options.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { Prisma } from '@prisma/client';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';
import { Helper } from '@utils/helpers/helper';
import { FindManyArticlesDto } from './dto/find-many.dto';

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

  async create(dto: CreateArticleDto): Promise<Article> {
    const article = await this.prisma.article.create({
      data: {
        characteristic: dto.characteristic,
        price: dto.price,
        discription: dto.discription,
        name: dto.name,
        count: dto.count,
        isPreviouslyUsed: dto.isPreviouslyUsed,
        categories: this.prisma.connectArrayIfDefined(dto.categories),
      },
      include: { images: true, sale: true, reviews: true, categories: true },
    });
    if (!article) throw ArticleService.articleNotExistException;

    return new Article(article);
  }
  async findOne(id: number): Promise<Article> {
    const art = await this.prisma.article.findUnique({
      where: { id },
      include: { images: true, sale: true, reviews: true, categories: true },
    });
    if (!art) throw ArticleService.articleNotExistException;

    return new Article(art);
  }

  async update(id: number, dto: UpdateArticleDto): Promise<Article> {
    const updated = await this.prisma.article.update({
      where: { id },
      data: {
        characteristic: dto.characteristic,
        price: dto.price,
        discription: dto.discription,
        name: dto.name,
        count: dto.count,
        isPreviouslyUsed: dto.isPreviouslyUsed,
        views: dto.views,
        categories: this.prisma.setArrayIfDefined(dto.categories),
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

  async getArticleActualPrice(id?: number | null) {
    if (!id) throw ArticleService.articleNotExistException;

    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { sale: { where: { activeTill: { gte: new Date() } } } },
    });
    if (!article) throw ArticleService.articleNotExistException;

    return article.sale?.newPrise ?? article.price;
  }

  private getPriceFilterCondition(
    filters: FilterOptionsDto,
  ): Prisma.ArticleWhereInput {
    return {
      OR: [
        {
          AND: [
            { price: { gte: filters.minPrice ?? 0 } },
            { price: { lte: filters.maxPrice ?? Number.MAX_SAFE_INTEGER } },
          ],
        },
        {
          sale: {
            newPrise: {
              gte: filters.minPrice ?? 0,
              lte: filters.maxPrice ?? Number.MAX_SAFE_INTEGER,
            },
          },
        },
      ],
    };
  }

  private getSearchFilterCondition(
    search: SearchArticleDto,
  ): Prisma.ArticleWhereInput {
    const keyword = search.search?.trim() ?? '';
    if (!keyword) return {};

    return {
      OR: [
        { name: { contains: keyword } },
        { discription: { contains: keyword } },
        { characteristic: { contains: keyword } },
      ],
    };
  }

  private getFindManyWhereQuery(
    filters: FilterOptionsDto,
    search: SearchArticleDto,
  ): Prisma.ArticleWhereInput {
    const priceFilter = this.getPriceFilterCondition(filters);
    const searchFilter = this.getSearchFilterCondition(search);

    return {
      AND: [
        priceFilter,
        {
          categories: filters.category
            ? { some: { name: filters.category } }
            : undefined,
        },
        searchFilter,
      ],
    };
  }
  private getFindManyPrismaOpt(query: FindManyArticlesDto) {
    return {
      take: query.limit,
      skip: query.limit * (query.page - 1),
      include: {
        images: true,
        sale: true,
        reviews: true,
        categories: true,
      },
      where: this.getFindManyWhereQuery(
        {
          category: query.category,
          maxPrice: query.maxPrice,
          minPrice: query.minPrice,
        },
        { search: query.search },
      ),
      orderBy: {
        price: query.price ?? undefined,
      },
    };
  }

  async findMany(query: FindManyArticlesDto): Promise<Paginated<Article>> {
    const pag: IPag<Article> = {
      data: (
        await this.prisma.article.findMany(this.getFindManyPrismaOpt(query))
      ).map((el) => new Article(el)),
      count: await this.prisma.article.count({
        where: this.getFindManyWhereQuery(
          {
            category: query.category,
            maxPrice: query.maxPrice,
            minPrice: query.minPrice,
          },
          { search: query.search },
        ),
      }),
      route: `${this.backendUrl}/${GLOBAL_PREFIX}/${Prefix.ARTICLES}`,
    };
    return Paginator.paginate(
      pag,
      { page: query.page, limit: query.limit },
      Helper.queryDtoToQuery({
        price: query.price,
        category: query.category,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        search: query.search,
      }),
    );
  }
}
