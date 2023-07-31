import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ID } from '@shared/types/id.interface';
import { PrismaService } from '@db/prisma.service';
interface Name {
  name: string;
}

@Injectable()
export class CategoryExistPipe
  implements PipeTransform<ID | Name, Promise<ID | Name>>
{
  constructor(private readonly pisma: PrismaService) {}
  async transform(value: ID | Name) {
    const fromDB = await this.pisma.category.findUnique({
      where: value,
    });
    if (!fromDB) throw new NotFoundException('Category does not exist');
    return value;
  }
}
