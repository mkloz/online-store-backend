import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@db/prisma.service';

@ValidatorConstraint({ name: 'CategoryExist', async: true })
@Injectable()
export class CategoryExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: unknown): Promise<boolean> {
    if (!id || typeof id !== 'number') {
      return false;
    }

    return !!(await this.prisma.category.findUnique({ where: { id } }));
  }

  defaultMessage() {
    return `Category not exist`;
  }
}

export function CategoryExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CategoryExistConstraint,
    });
  };
}
