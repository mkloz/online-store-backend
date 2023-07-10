import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ID } from 'src/common/common.interface';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ReviewExistPipe implements PipeTransform<ID, Promise<ID>> {
  constructor(private readonly pisma: PrismaService) {}

  async transform(value: ID) {
    const fromDB = await this.pisma.review.findUnique({
      where: { id: value.id },
    });
    if (!fromDB) throw new NotFoundException('Review does not exist');
    return value;
  }
}
