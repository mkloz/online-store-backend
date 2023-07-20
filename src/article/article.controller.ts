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
import { ArticleNotExistPipe } from './pipes/article-not-exist.pipe';
import { ArticleExistPipe } from './pipes/article-exist.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiArticleIncrement } from './docs/api-article-increment.decorator';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';

@ApiArticle()
@Controller('articles')
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
  incrementViews(@Query(ArticleExistPipe) { id }: IDDto) {
    return this.articleService.incrementViews(id);
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
  @UseGuards(RoleAuthGuard)
  @ApiArticleUpdate()
  @SerializeOptions({ groups: [Role.ADMIN] })
  @Roles(Role.ADMIN)
  update(
    @Param(ArticleExistPipe) { id }: IDDto,
    @Body()
    updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiArticleDelete()
  @UseGuards(RoleAuthGuard)
  @SerializeOptions({ groups: [Role.ADMIN] })
  @Roles(Role.ADMIN)
  remove(@Param(ArticleExistPipe) { id }: IDDto) {
    return this.articleService.remove(id);
  }
}
