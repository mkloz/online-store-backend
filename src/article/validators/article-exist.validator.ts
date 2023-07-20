import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@ValidatorConstraint({ name: 'ArticleExist', async: true })
@Injectable()
export class ArticleExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: unknown): Promise<boolean> {
    if (!id || typeof id !== 'number') {
      return false;
    }

    return !!(await this.prisma.article.findUnique({ where: { id } }));
  }

  defaultMessage() {
    return `Article not exist`;
  }
}

export function ArticleExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ArticleExistConstraint,
    });
  };
}
