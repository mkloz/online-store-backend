import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Article } from './entities/article.entity';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { ConfigService } from '@nestjs/config';
import { EnvVar, IStore } from 'src/common/config/config';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ConfigService,
  ) {}

  create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prisma.article.create({ data: createArticleDto });
  }

  async findAll(opt: PaginationOptionsDto): Promise<Paginated<Article>> {
    const pag: IPag<Article> = {
      data: await this.prisma.article.findMany({
        take: opt.limit,
        skip: opt.limit * opt.page,
      }),
      count: await this.prisma.article.count(),
      route: `${
        this.cs.get<IStore>(EnvVar.ONLINE_STORE).projectUrl
      }/api/article`,
    };

    return Paginator.paginate(pag, opt);
  }

  findOne(id: number): Promise<Article> {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
