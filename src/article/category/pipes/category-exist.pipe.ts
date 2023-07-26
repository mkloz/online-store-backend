import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ID } from '@shared/types/id.interface';
import { PrismaService } from '@db/prisma.service';

@Injectable()
export class CategoryExistPipe implements PipeTransform<ID, Promise<ID>> {
  constructor(private readonly pisma: PrismaService) {}
  async transform(value: ID) {
    const fromDB = await this.pisma.category.findUnique({
      where: { id: value.id },
    });
    if (!fromDB) throw new NotFoundException('Category does not exist');
    return value;
  }
}
