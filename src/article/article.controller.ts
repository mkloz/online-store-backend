import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { IDDto } from '@shared/dto';
import { PaginationOptionsDto, Paginated } from '@shared/pagination';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import {
  ApiArticle,
  ApiArticleCreate,
  ApiArticleDelete,
  ApiArticleGetMany,
  ApiArticleGetOne,
  ApiArticleUpdate,
} from './docs';
import { ArticleNotExistPipe } from './pipes/article-not-exist.pipe';
import { ArticleExistPipe } from './pipes/article-exist.pipe';
import { Roles } from '@shared/decorators';
import { Role } from '@prisma/client';
import { ApiArticleIncrement } from './docs/api-article-increment.decorator';
import { RoleAuthGuard } from '@shared/guards';
import { FilterOptionsDto } from './dto/filter-options.dto';
import { SortArticleDto } from './dto/sort-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { Prefix } from '@utils/prefix.enum';

@ApiArticle()
@Controller(Prefix.ARTICLES)
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Roles(Role.ADMIN)
  @SerializeOptions({ groups: [Role.ADMIN] })
  @UseGuards(RoleAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiArticleCreate()
  create(
    @Body(ArticleNotExistPipe)
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Post('/increment')
  @ApiArticleIncrement()
  incrementViews(@Query(ArticleExistPipe) { id }: IDDto): Promise<Article> {
    return this.articleService.incrementViews(id);
  }

  @Get()
  @ApiArticleGetMany()
  findAll(
    @Query() pag: PaginationOptionsDto,
    @Query() filters: FilterOptionsDto,
    @Query() sorts: SortArticleDto,
    @Query() search: SearchArticleDto,
  ): Promise<Paginated<Article>> {
    return this.articleService.findMany(pag, sorts, filters, search);
  }

  @Get(':id')
  @ApiArticleGetOne()
  findOne(@Param() { id }: IDDto): Promise<Article> {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleAuthGuard)
  @ApiArticleUpdate()
  @SerializeOptions({ groups: [Role.ADMIN] })
  @Roles(Role.ADMIN)
  update(
    @Param(ArticleExistPipe) { id }: IDDto,
    @Body()
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiArticleDelete()
  @UseGuards(RoleAuthGuard)
  @SerializeOptions({ groups: [Role.ADMIN] })
  @Roles(Role.ADMIN)
  remove(@Param(ArticleExistPipe) { id }: IDDto): Promise<Article> {
    return this.articleService.remove(id);
  }
}
