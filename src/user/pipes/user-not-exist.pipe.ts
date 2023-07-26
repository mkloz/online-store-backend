import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '@db/prisma.service';

@Injectable()
export class UserNotExistPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: { email: string }) {
    const name = await this.prisma.user.findUnique({
      where: { email: value.email },
    });
    if (name) throw new BadRequestException('This email already in use');

    return value;
  }
}
