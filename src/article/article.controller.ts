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
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { IDDto } from 'src/common/dto/id.dto';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import {
  ApiArticle,
  ApiArticleCreate,
  ApiArticleDelete,
  ApiArticleGetMany,
  ApiArticleGetOne,
  ApiArticleUpdate,
} from './docs';
import { RelationsExistsPipe } from './pipes/relations-exists.pipe';
import { ArticleNotExistPipe } from './pipes/article-not-exist.pipe';
import { ArticleExistPipe } from './pipes/article-exist.pipe';

@ApiArticle()
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiArticleCreate()
  create(
    @Body(ArticleNotExistPipe, RelationsExistsPipe)
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiArticleGetMany()
  findAll(@Query() pag: PaginationOptionsDto) {
    return this.articleService.findAll(pag);
  }

  @Get(':id')
  @ApiArticleGetOne()
  findOne(@Param() { id }: IDDto) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @ApiArticleUpdate()
  update(
    @Param() { id }: IDDto,
    @Body(ArticleExistPipe, RelationsExistsPipe)
    updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiArticleDelete()
  remove(@Param(ArticleExistPipe) { id }: IDDto) {
    return this.articleService.remove(id);
  }
}
