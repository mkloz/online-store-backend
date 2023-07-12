import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class RelationsExistsPipe
  implements PipeTransform<CreateUserDto, Promise<CreateUserDto>>
{
  constructor(private readonly prisma: PrismaService) {}

  async checkReviewsExistance(reviewsArr: number[]) {
    if (reviewsArr.length) {
      const reviews = await this.prisma.review.findMany({
        where: { id: { in: reviewsArr } },
      });
      if (reviewsArr.some((el) => !reviews.map((el) => el.id).includes(el)))
        throw new BadRequestException('Review does not exist');
    }
  }

  async transform(value: CreateUserDto) {
    await this.checkReviewsExistance(value.reviews);

    return value;
  }
}
