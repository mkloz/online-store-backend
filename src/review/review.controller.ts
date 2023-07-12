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
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiReview,
  ApiReviewCreate,
  ApiReviewDelete,
  ApiReviewGetMany,
  ApiReviewGetOne,
  ApiReviewUpdate,
} from './docs';
import { IDDto } from 'src/common/dto/id.dto';
import { RelationsExistsPipe } from './pipes/relations-exists.pipe';
import { ReviewExistPipe } from './pipes/review-exist.pipe';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { Review } from './entities/review.entity';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { OwnerOrRoleAuthGuard } from './pipes/owner-or-role-auth.guard';

@ApiReview()
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @ApiReviewCreate()
  @UseGuards(RoleAuthGuard)
  create(
    @Body(RelationsExistsPipe) createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @ApiReviewGetMany()
  findAll(@Query() pag: PaginationOptionsDto): Promise<Paginated<Review>> {
    return this.reviewService.findAll(pag);
  }

  @Get(':id')
  @ApiReviewGetOne()
  findOne(@Param(ReviewExistPipe) { id }: IDDto): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerOrRoleAuthGuard)
  @ApiReviewUpdate()
  update(
    @Param(ReviewExistPipe) { id }: IDDto,
    @Body(RelationsExistsPipe) updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerOrRoleAuthGuard)
  @ApiReviewDelete()
  remove(@Param(ReviewExistPipe) { id }: IDDto): Promise<Review> {
    return this.reviewService.remove(id);
  }
}
