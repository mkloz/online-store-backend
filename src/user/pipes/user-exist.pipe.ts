import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserExistPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: { email: string }) {
    const name = await this.prisma.user.findUnique({
      where: { email: value.email },
    });
    if (!name) throw new BadRequestException('User does not exist');

    return value;
  }
}
