import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiReview,
  ApiReviewCreate,
  ApiReviewDelete,
  ApiReviewGetManyForArticle,
  ApiReviewGetOne,
  ApiReviewUpdate,
} from './docs';
import { ReviewExistPipe } from './pipes/review-exist.pipe';
import { Review } from './entities/review.entity';
import { IDDto, JwtPayloadDto } from '@shared/dto';
import { Paginated } from '@shared/pagination';
import { Role } from '@prisma/client';
import { Roles, User } from '@shared/decorators';
import { RoleAuthGuard } from '@shared/guards';
import { OwnerOrRoleAuthGuard } from './pipes/owner-or-role-auth.guard';
import { Prefix } from '@utils/prefix.enum';
import { FindManyDto } from './dto/find-many.dto';
import { ArticleExistPipe } from '@article/pipes/article-exist.pipe';

@ApiReview()
@Controller(Prefix.REVIEWS)
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @ApiReviewCreate()
  @UseGuards(RoleAuthGuard)
  public create(
    @User() user: JwtPayloadDto,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewService.create(user.id, createReviewDto);
  }

  @Get('article/:id')
  @ApiReviewGetManyForArticle()
  public findAllForArticle(
    @Param(ArticleExistPipe) { id }: IDDto,
    @Query() pag: FindManyDto,
  ): Promise<Paginated<Review>> {
    return this.reviewService.findAllForArticle(id, pag);
  }

  @Get(':id')
  @ApiReviewGetOne()
  public findOne(@Param(ReviewExistPipe) { id }: IDDto): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerOrRoleAuthGuard)
  @ApiReviewUpdate()
  public update(
    @Param(ReviewExistPipe) { id }: IDDto,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerOrRoleAuthGuard)
  @ApiReviewDelete()
  public remove(@Param(ReviewExistPipe) { id }: IDDto): Promise<Review> {
    return this.reviewService.remove(id);
  }
}
