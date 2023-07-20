import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends OmitType(PartialType(CreateReviewDto), [
  'article',
]) {}
