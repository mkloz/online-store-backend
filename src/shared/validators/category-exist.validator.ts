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

  async validate(value: unknown): Promise<boolean> {
    if (value) {
      if (typeof value === 'number') {
        return !!(await this.prisma.category.findUnique({
          where: { id: value },
        }));
      } else if (typeof value === 'string') {
        return !!(await this.prisma.category.findUnique({
          where: { name: value },
        }));
      }
    }

    return false;
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
